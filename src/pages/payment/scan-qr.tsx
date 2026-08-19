import { Button, Page } from "zmp-ui";
import qr from "@/static/qr picare.png";
import { formatPrice } from "@/utils/format";

import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { totalBillState } from "@/context/checkoutState";

export default function ScanQrPage() {
  const totalBill = useAtomValue(totalBillState);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/order-success");
  };
  return (
    <Page className="page">
      <div className="flex flex-col h-screen overflow-hidden items-center justify-between pb-4 bg-white w-screen">
        <img src={qr} alt="" className="w-screen h-[50%] object-cover" />
        <p className="text-[20px] font-semibold">Thông tin chuyển khoản</p>
        <div className="flex flex-col w-full space-y-4">
          <div className="flex items-center justify-center space-x-1">
            <p className="text-sm">Ngân hàng thụ hưởng : </p>
            <p className="text-sm font-bold text-primary">MSB BANK</p>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <p className="text-sm">Tên tài khoản : </p>
            <p className="text-sm font-bold text-primary">
              CTY TNHH PICARE VIETNAM
            </p>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <p className="text-sm">Số tài khoản : </p>
            <p className="text-sm font-bold text-primary">04301010052655</p>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <p className="text-sm">Số tiền : </p>
            <p className="text-sm font-bold text-primary">
              {formatPrice(totalBill)}
            </p>
          </div>
        </div>
        <p className="text-[12px] text-red-500 w-[80%]">
          Lưu ý: Khách hàng sau khi chuyển khoản thành công vui lòng chụp lại
          màn hình để tránh trường hợp chuyển khoản nhầm hoặc sai sót.
        </p>
        <Button
          className="w-[80%] bg-primary mb-[25px]"
          onClick={handleNavigate}
        >
          Hoàn tất chuyển khoản
        </Button>
      </div>
    </Page>
  );
}
