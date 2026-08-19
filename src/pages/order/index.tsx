import { Page, Tabs } from "zmp-ui";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PendingOrders from "./pending";
import ConfirmedOrder from "./confirmed";
import WaitingDeliveryOrder from "./waiting_delivery";
import CompleteOrders from "./complete";
import CancelOrders from "./cancel";
import DeliveryOrder from "./delivery";

export default function OrderPage() {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("pending");

  // Set the initial active key from location state
  useEffect(() => {
    if (location.state?.key) {
      setActiveKey(location.state.key);
    }
  }, [location.state?.key]);

  return (
    <Page>
      <div className="flex flex-col">
        <Tabs
          id="order-list"
          scrollable
          activeKey={activeKey}
          onChange={setActiveKey}
        >
          <Tabs.Tab key="pending" label="Chờ xác nhận">
            <PendingOrders />
          </Tabs.Tab>
          <Tabs.Tab key="confirm" label="Đã xác nhận">
            <ConfirmedOrder />
          </Tabs.Tab>
          <Tabs.Tab key="waiting" label="Chờ lấy hàng">
            <WaitingDeliveryOrder />
          </Tabs.Tab>
          <Tabs.Tab key="delivering" label="Đang giao">
            <DeliveryOrder />
          </Tabs.Tab>
          <Tabs.Tab key="delivered" label="Giao thành công">
            <CompleteOrders />
          </Tabs.Tab>
          <Tabs.Tab key="cancel" label="Đã huỷ">
            <CancelOrders />
          </Tabs.Tab>
        </Tabs>
      </div>
    </Page>
  );
}
