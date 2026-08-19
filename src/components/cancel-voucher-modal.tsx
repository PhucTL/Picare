import { voucherState } from "@/context/checkoutState";
import { cancelVoucherModalState } from "@/context/modalState";
import { useSetAtom } from "jotai";
import { Button } from "zmp-ui";

export default function CancelVoucherModal() {
  const setOpenModal = useSetAtom(cancelVoucherModalState);
  const setVoucher = useSetAtom(voucherState);
  const handleCancelVoucher = () => {
    setVoucher(undefined);
    setOpenModal(false);
  };
  return (
    <div className="fixed w-screen h-screen bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="flex flex-col w-[350px] bg-white rounded-lg pt-4 pb-6 px-6 mb-[100px] justify-center items-center space-y-4">
        <p className="text-[18px] font-semibold">Huỷ mã giảm giá?</p>
        <p className="text-[12px] text-gray-500">
          Bạn sẽ bỏ chọn mã giảm giá này, bạn vẫn có thể sử dụng lại nếu muốn.
        </p>
        <Button
          variant="primary"
          type="danger"
          fullWidth
          onClick={handleCancelVoucher}
        >
          Huỷ Bỏ
        </Button>
      </div>
    </div>
  );
}
