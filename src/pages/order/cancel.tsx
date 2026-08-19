import { useOrdersByPhone } from "@/hooks/hooks";
import { nativeStorage } from "zmp-sdk";
import DefaultOrderItem from "./item";
import { RiFileList3Line } from "react-icons/ri";
import { OrderSkeleton } from "@/components/skeleton";
import ErrorLostConnection from "@/components/lost-connection";

export default function CancelOrders() {
  const phone = nativeStorage.getItem("userPhone");
  const parsedPhone = JSON.parse(phone);
  const {
    data: orders,
    isLoading,
    isFetching,
    isError,
  } = useOrdersByPhone(parsedPhone);
  const filteredOrders = orders?.filter(
    (order) =>
      order.fulfillments?.length > 0 &&
      order.order_processing_status === "cancel"
  );
  if (isLoading || isFetching) {
    return (
      <>
        <OrderSkeleton />
      </>
    );
  }
  if (isError) {
    return (
      <>
        <ErrorLostConnection />
      </>
    );
  }
  if (!filteredOrders?.length) {
    return (
      <div className="w-screen h-screen">
        <div className="w-full h-full flex flex-col items-center justify-center space-y-6 pb-[120px]">
          <RiFileList3Line size={60} className="text-inactive" />
          <div className="text-sm max-w-[70%] text-inactive text-center">
            Không tìm thấy đơn hàng nào.
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col py-4 px-4 space-y-3">
      {filteredOrders?.map((order) => (
        <DefaultOrderItem
          key={order.id}
          id={order.id}
          date={order.created_at}
          total={order.total_price}
          status={order.fulfillments?.[0].carrier_status_code}
        />
      ))}
    </div>
  );
}
