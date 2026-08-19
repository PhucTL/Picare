import { formatDate, formatPrice } from "@/utils/format";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function DefaultOrderItem({ id, date, total, status }) {
  const navigate = useNavigate();
  const checkStatus = (orderStatus: string) => {
    switch (orderStatus) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "readytopick":
        return "Chờ lấy hàng";
      case "delivering":
        return "Đang giao hàng";
      case "delivered":
        return "Đã hoàn thành";
      case "cancel":
        return "Đã hủy";
      case "refunded":
        return "Hoàn tiền";
      default:
        return "Không xác định";
    }
  };

  const checkThemeStatus = (orderStatus: string) => {
    switch (orderStatus) {
      case "pending":
        return "text-[#F59E0B] bg-[#F59E0B1A]";
      case "confirmed":
        return "text-[#3B82F6] bg-[#3B82F61A]";
      case "cancel":
        return "text-[#EF4444] bg-[#EF44441A]";
      case "delivered":
        return "text-[#10B981] bg-[#10B9811A]";
      case "delivering":
        return "text-[#EAB308] bg-[#EAB3081A]";
      case "refunded":
        return "text-[#8B5CF6] bg-[#8B5CF61A]";
      case "readytopick":
        return "text-[#666666] bg-[#FFFF66]";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };
  console.log("status:", status);

  const handleNavigate = (id: string) => {
    navigate(`/orders/detail/${id}`);
  };
  return (
    <div
      className="flex justify-between px-4 py-4 border border-gray-400 rounded-lg"
      onClick={() => handleNavigate(id)}
    >
      <div className="flex flex-col justify-between space-y-1">
        <p className="text-[18px] font-semibold">ID: {id}</p>
        <p className="text-[13px] text-gray-500">
          Ngày tạo: {formatDate(date)}
        </p>
        <p className="pt-2 font-semibold text-primary">{formatPrice(total)}</p>
      </div>
      <div className="flex flex-col justify-between">
        <p
          className={`text-[8px] px-3 py-1 rounded-lg font-bold ${checkThemeStatus(
            status
          )}`}
        >
          {checkStatus(status)}
        </p>
        <MdNavigateNext className="self-end text-primary" size={30} />
      </div>
    </div>
  );
}
