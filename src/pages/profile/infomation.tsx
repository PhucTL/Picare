import { TbUserCheck } from "react-icons/tb";

export default function InfomationSection({ phone }) {
  return (
    <div className="flex items-center  bg-primary text-white rounded-xl p-4 space-x-3">
      {/* <TbUserCheck size={24} /> */}
      <div className="flex flex-col space-y-2">
        <p className="font-bold text-lg">Xin chào, {phone}</p>
        <p className="text-sm">Picare VN chúc quý khách sức khoẻ, bình an.</p>
      </div>
    </div>
  );
}
