import Section from "@/components/section";
import { ProductCard } from "@/components/product-card";
import productImg from "@/static/product2.webp";
import { useProductByCollection } from "@/hooks/hooks";
import { ProductItemSkeleton } from "@/components/skeleton";
export default function MedicineSection() {
  const {
    data: products,
    isLoading,
    isError,
  } = useProductByCollection("1004317089");
  const sortedData = products?.sort((a, b) => {
    if (
      a.variants[0].compare_at_price > 0 &&
      b.variants[0].compare_at_price <= 0
    ) {
      return -1;
    } else if (
      a.variants[0].compare_at_price <= 0 &&
      b.variants[0].compare_at_price > 0
    ) {
      return 1;
    } else {
      return 0;
    }
  });
  const limitProducts = sortedData?.slice(0, 8);
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
    <Section title="Sản Phẩm Độc Quyền" viewMoreTo="/category/1004317089">
      <div className="grid grid-cols-2 px-4 py-2 gap-1">
        {limitProducts?.map((product) => (
          <ProductCard
            key={product.id}
            category={product.vendor}
            image={product?.images?.[0]?.src || ""}
            defaultPrice={product?.variants?.[0]?.price}
            title={product.title}
            id={product.id}
            salePrice={product?.variants?.[0]?.compare_at_price}
          />
        ))}
      </div>
    </Section>
  );
}
