import { Button } from "zmp-ui";
import DefaultInput from "./default-input";
import { useAtomValue, useSetAtom } from "jotai";
import { voucherModalState } from "@/context/modalState";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  checkVoucherService,
  getVoucherByCode,
} from "@/service/voucherService";
import toast from "react-hot-toast";
import { customerState, voucherState } from "@/context/checkoutState";
import { cartSummaryState } from "@/context/cartState";

export const VoucherModal = () => {
  const setIsToggleModal = useSetAtom(voucherModalState);
  const customer = useAtomValue(customerState);
  const setVoucher = useSetAtom(voucherState);
  const { totalPrice } = useAtomValue(cartSummaryState);
  const [submitData, setSubmitData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const checkMutation = useMutation({
    mutationKey: ["checkValidVoucher"],
    onMutate: () => {
      setIsLoading(true);
    },
    mutationFn: ({
      code,
      customerId,
      amount,
    }: {
      code: string;
      customerId: string;
      amount: number;
    }) => checkVoucherService(code, customerId, amount),
    onSuccess: (data) => {
      if (data === "Mã này đã được sử dung") {
        setIsLoading(false);
        toast("Mã này đã được bạn sử dụng", {
          icon: "⛔",
        });
        return;
      }
      if (data === "Đơn hàng không đủ để áp dụng mã giảm giá này") {
        setIsLoading(false);

        toast(data, {
          icon: "⛔",
        });
        return;
      }
      if (data === "Mã giảm giá không hợp lệ") {
        setIsLoading(false);

        toast(data, {
          icon: "⛔",
        });
        return;
      }
      if (data === "Mã này không thể áp dụng ở nền tảng này") {
        setIsLoading(false);
        toast("Mã này không thể áp dụng ở nền tảng này", {
          icon: "⛔",
        });
        return;
      }
      mutation.mutateAsync(submitData);
      setIsLoading(false);
    },
  });

  const mutation = useMutation({
    mutationKey: ["get-voucher"],
    mutationFn: getVoucherByCode,
    onSuccess: (data) => {
      setVoucher(data?.[0]);
      setIsToggleModal(false);
      toast("Áp dụng thành công!!!", { icon: "😘" });
    },
  });

  const handleOnChange = (e) => {
    setSubmitData(e.target.value);
  };

  const handleSubmit = async () => {
    if (!submitData) {
      toast("Vui lòng nhập mã giảm giá", { icon: "⛔" });
      return;
    }

    try {
      if (customer?.id && submitData) {
        await checkMutation.mutateAsync({
          code: submitData,
          customerId: customer.id,
          amount: totalPrice,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleOffModal = () => {
    setIsToggleModal(false);
  };

  return (
    <div className="fixed w-screen h-screen bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="flex flex-col w-[350px] bg-white rounded-lg py-4 px-4 mb-[100px]">
        <p className="text-[18px] font-semibold">Áp dụng voucher</p>
        <p className="text-[12px] py-3">
          Vui lòng nhập mã giảm giá (nếu có) từ OA Picare VN, sau đó nhấn "Áp
          Dụng" để sử dụng mã giảm giá
        </p>
        <DefaultInput
          placeholder="VD: HOTDEAL123"
          label="Mã giảm giá"
          value={submitData}
          helperText="Giảm giá sẽ áp dụng cho tổng hoá đơn"
          onChange={handleOnChange}
        />
        <div className="flex space-x-3 justify-end pt-4 pb-2">
          <Button
            variant="secondary"
            type="danger"
            onClick={handleToggleOffModal}
          >
            Huỷ Bỏ
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Đang tải..." : "Áp Dụng"}
          </Button>
        </div>
      </div>
    </div>
  );
};
