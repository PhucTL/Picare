import Button from "@/components/button";
import { customerState } from "@/context/checkoutState";
import { Personal } from "@/interfaces/Checkout";
import { updateCustomerInfo } from "@/service/authorizeService";
import { setPersonalToStorage } from "@/service/checkoutService";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { nativeStorage } from "zmp-sdk";
import { Box, Input } from "zmp-ui";

export default function InfomationPage() {
  const navigate = useNavigate();
  const userPhone = nativeStorage.getItem("userPhone");
  const customer = useAtomValue(customerState);
  const parsedPhone = JSON.parse(userPhone);
  const [personal, setPersonal] = useState<Personal>({
    first_name: "",
    last_name: "",
    phone: parsedPhone,
  });
  const [updateData, setUpdateData] = useState<Personal>({
    last_name: "",
    first_name: "",
  });
  const [isSpam, setIsSpam] = useState(true);
  const mutation = useMutation({
    mutationKey: ["updateInfo"],
    mutationFn: ({ userId, data }: { userId: string; data: Personal }) =>
      updateCustomerInfo(userId, data),
  });
  useEffect(() => {
    const storedPersonal = nativeStorage.getItem("savedNativePersonal");
    if (storedPersonal) {
      try {
        const parsedPersonal = JSON.parse(storedPersonal);
        setPersonal(parsedPersonal);
      } catch (error) {
        console.error("Failed to parse personal from localStorage:", error);
      }
    }
  }, []);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPersonal((prev) => ({
      ...prev,
      [name]: value,
    }));
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (customer?.id) {
        await mutation.mutateAsync({
          userId: customer.id,
          data: updateData,
        });
      }
      await setPersonalToStorage(personal);
      toast("Lưu thông tin thành công!!!", {
        icon: "✅",
      });
      setTimeout(() => {
        navigate(-1);
      }, 700);
    } catch (error) {
      toast("Lưu thông tin thất bại", {
        icon: "⛔",
      });
    }
  };
  useEffect(() => {
    const isFormComplete =
      personal.first_name.trim() !== "" &&
      personal.last_name.trim() !== "" &&
      personal?.phone?.trim() !== "";
    setIsSpam(!isFormComplete);
  }, [personal]);
  return (
    <div className="flex flex-col px-4 py-3 relative">
      <Box mt={6}>
        <Input
          name="first_name"
          type="text"
          label="Họ"
          helperText="Nhập họ của bạn"
          value={personal.first_name || ""}
          placeholder="VD: Trương Hoàng"
          onChange={handleOnChange}
          maxLength={30}
        />
      </Box>
      <Box mt={6}>
        <Input
          name="last_name"
          type="text"
          label="Tên"
          helperText="Nhập tên của bạn"
          value={personal.last_name || ""}
          placeholder="VD: Trí"
          onChange={handleOnChange}
          maxLength={10}
        />
      </Box>
      <Box mt={6}>
        <Input
          name="phone"
          type="text"
          label="Số điện thoại"
          value={personal.phone || ""}
          helperText="Số điện thoại để CSKH có thể liên lạc"
          placeholder="VD: 096261634"
          disabled
          maxLength={10}
        />
      </Box>
      <div className="fixed bottom-0 px-4 py-4 left-0 w-full bg-white">
        <Button
          primary
          className="w-full"
          onClick={handleSave}
          disabled={isSpam}
        >
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}
