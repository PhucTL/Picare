import Section from "@/components/section";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { LiaUserTimesSolid } from "react-icons/lia";
import { LuMapPinOff } from "react-icons/lu";
import { cartState, cartSummaryState } from "@/context/cartState";
import CheckoutItem from "./checkout-item";
import HorizontalDivider from "@/components/horizontal-divider";
import { formatPrice } from "@/utils/format";
import Button from "@/components/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

import {
  CheckoutSDK,
  EventName,
  events,
  nativeStorage,
  Payment,
  selectPaymentMethod,
} from "zmp-sdk";
import toast from "react-hot-toast";
import { ChevronRight, VoucherIcon } from "@/components/vectors";
import { TbCancel } from "react-icons/tb";
import {
  getLocationFromStorage,
  getPersonalFromStorage,
} from "@/service/checkoutService";
import { Location, Personal } from "@/interfaces/Checkout";
import {
  checkoutState,
  customerState,
  locationState,
  paymentState,
  personalState,
  shippingState,
  totalBillState,
  voucherState,
} from "@/context/checkoutState";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postCheckoutService } from "@/service/orderService";
import { VoucherModal } from "@/components/voucher-modal";
import {
  cancelVoucherModalState,
  voucherModalState,
} from "@/context/modalState";
import { getCustomerInfomation } from "@/service/authorizeService";
import CancelVoucherModal from "@/components/cancel-voucher-modal";
import { checkVoucherService } from "@/service/voucherService";
export default function CheckoutPage() {
  const navigate = useNavigate();
  const isToggleVoucherModal = useAtomValue(voucherModalState);
  const isToggleCancelVoucherModal = useAtomValue(cancelVoucherModalState);
  const setUserInfo = useSetAtom(customerState);
  const userPhone = nativeStorage.getItem("userPhone");
  const parsedPhone = JSON.parse(userPhone);
  const { data: info } = useQuery({
    queryKey: ["userId", parsedPhone],
    queryFn: async () => getCustomerInfomation(parsedPhone),
  });
  useEffect(() => {
    if (info) {
      setUserInfo(info);
    }

    if (!userPhone) {
      navigate("/authorize");
    }
  }, [info, userPhone]);
  return (
    <div className="w-full h-full flex flex-col py-2 relative">
      <InfomationSection />
      <HorizontalDivider />
      <div className="my-2"></div>
      <LocationSection />
      <HorizontalDivider />
      <div className="my-2"></div>
      <CartSection />
      <HorizontalDivider />
      <div className="my-2"></div>
      <PaymentMethod />
      <div className="my-2"></div>
      <SummarySection />
      <DetailSummary />
      {isToggleCancelVoucherModal && <CancelVoucherModal />}
      {isToggleVoucherModal && <VoucherModal />}
    </div>
  );
}

