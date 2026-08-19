import { BiWifiOff } from "react-icons/bi";

export default function ErrorLostConnection() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center space-y-6 pb-[120px]">
        <BiWifiOff size={60} className="text-inactive" />
        <div className="text-sm max-w-[70%] text-inactive text-center">
          Vui lòng kiểm tra kết nối Wifi
        </div>
      </div>
    </div>
  );
}
