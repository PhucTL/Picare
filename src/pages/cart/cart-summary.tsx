import Button from "@/components/button";
import { CustomerSupportIcon } from "@/components/vectors";
import { useCustomerSupport } from "@/hooks";
import { useAtomValue } from "jotai";
import { formatPrice } from "@/utils/format";
import { cartSummaryState } from "@/context/cartState";
import { useNavigate } from "react-router-dom";
import { personalState } from "@/context/checkoutState";
import { clearAllDataFromStorage } from "@/service/checkoutService";
import { getTokenPhone } from "@/service/authorizeService";
export default function CartSummary() {
  const navigate = useNavigate();
  const { totalPrice, totalAmount } = useAtomValue(cartSummaryState);
  const handleGoToCheckout = async () => {
    navigate("/checkout");
  };

  return (
    <div className="flex-none flex items-center py-3 px-4 space-x-2">
      <div className="space-y-1 flex-1">
        <div className="text-2xs text-subtitle">Tổng cộng ({totalAmount})</div>
        <div className="text-sm font-medium text-primary">
          {formatPrice(totalPrice)}
        </div>
      </div>
      <Button primary onClick={handleGoToCheckout}>
        Mua ngay
      </Button>
    </div>
  );
}
