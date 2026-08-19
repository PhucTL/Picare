import QuantityInput from "@/components/quantity-input";
import { RemoveIcon } from "@/components/vectors";
import { cartState } from "@/context/cartState";
import { CartItem as CartItemProps } from "@/interfaces/Cart";
import { removeFromCart, updateCartItemQuantity } from "@/service/cartService";
import { formatPrice } from "@/utils/format";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useSetAtom } from "jotai";
import { useState } from "react";

const SWIPE_TO_DELTE_OFFSET = 80;

export default function CartItem(props: CartItemProps) {
  const [quantity, setQuantity] = useState(props.quantity);
  const setCart = useSetAtom(cartState);

  const handleRemove = () => {
    removeFromCart(props.id, setCart);
  };
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      return;
    }
    setQuantity(newQuantity);
    updateCartItemQuantity(props.id, newQuantity, setCart);
  };
  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const bind = useDrag(
    ({ last, offset: [ox] }) => {
      if (last) {
        if (ox < -SWIPE_TO_DELTE_OFFSET) {
          api.start({ x: -SWIPE_TO_DELTE_OFFSET });
        } else {
          api.start({ x: 0 });
        }
      } else {
        api.start({ x: Math.min(ox, 0), immediate: true });
      }
    },
    {
      from: () => [x.get(), 0],
      axis: "x",
      bounds: { left: -100, right: 0, top: 0, bottom: 0 },
      rubberband: true,
      preventScroll: true,
    }
  );
  return (
    <div className="relative">
      <div className="absolute right-0 top-0 bottom-0 w-20 border-t-[0.5px] border-b-[0.5px] border-black/10">
        <div
          className="bg-danger text-white/95 w-full h-full flex flex-col space-y-1 justify-center items-center cursor-pointer"
          onClick={handleRemove}
        >
          <RemoveIcon />
          <div className="text-2xs font-medium">Xoá</div>
        </div>
      </div>

      <animated.div
        {...bind()}
        style={{ x }}
        className="bg-white pl-4 flex items-center space-x-4 relative"
      >
        <img
          src={props.product.images?.[0]?.src}
          className="w-14 h-14 rounded-lg"
          alt="test"
        />
        <div className="py-4 pr-4 flex-1 border-b-[0.5px] border-black/10">
          <div className="text-sm font-semibold">{props.product.title}</div>
          <div className="flex items-center py-2 space-x-2">
            <div className="flex-1 flex flex-wrap items-center space-x-0.5">
              <div className="text-xs font-medium text-primary">
                {formatPrice(props.product.variants?.[0]?.price)}
              </div>
            </div>
            <QuantityInput
              value={quantity}
              onChange={(value) => {
                if (value <= 0) {
                  setQuantity(1);
                  api.start({ x: -SWIPE_TO_DELTE_OFFSET });
                } else {
                  handleQuantityChange(value);
                  if (value > quantity) {
                    api.start({ x: 0 });
                  }
                }
              }}
            />
          </div>
        </div>
      </animated.div>
    </div>
  );
}
