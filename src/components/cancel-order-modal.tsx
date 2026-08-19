import { cancelOrderModalState } from "@/context/modalState";
import { cancelOrderService } from "@/service/orderService";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "zmp-ui";

export default function CancelOrderDefault() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [submitData, setSubmitData] = useState({
    reason: "customer",
    note: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const setIsToggleModal = useSetAtom(cancelOrderModalState);
  const handleCloseModal = () => {
    setIsToggleModal(false);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const mutation = useMutation({
    mutationKey: ["cancelOrder"],
    mutationFn: async ({ id, data }: { id: string; data: any }) =>
      cancelOrderService(id, data),
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data === "OK") {
        toast("Yêu cầu huỷ đơn hàng đã được gửi lên hệ thống", {
          icon: "🥹",
        });
        setIsLoading(false);
        setIsToggleModal(false);
        setTimeout(() => {
          navigate("/orders");
        }, 700);
      }
    },
  });
  const handleSubmit = async () => {
    if (!submitData.reason) {
      toast("Vui lòng nhập lý do huỷ...", {
        icon: "😢",
      });
      return;
    }
    try {
      if (orderId) {
        await mutation.mutateAsync({
          id: orderId,
          data: submitData,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed w-screen h-screen bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="flex flex-col w-[350px] bg-white rounded-lg pt-4 pb-6 px-6 mb-[100px] justify-center items-center space-y-4">
        <p className="text-[18px] font-semibold">Huỷ đơn hàng</p>
        <Input.TextArea
          label="Lý do huỷ"
          helperText="Vui lòng nhập lý do huỷ."
          placeholder="Nhập lý do"
          className="w-full min-h-[100px]"
          name="note"
          value={submitData.note}
          onChange={handleOnChange}
        />
        <div className="flex space-x-3 w-full">
          <Button
            variant="secondary"
            type="neutral"
            fullWidth
            onClick={handleCloseModal}
          >
            Huỷ bỏ
          </Button>
          <Button
            variant="primary"
            type="danger"
            fullWidth
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
}
