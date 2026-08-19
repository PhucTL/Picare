import SearchBar from "@/components/search-bar";
import Section from "@/components/section";
import { ProductItemSkeleton } from "@/components/skeleton";
import { SearchIconLarge } from "@/components/vectors";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { useProductAll, useProductLimit } from "@/hooks/hooks";
import { Product } from "@/interfaces/Product";

export function EmptySearchResult() {
  return (
    <div className="p-6 space-y-4 flex flex-col items-center">
      <SearchIconLarge />
      <div className="text-inactive text-center text-2xs">
        Không có sản phẩm bạn tìm kiếm
      </div>
    </div>
  );
}

export function SearchResultSkeleton() {
  return (
    <Section title={`Kết quả`}>
      <div className="py-2 px-4 grid grid-cols-2 gap-4">
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
      </div>
    </Section>
  );
}

export function RecommendedProducts() {
  const { data: products, isLoading, isError } = useProductAll();
  const saleFilteredProducts = products?.filter((product) => {
    const variant = product?.variants?.[0];
    return variant && variant.price !== 0 && variant.compare_at_price > 0;
  });
  const limitProductDisplay = saleFilteredProducts?.slice(0, 6);
  return (
    <Section title="Gợi ý sản phẩm">
      <div className="py-2 px-4 flex space-x-2 overflow-x-auto">
        {limitProductDisplay?.map((product) => (
          <div
            className="flex-none"
            style={{ flexBasis: "calc((100vw - 48px) / 2)" }}
          >
            <ProductCard
              key={product.id}
              category={product.vendor}
              image={product.images?.[0]?.src || ""}
              defaultPrice={product.variants[0].price}
              title={product.title}
              id={product.id}
              salePrice={product?.variants?.[0]?.compare_at_price}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

export default function SearchPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localKeyword, setLocalKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const { data: products } = useProductAll();

  const vietnameseMap = {
    á: "a",
    à: "a",
    ả: "a",
    ã: "a",
    ạ: "a",
    ă: "a",
    ắ: "a",
    ằ: "a",
    ẳ: "a",
    ẵ: "a",
    ặ: "a",
    â: "a",
    ấ: "a",
    ầ: "a",
    ẩ: "a",
    ẫ: "a",
    ậ: "a",
    đ: "d",
    é: "e",
    è: "e",
    ẻ: "e",
    ẽ: "e",
    ẹ: "e",
    ê: "e",
    ế: "e",
    ề: "e",
    ể: "e",
    ễ: "e",
    ệ: "e",
    í: "i",
    ì: "i",
    ỉ: "i",
    ĩ: "i",
    ị: "i",
    ó: "o",
    ò: "o",
    ỏ: "o",
    õ: "o",
    ọ: "o",
    ô: "o",
    ố: "o",
    ồ: "o",
    ổ: "o",
    ỗ: "o",
    ộ: "o",
    ơ: "o",
    ớ: "o",
    ờ: "o",
    ở: "o",
    ỡ: "o",
    ợ: "o",
    ú: "u",
    ù: "u",
    ủ: "u",
    ũ: "u",
    ụ: "u",
    ư: "u",
    ứ: "u",
    ừ: "u",
    ử: "u",
    ữ: "u",
    ự: "u",
    ý: "y",
    ỳ: "y",
    ỷ: "y",
    ỹ: "y",
    ỵ: "y",
  };

  const removeAccents = (str: string): string =>
    str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, (char) => vietnameseMap[char] || char);

  const handleSearch = useCallback(() => {
    if (!products || !keyword.trim()) {
      setSearchResult([]);
      return;
    }

    // Normalize and remove accents for both the product title and the keyword
    const normalizedKeyword = removeAccents(keyword).toLowerCase();
    const filteredProducts = products.filter((product) =>
      removeAccents(product.title).toLowerCase().includes(normalizedKeyword)
    );
    const filteredProductsPrice = filteredProducts.filter(
      (products) => products.variants[0].price !== 0
    );
    setSearchResult(filteredProductsPrice);
  }, [keyword, products]);

  useEffect(() => {
    handleSearch();
  }, [keyword, handleSearch]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    return () => {
      setKeyword("");
    };
  }, []);

  return (
    <>
      <div className="py-2">
        <SearchBar
          ref={inputRef}
          value={localKeyword}
          onChange={(e) => setLocalKeyword(e.currentTarget.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setKeyword(localKeyword);
            }
          }}
          onBlur={() => setKeyword(localKeyword)}
        />
      </div>
      {keyword ? (
        <Suspense fallback={<SearchResultSkeleton />}>
          <div className="w-full space-y-2 bg-section">
            <Section title={`Kết quả (${searchResult?.length})`}>
              {searchResult?.length ? (
                <div className="py-2 px-4 grid grid-cols-2">
                  {searchResult.map((product) => (
                    <ProductCard
                      key={product.id}
                      category={product.vendor}
                      image={product.images?.[0]?.src || ""}
                      defaultPrice={product.variants[0].price}
                      title={product.title}
                      id={product.id}
                    />
                  ))}
                </div>
              ) : (
                <EmptySearchResult />
              )}
            </Section>
            {searchResult?.length === 0 && <RecommendedProducts />}
          </div>
        </Suspense>
      ) : (
        <RecommendedProducts />
      )}
    </>
  );
}
