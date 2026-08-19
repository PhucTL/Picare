import { Cart } from "@/interfaces/Cart";
import { getCartFromStorage } from "@/service/cartService";
import { atom } from "jotai";

export const cartState = atom<Cart>(getCartFromStorage());

export const cartSummaryState = atom((get) => {
  const cart = get(cartState);
  return cart.reduce(
    (summary, item) => {
      const itemPrice = item.product.variants?.[0]?.price || 0;
      summary.totalPrice += itemPrice * item.quantity;
      summary.totalAmount += item.quantity;
      return summary;
    },
    { totalPrice: 0, totalAmount: 0 }
  );
});
