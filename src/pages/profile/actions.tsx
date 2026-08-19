import { Link, useNavigate } from "react-router-dom";
import { LuBookCheck } from "react-icons/lu";
import { MdOutlineNavigateNext } from "react-icons/md";
import { TiPinOutline } from "react-icons/ti";
import { BiHelpCircle } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";
import {
  createMiniAppShortcut,
  openChatScreen,
  showQR,
} from "@/service/authorizeService";
import { nativeStorage } from "zmp-sdk";
import { FaNewspaper } from "react-icons/fa";

export default function ProfileActions() {
  const navigate = useNavigate();
  const clearData = () => {
    try {
      nativeStorage.clear();
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  const handleCreateShorcut = () => {
    createMiniAppShortcut();
  };
  const handleShowQr = () => {
    showQR();
  };
  const handleDeleteData = () => {
    clearData();
    window.location.reload();
  };
  const openChat = () => {
    openChatScreen();
  };
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col space-y-8 border-[0.5px] border-black/15">
      <div className="flex justify-between items-center">
        <Link to="/policy" className="flex space-x-3">
          <LuBookCheck size={24} />
          <p className="font-semibold">Chính sách và Điều khoản</p>
        </Link>
        <MdOutlineNavigateNext size={24} />
      </div>
      <div
        className="flex justify-between items-center"
        onClick={handleCreateShorcut}
      >
        <div className="flex space-x-3">
          <TiPinOutline size={24} />
          <p className="font-semibold">Ghim ra màn hình chinh</p>
        </div>
        <MdOutlineNavigateNext size={24} />
      </div>
      <div className="flex justify-between items-center" onClick={openChat}>
        <div className="flex space-x-3">
          <BiHelpCircle size={24} />
          <p className="font-semibold">Bạn cần hỗ trợ?</p>
        </div>
        <MdOutlineNavigateNext size={24} />
      </div>
      <div className="flex justify-between items-center" onClick={handleShowQr}>
        <div className="flex space-x-3">
          <IoShareSocialOutline size={24} />
          <p className="font-semibold">Chia sẻ Picare VN</p>
        </div>
        <MdOutlineNavigateNext size={24} />
      </div>
      <div className="flex justify-between items-center">
        <Link to="/introduce" className="flex space-x-3">
          <FaNewspaper size={24} />
          <p className="font-semibold">Giới thiệu</p>
        </Link>
        <MdOutlineNavigateNext size={24} />
      </div>
    </div>
  );
}
