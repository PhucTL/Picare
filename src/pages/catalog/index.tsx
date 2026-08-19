import SearchBar from "@/components/search-bar";
import TransitionLink from "@/components/transition-link";
import { useNavigate } from "react-router-dom";
import { useCollections, useSmartCollections } from "@/hooks/hooks";
import { CollectionSkeleton } from "@/components/skeleton";
import { CustomCollection } from "@/interfaces/Collection";

export default function CategoryListPage() {
  const navigate = useNavigate();
  const {
    data: collections,
    isError,
    isLoading,
    isFetching,
  } = useSmartCollections();
  const excludeHandle = [
    "san-pham-doc-quyen",
    "thuong-hieu-phan-phoi",
    "san-pham-me-va-be",
    "cac-loai-cham-soc-toc",
    "cac-van-de-ve-da",
    "cac-buoc-lam-dep",
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
  if (isLoading || isFetching) {
    return (
      <>
        <CollectionSkeleton />
      </>
    );
  }
  return (
    <>
      <div className="py-2">
        <SearchBar onClick={() => navigate("/search")} />
      </div>
      <div className="grid grid-cols-4 p-4 gap-x-4 gap-y-8">
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
    </>
  );
}
