import { ChevronRight, ShareDecor } from "@/components/vectors";
import { Product } from "@/interfaces/Product";
import { openShareSheet } from "zmp-sdk";

export default function ShareButton(props: { product: Product }) {
  const share = () => {
    const images = props.product.images || []; // Use an empty array if `images` is undefined
    openShareSheet({
      type: "zmp_deep_link",
      data: {
        title: props.product.title,
        thumbnail: images[0]?.src || "", // Use optional chaining and a fallback empty string
        path: `/product/${props.product.id}`,
      },
    });
  };

  return (
    <button
      className="relative p-4 w-full flex space-x-1 bg-[#016BD9] rounded-lg text-white text-sm font-medium cursor-pointer"
      onClick={share}
    >
      <div>Chia sẻ ngay cho bạn bè</div>
      <ChevronRight />
      <div className="absolute right-5 top-[11px]">
        <ShareDecor />
      </div>
    </button>
  );
}
