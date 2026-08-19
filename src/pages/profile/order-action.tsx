import { LuCalendarClock } from "react-icons/lu";
import { TbClipboardCheck } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { TbShoppingBagHeart } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function OrderAction() {
  return (
    <div className="flex rounded-lg p-4 border-[0.5px] border-black/15 bg-white justify-between">
      <Link
        to="/orders"
        state={{ key: "pending" }}
        className="flex flex-col items-center space-y-2"
      >
        <LuCalendarClock size={26} className="text-primary" />
        <p className="text-[8px] font-semibold text-primary">Chờ xác nhận</p>
      </Link>

      <Link
        to="/orders"
        state={{ key: "confirm" }}
        className="flex flex-col items-center space-y-2"
      >
        <TbClipboardCheck size={26} className="text-primary" />
        <p className="text-[8px] font-semibold text-primary">Đã xác nhận</p>
      </Link>
      <Link
        to="/orders"
        state={{ key: "waiting" }}
        className="flex flex-col items-center space-y-2"
      >
        <TbTruckDelivery size={26} className="text-primary" />
        <p className="text-[8px] font-semibold text-primary">Đang giao hàng</p>
      </Link>
      <Link
        to="/orders"
        state={{ key: "complete" }}
        className="flex flex-col items-center space-y-2"
      >
        <TbShoppingBagHeart size={26} className="text-primary" />
        <p className="text-[8px] font-semibold text-primary">Giao thành công</p>
      </Link>
    </div>
  );
}
