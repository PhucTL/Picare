import Section from "@/components/section";
import { ProductItemSkeleton } from "@/components/skeleton";
import { useProductAll } from "@/hooks/hooks";
import { ProductSaleCard } from "@/components/product-sale-card";
export default function FlashSales() {
  const { data: products, isLoading, isError } = useProductAll();
  const priorityBrands = ["Easydew", "Eucerin", "Sebamed"];

  const saleFilteredProducts = products?.filter((product) => {
    const variant = product?.variants?.[0];
    return (
      variant &&
      variant.price !== 0 &&
      variant.compare_at_price > 0 &&
      priorityBrands.includes(product.vendor)
    );
  });
  const limitProductDisplay = saleFilteredProducts?.slice(0, 6);
  return (
    <Section title="Sản phẩm Sales" viewMoreTo="/flash-sales">
      {isLoading ? (
        <>
          <div className="grid grid-cols-2 px-4 py-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((key) => (
              <ProductItemSkeleton key={key} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 px-4 py-2 gap-1">
            {limitProductDisplay?.map((product, i) => (
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
      )}
    </Section>
  );
}
