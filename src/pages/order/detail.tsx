import HorizontalDivider from "@/components/horizontal-divider";
import Section from "@/components/section";
import { TbTruckDelivery } from "react-icons/tb";
import CartOrderItem from "./cart-order-item";
import { formatDate, formatPrice } from "@/utils/format";
import { MdOutlineNavigateNext } from "react-icons/md";
import { LuPackageX } from "react-icons/lu";
import { TiMessages } from "react-icons/ti";
import { Button } from "zmp-ui";
import { openCallScreen, openChatScreen } from "@/service/authorizeService";
import { MdPhoneForwarded } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useDetailOrder } from "@/hooks/hooks";
import { useAtomValue, useSetAtom } from "jotai";
import { cancelOrderModalState } from "@/context/modalState";
import CancelOrderDefault from "@/components/cancel-order-modal";
import toast from "react-hot-toast";
import { OrderDetailSkeleton } from "@/components/skeleton";
import { openWebview } from "zmp-sdk";
import ErrorLostConnection from "@/components/lost-connection";

export default function OrderDetail() {
  const isToggleModal = useAtomValue(cancelOrderModalState);
  return (
    <div className="flex flex-col relative">
      {isToggleModal && <CancelOrderDefault />}
      <DeliverySummary />
      <HorizontalDivider />
      <PersonalInfomation />
      <HorizontalDivider />
      <CartOrder />
      <HorizontalDivider />
      <OrderAmountDetail />
      <HorizontalDivider />
      <SupportSection />
      <ButtonAction />
    </div>
  );
}

