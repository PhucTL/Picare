import { CartItem as CartItemProps } from "@/interfaces/Cart";
import { formatPrice } from "@/utils/format";

export default function CheckoutItem(props: CartItemProps) {
  return (
    <div className="bg-white pl-4 flex items-center space-x-4 relative">
      <img
        src={props.product.images?.[0]?.src}
        className="w-14 h-14 rounded-lg"
        alt="test"
      />
      <div className="py-4 pr-4 flex-1">
        <div className="text-sm font-semibold overflow-hidden line-clamp-2 text-ellipsis">
          {props.product.title}
        </div>
        <div className="flex items-center py-2 space-x-2">
          <div className="flex-1 flex flex-wrap items-center space-x-0.5">
            <div className="text-xs font-medium text-primary">
              {formatPrice(props.product.variants?.[0]?.price)}
            </div>
          </div>
          <div className="text-[11px] text-gray-500">x{props.quantity}</div>
        </div>
      </div>
    </div>
  );
}
