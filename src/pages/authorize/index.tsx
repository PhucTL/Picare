import { Button, Page } from "zmp-ui";
import image from "@/static/7718877.jpg";
import { FaBookOpen } from "react-icons/fa";
import { IoChatbubbleSharp } from "react-icons/io5";
import { RiBookFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authorize, nativeStorage } from "zmp-sdk";
import toast, { Toaster } from "react-hot-toast";
import {
  createNewCustomer,
  getAccessTokenZalo,
  getPhoneNumberService,
  getTokenPhone,
  getUserZaloID,
} from "@/service/authorizeService";
import { useMutation } from "@tanstack/react-query";
import { InputPhone } from "@/interfaces/Zalo";

export default function AuthorizePage() {
  const navigate = useNavigate();
  const [submitData, setSubmitData] = useState<InputPhone | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTokensAndData = async () => {
      try {
        const accessToken = await getAccessTokenZalo();
        const phoneToken = await getTokenPhone();

        if (accessToken && phoneToken) {
          setSubmitData({
            AccessToken: accessToken,
            Code: phoneToken,
          });
        }
      } catch (error) {
        console.error("Lỗi khi lấy token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokensAndData();
  }, []);

  const createUserMutation = useMutation({
    mutationKey: ["createUser"],
    mutationFn: createNewCustomer,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const mutation = useMutation({
    mutationKey: ["getPhone"],
    mutationFn: getPhoneNumberService,
    onSuccess(data) {
      console.log(data);
      if (data.error === 119 || data.error === 115) {
        toast("Liên kết thất bại, vui lòng đợi trong giây lát", { icon: "⛔" });
        setTimeout(() => {
          window.location.reload();
        }, 700);
      } else {
        console.log(data);
        let phoneNumber = data.PhoneNumber;
        let token = data.Token;
        console.log(phoneNumber);
        // Chuyển đổi từ 84xxx -> 0xxx
        if (phoneNumber.startsWith("84")) {
          phoneNumber = "0" + phoneNumber.slice(2);
        }

        nativeStorage.setItem("userPhone", JSON.stringify(phoneNumber));
        nativeStorage.setItem("token", token);
        toast("Liên kết thành công!!!", { icon: "✅" });
        createUserMutation.mutateAsync({ phone: phoneNumber });
        setTimeout(() => {
          navigate("/");
        }, 700);
      }
    },
    onError(error) {
      toast("Có lỗi xảy ra, vui lòng thử lại sau!", { icon: "⚠️" });
    },
  });

  const handleAuthorize = async () => {
    if (isLoading) {
      toast("Đang tải dữ liệu, vui lòng chờ!", { icon: "⏳" });
      return;
    }

    if (!submitData) {
      toast("Dữ liệu chưa sẵn sàng, vui lòng thử lại!", { icon: "⚠️" });
      return;
    }

    try {
      await getUserZaloID();
      await authorize({ scopes: ["scope.userPhonenumber"] });
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = () => {
    navigate("/");
  };

  return (
    <Page className="page">
      <Toaster containerClassName="toast-container" />
      <div className="flex flex-col justify-between overflow-hidden h-screen bg-white w-screen items-center pb-8">
        <img src={image} alt="" className="w-full h-[45%] object-cover" />
        <p className="max-w-[80%] text-[30px] text-center font-bold text-primary">
          Chào mừng bạn đến với Picare VN!
        </p>
        <div className="flex flex-col w-[80%] space-y-5">
          <div className="flex items-center space-x-3">
            <FaBookOpen className="text-primary" size={22} />
            <p className="font-semibold text-gray-500">
              Kiểm tra lịch sử đơn hàng.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <RiBookFill className="text-primary" size={22} />
            <p className="font-semibold text-gray-500">
              Nhận thông tin thay đổi trạng thái đơn hàng.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <IoChatbubbleSharp className="text-primary" size={22} />
            <p className="font-semibold text-gray-500">
              Trao đổi thông tin trực tiếp.
            </p>
          </div>
        </div>
        <p className="max-w-[80%] font-semibold text-gray-500">
          Vui lòng đồng ý chia sẻ số điện thoại để liên kết với tài khoản của
          bạn trên hệ thống Trung Hạnh Pharma.
        </p>
        <Button
          className="w-[80%] bg-primary"
          onClick={handleAuthorize}
          disabled={isLoading}
        >
          {isLoading ? "Đang tải dữ liệu..." : "Liên kết số điện thoại"}
        </Button>
        <Button
          className="w-[80%]"
          type="danger"
          variant="secondary"
          onClick={handleReject}
        >
          Từ chối và Thoát
        </Button>
      </div>
    </Page>
  );
}
