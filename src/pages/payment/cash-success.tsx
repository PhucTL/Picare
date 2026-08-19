import { Button, Page } from "zmp-ui";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { nativeStorage } from "zmp-sdk";
import { useSetAtom } from "jotai";
import { cartState } from "@/context/cartState";

export default function CashSuccessPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const setCart = useSetAtom(cartState);
  const appEnv = urlParams.get("env");
  const navigate = useNavigate();
  const handleBack = () => {
      nativeStorage.removeItem("nativeCart");
      nativeStorage.removeItem("nativeCheckout");
    setCart([]);
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  const handleSeeOrder = () => {
    setCart([]);
    navigate("/orders");
  };
  return (
    <Page className="page">
      <div className="flex flex-col h-screen overflow-hidden items-center justify-center pb-4 bg-white w-screen space-y-6">
        <TbRosetteDiscountCheckFilled size={100} className="text-[#16A34A]" />
        <p className="font-bold text-[24px]">Đặt hàng thành công</p>
        <p className="font-semibold text-gray-600">
          Picare VN xin cảm ơn quý khách.
        </p>
        <p className="text-[12px] text-gray-500 w-[80%] text-center ">
          Ghi chú: Bộ phận CSKH sẽ gọi cho quý khách để xác nhận đơn hàng.
        </p>
        <div className="w-[80%] flex items-center space-x-4">
          <Button
            variant="secondary"
            type="neutral"
            className="w-[50%]"
            onClick={handleBack}
          >
            Trang chủ
          </Button>
          <Button className="w-[50%]" onClick={handleSeeOrder}>
            Xem đơn hàng
          </Button>
        </div>
      </div>
    </Page>
  );
}
