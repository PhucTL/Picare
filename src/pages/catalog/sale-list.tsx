import HorizontalDivider from "@/components/horizontal-divider";
import { ProductSaleCard } from "@/components/product-sale-card";
import { ProductItemSkeleton } from "@/components/skeleton";
import { useProductAll } from "@/hooks/hooks";
export default function SaleProductListPage() {
  const { data: products, isLoading, isError } = useProductAll();
  const priorityBrands = ["Easydew", "Eucerin", "Sebamed"];

  // Filter products that are on sale
  const saleFilteredProducts = products?.filter((product) => {
    const variant = product?.variants?.[0];
    return variant && variant.price !== 0 && variant.compare_at_price > 0;
  });
  const sortedProducts = saleFilteredProducts?.sort((a, b) => {
    const aPriority = priorityBrands.includes(a.vendor) ? 0 : 1;
    const bPriority = priorityBrands.includes(b.vendor) ? 0 : 1;
    return aPriority - bPriority;
  });
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 px-4 py-2 gap-4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((key) => (
          <ProductItemSkeleton key={key} />
        ))}
      </div>
    );
  }
  return (
    <>
      <HorizontalDivider />
      <div className="grid grid-cols-2 px-4 py-2 gap-1">
        {saleFilteredProducts?.map((product, i) => (
          <ProductSaleCard
            key={i + 1}
            category={product.vendor}
            image={product?.images?.[0]?.src || ""}
            defaultPrice={product?.variants?.[0]?.price}
            title={product.title}
            id={product.id}
            salePrice={product?.variants?.[0]?.compare_at_price}
          />
        ))}
      </div>
    </>
  );
}
