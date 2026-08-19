import CartList from "./cart-list";
import ApplyVoucher from "./apply-voucher";
import CartSummary from "./cart-summary";
import HorizontalDivider from "@/components/horizontal-divider";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { EmptyBoxIcon } from "@/components/vectors";
import { cartState } from "@/context/cartState";
import { voucherState } from "@/context/checkoutState";
import { useEffect } from "react";

export default function CartPage() {
  const cart = useAtomValue(cartState);

  if (!cart.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
        <EmptyBoxIcon />
        <div className="text-2xs text-inactive text-center">
          Không có sản phẩm trong giỏ hàng
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col">
      <CartList />
      <HorizontalDivider />
      <CartSummary />
    </div>
  );
}
