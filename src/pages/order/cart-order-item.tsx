import { LineItem } from "@/interfaces/Order";
import { formatPrice } from "@/utils/format";
import test from "@/static/product.webp";
export default function CartOrderItem(props: LineItem) {
  return (
    <div className="bg-white flex items-center space-x-4 relative">
      <img src={props.image.src} className="w-14 h-14 rounded-lg" alt="test" />
      <div className="py-4 flex-1">
        <div className="text-sm font-semibold overflow-hidden line-clamp-2 text-ellipsis">
          {props.title}
        </div>
        <div className="flex items-center py-2 space-x-2">
          <div className="flex-1 flex flex-wrap items-center space-x-0.5">
            <div className="text-xs font-medium text-primary">
              {formatPrice(props.price)}
            </div>
          </div>
          <div className="text-[11px] text-gray-500">x{props.quantity}</div>
        </div>
      </div>
    </div>
  );
}
