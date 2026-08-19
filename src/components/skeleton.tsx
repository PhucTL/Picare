import Tabs from "./tabs";
import Section from "./section";
import HorizontalDivider from "./horizontal-divider";
import Carousel from "./carousel";
import { ChevronDown } from "./vectors";

export function OrderSkeleton() {
  return (
    <div className="min-h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-4 py-4 flex flex-col space-y-4">
          {[0, 1, 2, 3].map((skeleton) => (
            <div
              key={skeleton}
              className="w-full h-[170px] rounded-lg bg-skeleton animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
export function CollectionSkeleton() {
  return (
    <div className="grid grid-cols-4 p-4 gap-x-4 gap-y-8">
      {[...Array(8)].map(
        (
          _,
          index // Adjust the number of skeletons as needed
        ) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2 flex-none basis-[70px] overflow-hidden"
          >
            {/* Skeleton Image */}
            <div className="w-[70px] h-[70px] rounded-full bg-gray-200 animate-pulse border-[0.5px] border-black/15"></div>

            {/* Skeleton Text */}
            <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
          </div>
        )
      )}
    </div>
  );
}

export function OrderDetailSkeleton() {
  return (
    <div className="flex flex-col relative">
      {/* Skeleton cho phần trạng thái đơn hàng */}
      <div className="w-full px-4 py-4 bg-skeleton animate-pulse h-10 rounded" />

      {/* Skeleton cho phần thông tin giao hàng */}
      <div className="flex flex-col px-4 py-4 space-y-2">
        <div className="w-1/2 h-4 bg-skeleton animate-pulse rounded" />
        <div className="w-full h-6 bg-skeleton animate-pulse rounded" />
      </div>

      {/* Skeleton cho thông tin cá nhân */}
      <div className="flex flex-col px-4 py-4 space-y-3 bg-white">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-6 bg-skeleton animate-pulse rounded w-full"
          />
        ))}
      </div>

      {/* Skeleton cho danh sách sản phẩm */}
      <div className="flex flex-col gap-y-2 px-4 py-3 bg-white">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-20 bg-skeleton animate-pulse rounded" />
        ))}
      </div>

      {/* Skeleton cho phần tổng thanh toán */}
      <div className="flex flex-col py-3 px-4 gap-y-2 bg-white">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-6 bg-skeleton animate-pulse rounded w-full"
          />
        ))}
      </div>

      {/* Skeleton cho phần hỗ trợ */}
      <div className="flex flex-col px-4 py-3 space-y-2 bg-white">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-10 bg-skeleton animate-pulse rounded" />
        ))}
      </div>

      {/* Skeleton cho phần nút hành động */}
      <div className="fixed w-screen left-0 bottom-0 bg-white px-4 py-4">
        <div className="flex items-center w-full gap-x-3">
          <div className="w-[50%] h-10 bg-skeleton animate-pulse rounded" />
          <div className="w-[50%] h-10 bg-skeleton animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="min-h-full bg-section">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-4">
          <div className="py-2">
            <div className="w-[350px] h-[350px] bg-skeleton animate-pulse"></div>
          </div>
        </div>
        <div className="w-[40%] px-4 py-2">
          <div className="h-4 bg-skeleton animate-pulse"></div>
        </div>
        <div className="w-full px-4 py-1">
          <div className="h-12 bg-skeleton animate-pulse"></div>
        </div>
        <div className="w-[40%] px-4 py-3">
          <div className="h-4 bg-skeleton animate-pulse"></div>
        </div>
        <div className="flex flex-col w-full px-4 py-2 gap-y-3">
          {[0, 1, 2, 3, 4, 5, 6].map((key) => (
            <div className="h-4 bg-skeleton animate-pulse" key={key}></div>
          ))}
        </div>
        <HorizontalDivider />
        <div className="w-[40%] px-4 py-3">
          <div className="h-4 bg-skeleton animate-pulse"></div>
        </div>
        <Section
          title={
            <div className="h-[18px] w-20 rounded-lg bg-skeleton animate-pulse" />
          }
        >
          <div className="grid grid-cols-2 px-4 py-2 gap-4">
            {[1, 2, 3, 4].map((key) => (
              <ProductItemSkeleton key={key} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-full bg-section">
      <div className="bg-background pt-2">
        <div className="px-4">
          <div className="w-full h-12 rounded-lg bg-skeleton animate-pulse" />
        </div>
        <Carousel
          slides={[1, 2, 3].map(() => (
            <div className="w-full aspect-video rounded-lg bg-skeleton animate-pulse" />
          ))}
          disabled
        />
      </div>
      <div className="bg-background space-y-2 mt-2">
        <Tabs
          items={[1, 2, 3, 4]}
          value={undefined}
          onChange={() => {}}
          renderLabel={(key) => (
            <div
              key={key}
              className="h-6 w-10 rounded-lg bg-skeleton animate-pulse"
            />
          )}
        />

        <Section
          title={
            <div className="h-[18px] w-36 rounded-lg bg-skeleton animate-pulse" />
          }
        >
          <div className="pt-2.5 pb-4 flex space-x-6 overflow-x-auto px-4">
            {[1, 2, 3, 4].map((key) => (
              <div
                key={key}
                className="flex flex-col items-center space-y-2 flex-none basis-[70px] overflow-hidden cursor-pointer"
              >
                <div className="w-[70px] h-[70px] object-cover rounded-full border-[0.5px] border-black/15 bg-skeleton animate-pulse" />
                <div className="w-full h-9">
                  <div className="w-full h-[18px] rounded-lg bg-skeleton animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
      <HorizontalDivider />
      <Section
        title={
          <div className="h-[18px] w-20 rounded-lg bg-skeleton animate-pulse" />
        }
      >
        <div className="grid grid-cols-2 px-4 py-2 gap-4">
          {[1, 2, 3, 4].map((key) => (
            <ProductItemSkeleton key={key} />
          ))}
        </div>
      </Section>
    </div>
  );
}

export function ProductItemSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="w-full aspect-square bg-skeleton animate-pulse rounded-t-lg" />
      <div className="py-2 space-y-0.5">
        <div className="h-[14px] w-1/5 bg-skeleton animate-pulse rounded-lg" />
        <div className="h-9 bg-skeleton animate-pulse rounded-lg" />
        <div className="h-[18px] w-1/2 bg-skeleton animate-pulse rounded-lg" />
        <div className="h-[14px] w-1/3 bg-skeleton animate-pulse rounded-lg" />
      </div>
    </div>
  );
}

export function SelectSkeleton(props: { width: number }) {
  return (
    <div
      className="h-8 rounded-full bg-skeleton animate-pulse px-3 flex items-center justify-end"
      style={{ width: props.width }}
    >
      <ChevronDown />
    </div>
  );
}