function DeliverySummary() {
  const { orderId } = useParams();
  const { data: orderDetail } = useDetailOrder(orderId as string);
  const fulfillments = orderDetail?.fulfillments[0];
  const checkStatus = (orderStatus: string) => {
    switch (orderStatus) {
      case "pending":
        return "Đơn hàng đang chờ xác nhận";
      case "confirmed":
        return "Đơn hàng đã được xác nhận";
      case "carrier_delivery":
        return "Đơn hàng đang được giao";
      case "complete":
        return "Đơn hàng được giao thành công";
      case "cancel":
        return "Đơn hàng của bạn đã bị huỷ";
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
      case "carrier_delivery":
        return "text-[##EAB308] bg-[#EAB3081A]";
      case "complete":
        return "text-[#10B981] bg-[#10B9811A]";
      case "cancel":
        return "text-[#EF4444] bg-[#EF44441A]";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  const deliveryNameStatus = (code: string) => {
    switch (code) {
      case "readytopick":
        return "Chờ lấy hàng";
      case "delivering":
        return "Đang giao hàng";
      case "delivered":
        return "Đã giao hàng";
      case "cancel":
        return "Đã huỷ giao hàng";
      default:
        return "";
    }
  };
  const deliveryThemeStatus = (code: string) => {
    switch (code) {
      case "readytopick":
        return "text-[#F59E0B]";
      case "delivering":
        return "text-[#3B82F6]";
      case "delivered":
        return "text-[#10B981]";
      case "cancel":
        return "text-[#EF4444]";
      default:
        return "";
    }
  };
  const handleFollowDelivery = (url: string) => {
    window.open(url);
  };
  const openUrlInWebview = async (url: string) => {
    try {
      await openWebview({
        url: url,
        config: {
          style: "bottomSheet",
          leftButton: "back",
        },
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col">
      <div
        className={`w-full px-4 py-4 ${checkThemeStatus(
          orderDetail?.order_processing_status as string
        )}`}
      >
        <p className="font-bold">
          {checkStatus(orderDetail?.order_processing_status as string)}
        </p>
      </div>
      {fulfillments && (
        <div className="flex flex-col px-4 space-y-2 py-4">
          <p className="text-[14px] font-bold">
            Đơn vị vận chuyển: {fulfillments.tracking_company}
          </p>
          <div className="flex items-center space-x-4">
            <TbTruckDelivery size={24} className="text-gray-500" />
            <div className="flex flex-col">
              <p
                className={`text-[13px] font-semibold ${deliveryThemeStatus(
                  fulfillments.carrier_status_code
                )}`}
              >
                {deliveryNameStatus(fulfillments.carrier_status_code)}
              </p>
              {fulfillments.carrier_status_code === "cancel" && (
                <p className="text-[8px]">
                  Xin lỗi vì đơn hàng của bạn đã bị huỷ giao hàng, bộ phận CSKH
                  sẽ liên hệ cho bạn.
                </p>
              )}
              {fulfillments.carrier_status_code === "readytopick" && (
                <>
                  {fulfillments.ready_to_pick_date && (
                    <p className="text-[12px]">
                      Sẵn sàng lấy hàng vào{" "}
                      {formatDate(fulfillments.ready_to_pick_date)}
                    </p>
                  )}
                </>
              )}
              {fulfillments.carrier_status_code === "delivering" && (
                <>
                  {fulfillments.delivering_date && (
                    <p className="text-[12px]">
                      {formatDate(fulfillments.delivering_date)}
                    </p>
                  )}
                </>
              )}
              {fulfillments.carrier_status_code === "delivered" && (
                <>
                  {fulfillments.delivered_date && (
                    <p className="text-[12px]">
                      {formatDate(fulfillments.delivered_date)}
                    </p>
                  )}
                </>
              )}
              <div
                className="text-[10px] mt-2 py-1 px-2 border w-fit rounded-lg border-black"
                onClick={() => openUrlInWebview(fulfillments.tracking_url)}
              >
                Theo dõi đơn hàng
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CartOrder() {
  const { orderId } = useParams();
  const { data: orderDetail } = useDetailOrder(orderId as string);
  const cart = orderDetail?.line_items;
  return (
    <Section title="Sản phẩm đã mua">
      <div className="flex flex-col gap-y-2 px-4 py-3 bg-white">
        <div className="flex-1 overflow-y-auto">
          {cart?.map((item) => (
            <CartOrderItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function OrderAmountDetail() {
  const { orderId } = useParams();
  const { data: orderDetail } = useDetailOrder(orderId as string);
  const shipping = orderDetail?.shipping_lines[0];
  const checkFinancialStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ thanh toán";
      case "paid":
        return "Đã thanh toán";
      default:
        return "";
    }
  };
  const checkFinancialThemeStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "text-[#F59E0B]";
      case "paid":
        return "text-[#10B981]";
      default:
        return "";
    }
  };
  return (
    <div className="flex flex-col py-3 ">
      <div className="flex items-center justify-between px-2">
        <div className="text-sm font-medium p-2 truncate">Mã đơn hàng</div>
        <div className="flex items-center space-x-2">
          <div className="font-bold text-sm">#{orderDetail?.id}</div>
          <div className="text-[8px] px-2 py-[2px] rounded-md border border-black">
            Sao chép
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 px-4 pt-2 bg-white">
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-gray-600">Phương thức thanh toán</p>
          <p className="text-[12px] text-gray-600">{orderDetail?.gateway}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-gray-600">Tổng thanh toán</p>
          <p className="text-[12px] text-gray-600">
            {formatPrice(orderDetail?.subtotal_price as number)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[12px] text-gray-600">Giảm giá</p>
          <p className="text-[12px] text-gray-600">
            {formatPrice(orderDetail?.total_discounts as number)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[12px] text-gray-600">Chi phí vận chuyển</p>
          <p className="text-[12px] text-gray-600">
            {shipping?.price === 0
              ? "Miễn phí"
              : formatPrice(shipping?.price as number)}
          </p>
        </div>
        <div className="flex items-center justify-between pt-2">
          <p
            className={`text-[14px] font-semibold ${checkFinancialThemeStatus(
              orderDetail?.financial_status as string
            )}`}
          >
            {checkFinancialStatus(orderDetail?.financial_status as string)}
          </p>
          <p className="text-[14px] font-semibold text-black">
            Tổng {""} {formatPrice(orderDetail?.total_price as number)}
          </p>
        </div>
      </div>
    </div>
  );
}

function SupportSection() {
  const setIsToggleModal = useSetAtom(cancelOrderModalState);
  const { orderId } = useParams();
  const { data: orderDetail } = useDetailOrder(orderId as string);
  const status = orderDetail?.order_processing_status;
  const handleOpenModal = () => {
    if (
      status === "carrier_delivery" ||
      status === "complete" ||
      status === "cancel"
    ) {
      toast("Đơn hàng không thể huỷ, vui lòng liên hệ với Picare VN.", {
        icon: "❌",
      });
      return;
    }
    setIsToggleModal(true);
  };
  const openChat = () => {
    openChatScreen();
  };
  const openPhone = () => {
    openCallScreen();
  };
  return (
    <Section title="Bạn cần hỗ trợ?">
      <div className="flex flex-col  px-4 py-3 space-y-2 mb-[150px]">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center space-x-2">
            <LuPackageX size={20} />
            <p className="text-sm" onClick={handleOpenModal}>
              Gửi yêu cầu Huỷ đơn hàng
            </p>
          </div>
          <MdOutlineNavigateNext size={20} />
        </div>
        <div
          className="flex justify-between items-center border-b py-3"
          onClick={openChat}
        >
          <div className="flex items-center space-x-2">
            <TiMessages size={20} />
            <p className="text-sm">Liên hệ với Picare VN</p>
          </div>
          <MdOutlineNavigateNext size={20} />
        </div>
        <div
          className="flex justify-between items-center border-b py-3"
          onClick={openPhone}
        >
          <div className="flex items-center space-x-2">
            <MdPhoneForwarded size={20} />
            <p className="text-sm">Gọi Chăm sóc khách hàng</p>
          </div>
          <MdOutlineNavigateNext size={20} />
        </div>
      </div>
    </Section>
  );
}

function PersonalInfomation() {
  const { orderId } = useParams();
  const { data: orderDetail } = useDetailOrder(orderId as string);
  return (
    <Section title="Thông tin cá nhân">
      <div className="flex flex-col gap-y-2 px-4 py-4 bg-white">
        <div className="flex items-center gap-x-2 justify-between">
          <p className="text-[12px] font-semibold text-gray-600">
            Tên người đặt:
          </p>
          <p className="text-[13px] font-semibold text-gray-800">
            {orderDetail?.billing_address.first_name}{" "}
            {orderDetail?.billing_address.last_name}
          </p>
        </div>
        <div className="flex items-center gap-x-2 justify-between">
          <p className="text-[12px] font-semibold text-gray-600">
            Số điện thoại:
          </p>
          <p className="text-[13px] font-semibold text-gray-800">
            {orderDetail?.billing_address.phone}
          </p>
        </div>
        <div className="flex flex-col gap-y-2 py-2 bg-white">
          <div className="flex items-center gap-x-2 justify-between">
            <p className="text-[12px] font-semibold text-gray-600">Địa chỉ:</p>
            <p className="text-[13px] font-semibold text-gray-700 overflow-hidden line-clamp-2 text-ellipsis max-w-[75%]">
              {orderDetail?.billing_address.address1},{" "}
              {orderDetail?.billing_address.ward},{" "}
              {orderDetail?.billing_address.district},{" "}
              {orderDetail?.billing_address.province}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ButtonAction() {
  const { orderId } = useParams();
  const { data: orderDetail } = useDetailOrder(orderId as string);
  const status = orderDetail?.order_processing_status;
  const setIsToggleModal = useSetAtom(cancelOrderModalState);
  const handleOpenModal = () => {
    if (
      status === "carrier_delivery" ||
      status === "complete" ||
      status === "cancel"
    ) {
      toast("Đơn hàng không thể huỷ, vui lòng liên hệ với Picare VN.", {
        icon: "❌",
      });
      return;
    }
    setIsToggleModal(true);
  };
  const openChat = () => {
    openChatScreen();
  };

  return (
    <div className="fixed w-screen left-0 bottom-0 bg-white px-4 py-[40px]">
      <div className="flex items-center w-full gap-x-3">
        <Button
          className="w-[50%]"
          variant="secondary"
          type="danger"
          onClick={handleOpenModal}
        >
          Huỷ đơn hàng
        </Button>
        <Button className="w-[50%]" onClick={openChat}>
          Chat với Picare VN
        </Button>
      </div>
    </div>
  );
}
