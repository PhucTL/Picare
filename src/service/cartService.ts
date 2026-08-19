import { voucherState } from "@/context/checkoutState";
import { Cart } from "@/interfaces/Cart";
import { Product } from "@/interfaces/Product";
import { useSetAtom } from "jotai";
import { nativeStorage } from "zmp-sdk";

const urlParams = new URLSearchParams(window.location.search);
const appEnv = urlParams.get("env");

export const getCartFromStorage = (): Cart => {
  const nativeCart = nativeStorage.getItem("nativeCart");
  return nativeCart ? JSON.parse(nativeCart) : [];
};

export const saveCartToStorage = (cart: Cart) => {
  nativeStorage.setItem("nativeCart", JSON.stringify(cart));
};

export const addToCart = (
  product: Product,
  quantity: number,
  setCart: (update: (prevCart: Cart) => Cart) => void
) => {
  setCart((prevCart) => {
    const existingProductIndex = prevCart.findIndex(
      (item) => item.product.id === product.id
    );

    let updatedCart;
    if (existingProductIndex !== -1) {
      updatedCart = [...prevCart];
      updatedCart[existingProductIndex].quantity += quantity;
    } else {
      updatedCart = [...prevCart, { id: product.id, product, quantity }];
    }

    saveCartToStorage(updatedCart);
    return updatedCart;
  });
};

export const removeFromCart = (
  productId: string,
  setCart: (update: (prevCart: Cart) => Cart) => void
) => {
  setCart((prevCart) => {
    const updatedCart = prevCart.filter((item) => item.id !== productId);
    saveCartToStorage(updatedCart);
    return updatedCart;
  });
};

export const updateCartItemQuantity = (
  itemId: string,
  quantity: number,
  setCart: (update: (prevCart: Cart) => Cart) => void
) => {
  setCart((prevCart) => {
    const updatedCart = prevCart.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(quantity, 1) } : item
    );

    saveCartToStorage(updatedCart);
    return updatedCart;
  });
};
