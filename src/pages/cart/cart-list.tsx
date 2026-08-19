import CartItem from "./cart-item";
import { useAtomValue } from "jotai";
import { cartState } from "@/context/cartState";

export default function CartList() {
  const cart = useAtomValue(cartState);

  return (
    <div className="flex-1 overflow-y-auto">
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </div>
  );
}
