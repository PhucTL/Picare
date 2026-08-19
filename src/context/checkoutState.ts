import {
  Checkout,
  Location,
  Personal,
  ShippingLine,
} from "@/interfaces/Checkout";
import { atom } from "jotai";
import { cartState, cartSummaryState } from "./cartState";
import { Voucher } from "@/interfaces/Voucher";
import { Customer } from "@/interfaces/User";

export const paymentState = atom("");

export const locationState = atom<Location>();

export const personalState = atom<Personal>();

export const voucherState = atom<Voucher>();

export const shippingState = atom<ShippingLine | null>((get) => {
  const location = get(locationState);
  const { totalPrice } = get(cartSummaryState);
  const voucher = get(voucherState);

  if (!location || !location.province.name) return null;

  const discount = voucher?.value || 0;
  const isHCM = location.province.name === "Hồ Chí Minh";

  // Kiểm tra nếu tổng tiền sau giảm giá > 500,000 thì miễn phí ship
  const shippingPrice =
    totalPrice - discount > 500000 ? 0 : isHCM ? 20000 : 30000;
  const shippingCode = totalPrice > 500000 ? "Trên 500000" : "Dưới 500000";
  return {
    code: shippingCode,
    price: shippingPrice,
    source: null,
    title: shippingCode,
  };
});

export const customerState = atom<Customer>();

export const checkoutState = atom<Checkout | null>((get) => {
  const cart = get(cartState);
  const personal = get(personalState);
  const location = get(locationState);
  const gateway = get(paymentState);
  const customer = get(customerState);
  const voucher = get(voucherState);
  const shipping = get(shippingState);

  if (!cart || !personal || !location || !gateway) return null;

  return {
    customer,
    discount_codes: voucher ? [{ code: voucher, is_coupon_code: true }] : [],
    cart,
    user: personal,
    location,
    gateway,
    shipping_lines: shipping ? [shipping] : [],
  };
});

export const totalBillState = atom((get) => {
  const { totalPrice } = get(cartSummaryState);
  const location = get(locationState);
  const shipping = get(shippingState);
  const voucher = get(voucherState);

  let discount = 0;
  if (voucher) {
    if (voucher.take_type === "percentage") {
      // Tính giảm giá theo phần trăm của tổng tiền
      discount = totalPrice * (voucher.value / 100);
      // Nếu có giới hạn giảm giá tối đa
      if (voucher.max_amount_apply && discount > voucher.max_amount_apply) {
        discount = voucher.max_amount_apply;
      }
    } else {
      discount = voucher.value;
    }
  }

  if (!location || !location.province.name) {
    return totalPrice - discount;
  }
  const shippingPrice =
    totalPrice - discount > 500000 ? 0 : shipping?.price || 0;

  return totalPrice - discount + shippingPrice;
});