function InfomationSection() {
  const [personal, setPersonal] = useAtom<Personal | undefined>(personalState);

  useEffect(() => {
    const fetchPersonal = async () => {
      const storedPersonal = await getPersonalFromStorage();
      setPersonal(storedPersonal);
    };
    fetchPersonal();
  }, []);
  if (personal === undefined) {
    return (
      <Section title="Thông tin cá nhân" viewMoreTo={`info`}>
        <div className="w-full h-[80px] flex flex-col justify-center items-center space-y-2 px-4 py-3 bg-white">
          <LiaUserTimesSolid size={28} className="text-red-600" />
          <div className="text-2xs text-inactive text-center text-red-600 font-semibold">
            Vui lòng thêm thông tin cá nhân.
          </div>
        </div>
      </Section>
    );
  }
  return (
    <Section title="Thông tin cá nhân" viewMoreTo={`info`}>
      <div className="flex flex-col gap-y-2 px-4 py-3 bg-white">
        <div className="flex items-center gap-x-2 justify-between">
          <p className="text-[12px] font-semibold text-gray-600">
            Tên khách hàng:
          </p>
          <p className="text-[13px] font-semibold text-gray-800">
            {personal.first_name} {personal.last_name}
          </p>
        </div>
        <div className="flex items-center gap-x-2 justify-between">
          <p className="text-[12px] font-semibold text-gray-600">
            Số điện thoại:
          </p>
          <p className="text-[13px] font-semibold text-gray-800">
            {personal.phone}
          </p>
        </div>
      </div>
    </Section>
  );
}
function LocationSection() {
  const [location, setLocation] = useAtom<Location | undefined>(locationState);

  useEffect(() => {
    const fetchLocation = async () => {
      const storedLocation = await getLocationFromStorage();
      setLocation(storedLocation);
    };

    fetchLocation();
  }, []);
  if (location === undefined) {
    return (
      <Section title="Địa chỉ giao hàng" viewMoreTo={`location`}>
        <div className="w-full h-[80px] flex flex-col justify-center items-center space-y-2 px-4 py-3 bg-white">
          <LuMapPinOff size={28} className="text-red-600" />
          <div className="text-2xs text-inactive text-center text-red-600 font-semibold">
            Vui lòng thêm địa chỉ
          </div>
        </div>
      </Section>
    );
  }
  return (
    <Section title="Địa chỉ giao hàng" viewMoreTo={`location`}>
      <div className="flex flex-col gap-y-2 px-4 py-3 bg-white">
        <div className="flex items-center gap-x-2 justify-between">
          <p className="text-[12px] font-semibold text-gray-600">Địa chỉ:</p>
          <p className="text-[13px] font-semibold text-gray-700 overflow-hidden text-ellipsis max-w-[75%]">
            {location.address}, {location.ward.name}, {location.district.name},{" "}
            {location.province.name}
          </p>
        </div>
      </div>
    </Section>
  );
}
function CartSection() {
  const cart = useAtomValue(cartState);
  return (
    <Section title="Giỏ hàng">
      <div className="flex flex-col gap-y-2 px-4 py-3 bg-white">
        <div className="flex-1 overflow-y-auto">
          {cart.map((item) => (
            <CheckoutItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
function SummarySection() {
  const [selectedPayment, setSelectedPayment] = useAtom(paymentState);
  const navigate = useNavigate();
  const { totalAmount, totalPrice } = useAtomValue(cartSummaryState);
  const totalBill = useAtomValue(totalBillState);
  const setIsToggleModal = useSetAtom(voucherModalState);
  const checkout = useAtomValue(checkoutState);
  const paymentType = useAtomValue(paymentState);
  const urlParams = new URLSearchParams(window.location.search);
  const [voucher, setVoucher] = useAtom(voucherState);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [cart, setCart] = useAtom(cartState);

  const privateKey = import.meta.env.VITE_ZALO_PRIVATE_KEY;

  type OrderItem = {
    id: string;
    amount: number;
  };

  const handleCheckout = async () => {
    const storedPersonal = getPersonalFromStorage();
    const storedLocation = getLocationFromStorage();
    if (!storedPersonal || !storedLocation) {
      toast("Vui lòng cung cấp thông tin cá nhân và địa chỉ giao hàng.", {
        icon: "⛔",
      });
      return;
    }
    if (!selectedPayment) {
      toast("Vui lòng chọn phương thức thanh toán.", { icon: "⛔" });
      return;
    }

    const orders: OrderItem[] = cart.map((item) => ({
      id: item.id.toString(),
      amount: item.product.variants[0].price,
    }));

    const params = {
      desc: "Thanh toán Picare ZMA",
      item: orders,
      amount: totalBill,
      method: `{"id":"${selectedPayment}","isCustom":false}`,
    };

    // Securely fetch the private key from a backend or environment variable

    console.log(`Private Key: ${privateKey}`);
    if (!privateKey) {
      toast("Lỗi hệ thống: Không tìm thấy khóa bảo mật.", { icon: "⛔" });
      return;
    }

    const dataMac = Object.keys(params)
      .sort()
      .map(
        (key) =>
          `${key}=${
            typeof params[key] === "object"
              ? JSON.stringify(params[key])
              : params[key]
          }`
      )
      .join("&");

    const mac = CryptoJS.HmacSHA256(dataMac, privateKey).toString(
      CryptoJS.enc.Hex
    );

    Payment.createOrder({
      desc: "Thanh toán Picare ZMA",
      amount: totalBill,
      item: orders,
      method: JSON.stringify({ id: selectedPayment, isCustom: false }),
      mac,
      success: (data) => {
        const { orderId } = data;
        console.log("Order created successfully:", orderId);
        console.log("Checkout: ", checkout);
        paymentSuccess();
        // navigate("/order-success");
      },
      fail: (err) => {
        console.error("Order creation failed:", err);
        toast("Lỗi khi tạo đơn hàng. Vui lòng thử lại.", { icon: "⛔" });
      },
    });

    const paymentSuccess = async () => {
      console.log("payment is running");
      console.log(events);
      events.once(EventName.OpenApp, (data) => {
        console.log("Open App: ", data);
        const params = data?.path;
        if (params.includes("/order-success")) {
          Payment.checkTransaction({
            data: params,
            success: async (rs) => {
              console.log("Check Transaction: ", rs);
              const { orderId, resultCode } = rs;
              console.log("Order ID: ", orderId);
              console.log("Result Code: ", resultCode);
              if (resultCode !== -1) {
                checkVoucher();
              }
              //navigate("/order-success");
            },
            fail: (err) => {
              console.log("Check Transaction Error: ", err);
            },
          });
        }
      });
    };

    if (!checkout) {
      toast("Vui lòng kiểm tra lại thông tin trước khi thanh toán.", {
        icon: "⛔",
      });
      return;
    }
    const checkVoucher = async () => {
      nativeStorage.setItem("nativeCheckout", JSON.stringify(checkout));
      if (voucher) {
        await checkMutation.mutateAsync({
          code: voucher.code,
          customerId: checkout.customer?.id,
          amount: totalPrice,
        });
      } else {
        await processCheckout();
      }
    };
  };

  const processCheckout = async () => {
    await mutation.mutateAsync(checkout!);
    clearcart();
  };
  const clearcart = () => {
    nativeStorage.removeItem("nativeCart");
    nativeStorage.removeItem("nativeCheckout");
    setCart([]);
  };

  const checkMutation = useMutation({
    mutationKey: ["checkValidVoucher"],
    onMutate: () => {
      setIsSubmit(true);
    },
    mutationFn: ({
      code,
      customerId,
      amount,
    }: {
      code: string;
      customerId: string;
      amount: number;
    }) => checkVoucherService(code, customerId, amount),
    onSuccess: (data) => {
      if (data === "Mã này đã được sử dung") {
        setIsSubmit(false);
        toast("Mã này đã được bạn sử dụng", { icon: "⛔" });
        return;
      }
      if (data === "Đơn hàng không đủ để áp dụng mã giảm giá này") {
        setIsSubmit(false);
        toast(data, { icon: "⛔" });
        return;
      }
      if (data === "Mã giảm giá không hợp lệ") {
        setIsSubmit(false);
        toast(data, { icon: "⛔" });
        return;
      }
      processCheckout();
      setIsSubmit(false);
    },
  });

  const mutation = useMutation({
    mutationKey: ["checkout"],
    mutationFn: postCheckoutService,
    onMutate() {
      setIsSubmit(true);
    },
    onError() {
      toast("Khách hàng đã sử dụng hết lượt khuyến mãi", {
        icon: "⛔",
      });
      setVoucher(undefined);
      setIsSubmit(false);
    },
    onSuccess(data) {
      if (data === "OK") {
        navigate("/order-success");
      }
      clearcart();
      console.log(data);
    },
  });
  const handleToggleOnModal = () => {
    setIsToggleModal(true);
  };

  return (
    <div className="flex-none flex flex-col w-full pt-4 pb-10 px-4 fixed bottom-0 left-0 shadow-lg bg-white space-y-4">
      {/* Voucher Section */}
      {voucher ? (
        <SelectedVoucher />
      ) : (
        <div
          className="flex items-center cursor-pointer rounded-lg"
          onClick={handleToggleOnModal}
        >
          <VoucherIcon />
          <div className="text-sm flex-1">Voucher</div>
          <div className="flex items-center space-x-1">
            <div className="text-sm font-medium">Chọn</div>
            <ChevronRight />
          </div>
        </div>
      )}

      {/* Total Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-2xs text-subtitle">
            Tổng cộng ({totalAmount})
          </div>
          <div className="text-sm font-medium text-primary">
            {formatPrice(totalBill)}
          </div>
        </div>
        <Button primary onClick={handleCheckout} disabled={isSubmit}>
          Đặt hàng ngay
        </Button>
      </div>
    </div>
  );
}

function PaymentMethod() {
  const [selectedPayment, setSelectedPayment] = useAtom(paymentState);

  const handlePaymentChange = () => {
    Payment.selectPaymentMethod({
      channels: [
        {
          method: "COD",
          subInfo: "Tiền mặt khi nhận hàng",
        },
        {
          method: "ZALOPAY_SANDBOX",
          subInfo: "ZaloPay_SandBox",
        },
        {
          method: "ZALOPAY",
          subInfo: "ZaloPay",
        },
      ],
      success: (data) => {
        const { method, isCustom, logo, displayName, subMethod } = data;
        console.log(data);
        setSelectedPayment(method);
      },
      fail: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <Section title="Phương thức thanh toán">
      <div className="flex flex-col gap-y-2 px-4 py-3 bg-white">
        {selectedPayment && (
          <button
            onClick={handlePaymentChange}
            className="border py-[10px] rounded-[15px] bg-primary text-white font-semibold"
          >
            {selectedPayment === "COD" && (
              <p>Bạn đã chọn thanh toán bằng tiền mặt</p>
            )}
            {selectedPayment === "ZALOPAY_SANDBOX" && (
              <p>Bạn đã chọn thanh toán bằng ZaloPay SANDBOX </p>
            )}
            {selectedPayment === "ZALOPAY" && (
              <p>Bạn đã chọn thanh toán bằng Zalopay </p>
            )}
          </button>
        )}
        {!selectedPayment && (
          <button
            className="border py-[10px] rounded-[15px] bg-primary text-white font-semibold"
            onClick={handlePaymentChange}
          >
            Chọn phương thức thanh toán
          </button>
        )}
      </div>
    </Section>
  );
}
function CardRadio({ label, name, value, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:border-primary transition">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-3 h-3 rounded-full border ${
          checked ? "bg-primary border-primary" : "border-gray-300"
        }`}
      ></div>
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}

function DetailSummary() {
  const { totalPrice } = useAtomValue(cartSummaryState);
  const voucher = useAtomValue(voucherState);
  const totalBill = useAtomValue(totalBillState);
  const shipping = useAtomValue(shippingState);
  return (
    <Section title="Chi tiết thanh toán">
      <div className="flex flex-col gap-y-2 px-4 py-3 bg-white mb-[200px]">
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-gray-600">Tổng thanh toán</p>
          <p className="text-[12px] text-gray-600">{formatPrice(totalPrice)}</p>
        </div>

        {voucher ? (
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-gray-600">
              Giảm giá ({voucher.code})
            </p>
            <p className="text-[12px] text-gray-600">
              {voucher.take_type === "percentage"
                ? `${voucher.value}%`
                : formatPrice(voucher.value)}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-gray-600">Giảm giá</p>
            <p className="text-[12px] text-gray-600">{formatPrice(0)}</p>
          </div>
        )}

        {shipping ? (
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-gray-600">Chi phí vận chuyển</p>
            <p className="text-[12px] text-gray-600">
              {formatPrice(shipping.price)}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-gray-600">Chi phí vận chuyển</p>
            <p className="text-[12px] text-gray-600">{formatPrice(0)}</p>
          </div>
        )}
        <div className="flex items-center justify-between mt-1 border-t pt-2">
          <p className="text-[14px] font-semibold">Tổng tiền</p>
          <p className="text-[14px] font-semibold text-primary">
            {formatPrice(totalBill)}
          </p>
        </div>
      </div>
    </Section>
  );
}

function SelectedVoucher() {
  const voucher = useAtomValue(voucherState);
  const setOpenModal = useSetAtom(cancelVoucherModalState);
  const handleToggleOnModal = () => {
    setOpenModal(true);
  };
  return (
    <div className="flex flex-col space-y-1" onClick={handleToggleOnModal}>
      <div className="flex items-center cursor-pointer rounded-lg">
        <VoucherIcon />
        <div className="text-sm flex-1 font-semibold">{voucher?.code}</div>
        <div className="flex items-center space-x-1">
          <div className="text-sm font-medium text-red-500">Huỷ</div>
          <TbCancel className="text-red-500" />
        </div>
      </div>
      {voucher && (
        <p className="text-[8px]">
          Chỉ áp dụng cho đơn hàng có giá trị trên{" "}
          {formatPrice(voucher?.minimum_order_amount)}
        </p>
      )}
      {voucher && (
        <p className="text-[8px]">
          Mã chỉ được giảm tối đa {formatPrice(voucher.max_amount_apply)}
        </p>
      )}
    </div>
  );
}
