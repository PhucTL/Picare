import Section from "@/components/section";
import TransitionLink from "@/components/transition-link";
import { useCollections, useSmartCollections } from "@/hooks/hooks";
import { CustomCollection } from "@/interfaces/Collection";
import { useEffect } from "react";
export default function Category() {
  const { data: collections } = useSmartCollections();

  const excludeHandle = [
    "san-pham-doc-quyen",
    "san-pham-me-va-be",
    "cac-loai-cham-soc-toc",
    "cac-van-de-ve-da",
    "cac-buoc-lam-dep",
    "thuong-hieu-phan-phoi",
  ];
  const priorityHandles = ["san-pham-doc-quyen", "thuong-hieu-phan-phoi"];

  const filteredCollections = collections
    ?.filter(
      (collection) =>
        collection?.published_scope === "global" &&
        collection.products_count !== 0 &&
        excludeHandle.includes(collection.handle)
    )
    .sort((a, b) => {
      const indexA = priorityHandles.indexOf(a.handle);
      const indexB = priorityHandles.indexOf(b.handle);

      if (indexA !== -1 && indexB === -1) return -1;
      if (indexA === -1 && indexB !== -1) return 1;
      return indexA - indexB;
    });
  const getStaticImages = (collection: CustomCollection) => {
    return collection.image?.src || "";
  };
  return (
    <Section title="Danh mục sản phẩm" viewMoreTo="/categories">
      <div className="pt-2 pb-4 flex space-x-6 overflow-x-auto px-4">
        {filteredCollections?.map((collection) => (
          <TransitionLink
            key={collection.id}
            className="flex flex-col items-center space-y-2 flex-none basis-[70px] overflow-hidden cursor-pointer"
            to={`/category/${collection.id}`}
          >
            <img
              src={getStaticImages(collection)}
              className="w-[70px] h-[70px] object-cover rounded-full border-[0.5px] border-black/15"
              alt={collection.title}
            />
            <div className="text-center text-sm w-full line-clamp-2 text-subtitle">
              {collection.title}
            </div>
          </TransitionLink>
        ))}
      </div>
    </Section>
  );
}
