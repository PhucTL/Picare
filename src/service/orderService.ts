import { Checkout } from "@/interfaces/Checkout";
import { CartItem } from "@/interfaces/Cart";
import axios, { AxiosResponse } from "axios";
import { useAtomValue } from "jotai";
import { totalBillState } from "@/context/checkoutState";
import { OrderListItem } from "@/interfaces/Order";

const urlParams = new URLSearchParams(window.location.search);
const appEnv = urlParams.get("env");

let HOST_URL = import.meta.env.VITE_API_URL;

const transformCheckoutToOrder = (checkout: Checkout) => {
  if (!checkout || !checkout.customer || !checkout.cart) {
    throw new Error("Invalid checkout object structure");
  }

  return {
    order: {
      customer: {
        id: checkout.customer.id || null,
      },
      line_items: checkout.cart.map((item: CartItem) => ({
        variant_id: item.product.variants?.[0]?.id || null,
        quantity: item.quantity || 1,
        sku: item.product.variants?.[0]?.sku || "",
        name: item.product.title || "Unknown Product",
      })),
      total_discounts: 0,
      note_attributes: [
        {
          name: "sàn",
          value: "Zalo mini app Picare VN",
        },
      ],
      shipping_address: checkout.location
        ? {
            address1: checkout.location.address || "",
            first_name: checkout.user?.first_name || "",
            last_name: checkout.user?.last_name || "",
            phone: checkout.user?.phone || "",
            country: checkout.location.country?.name || "",
            country_code: checkout.location.country?.code || "",
            province: checkout.location.province?.name || "",
            province_code: checkout.location.province?.code || "",
            district_code: checkout.location.district?.code || "",
            district: checkout.location.district?.name || "",
            ward_code: checkout.location.ward?.code || "",
            ward: checkout.location.ward?.name || "",
          }
        : null,
      shipping_lines:
        checkout.shipping_lines && checkout.shipping_lines.length > 0
          ? checkout.shipping_lines.map((line) => ({
              code: line.code || "Dưới 500000",
              price: line.price || 0,
              source: line.source || null,
              title: line.title || "Dưới 500000",
            }))
          : [
              {
                code: "default_shipping",
                price: 20000,
                source: null,
                title: "Default Shipping",
              },
            ],
      discount_codes: Array.isArray(checkout.discount_codes)
        ? checkout.discount_codes.map((code) => ({
            code: code?.code?.code || "",
            is_coupon_code: true,
          }))
        : [],
      gateway: checkout.gateway || "",
      is_cod_gateway: checkout.gateway === "Chuyển khoản",
    },
  };
};

export const postCheckoutService = async (checkout: Checkout) => {
  const token = localStorage.getItem("token");
  const transformedOrder = transformCheckoutToOrder(checkout);
  try {
    const url = `${HOST_URL}/order/create`;
    const res: AxiosResponse = await axios.post(url, transformedOrder, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getOrdersByPhone = async (
  phone: string
): Promise<OrderListItem[]> => {
  try {
    const url = `${HOST_URL}/order/query/${phone}`;
    const res: AxiosResponse = await axios.get(url);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getDetailOrder = async (
  orderId: string
): Promise<OrderListItem> => {
  try {
    const url = `${HOST_URL}/order/${orderId}`;
    const res: AxiosResponse = await axios.get(url);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
export const cancelOrderService = async (orderId: string, data) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${HOST_URL}/order/cancel/${orderId}`;
    const res: AxiosResponse = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
