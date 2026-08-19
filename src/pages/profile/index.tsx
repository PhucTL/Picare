import { nativeStorage } from "zmp-sdk";
import ProfileActions from "./actions";
import FollowOA from "./follow-oa";
import Subscription from "./Subscription";
import InfomationSection from "./infomation";
import OrderAction from "./order-action";
export default function ProfilePage() {
  const userPhone = nativeStorage.getItem("userPhone");
  const parsedPhone = JSON.parse(userPhone);
  return (
    <div className="min-h-full bg-section p-4 space-y-2.5">
      {!userPhone ? (
        <Subscription
          title="Đăng ký thành viên Picare VN"
          description="Nhận mã giảm giá, ưu đãi khi liên kết tài khoản Zalo"
        />
      ) : (
        <InfomationSection phone={parsedPhone} />
      )}
      <OrderAction />
      <ProfileActions />
      <FollowOA />
    </div>
  );
}
