import {
  createShortcut,
  getAccessToken,
  getPhoneNumber,
  getUserID,
  nativeStorage,
  openChat,
  openPhone,
  Payment,
  viewOAQr,
} from "zmp-sdk";
import axios, { AxiosResponse } from "axios";
import { Data, InputPhone } from "@/interfaces/Zalo";
import { Customer } from "@/interfaces/User";
import { Personal } from "@/interfaces/Checkout";

const urlParams = new URLSearchParams(window.location.search);
const appEnv = urlParams.get("env");
let HOST_URL = import.meta.env.VITE_API_URL;

export const getTokenPhone = async () => {
  try {
    const data = await getPhoneNumber();
    let { token } = data;
    if (token) {
      nativeStorage.setItem("phoneToken", JSON.stringify(token));
    }
    console.log(token);
    return token;
  } catch (error) {
    console.error("Lỗi khi lấy số điện thoại:", error);
    return null;
  }
};

export const getUserZaloID = async () => {
  try {
    const userID = await getUserID({});
    console.log(userID);
    nativeStorage.setItem("zaloUserId", JSON.stringify(userID));
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};
export const openCallScreen = async () => {
  try {
    await openPhone({
      phoneNumber: "0916167216",
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

export const openHotline2 = async () => {
  try {
    await openPhone({
      phoneNumber: "0918088223",
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

export const openHotline1 = async () => {
  try {
    await openPhone({
      phoneNumber: "0918088123",
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};
export const createMiniAppShortcut = async () => {
  try {
    await createShortcut({
      params: {
        utm_source: "shortcut",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const showQR = async () => {
  try {
    const data = await viewOAQr({
      id: "1551837309126666824",
      displayName: "Picare VN",
    });
  } catch (error) {
    console.log(error);
  }
};
export const openChatScreen = async () => {
  try {
    await openChat({
      type: "oa",
      id: "1551837309126666824",
      message: "Tôi cần hỗ trợ!!!",
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAccessTokenZalo = async () => {
  try {
    const accessToken = await getAccessToken({});
    if (accessToken) {
      nativeStorage.setItem("accessToken", JSON.stringify(accessToken));
    }
    console.log(accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPhoneNumberService = async (
  data: InputPhone
): Promise<Data> => {
  const token = localStorage.getItem("token");
  try {
    const url = `${HOST_URL}/zalo/get-phone`;
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

export const testData = () => {
  const data = nativeStorage.getItem("userPhone");
  console.log(data);
};

const transformData = (customer: Customer) => {
  return {
    customer: {
      phone: customer.phone,
    },
  };
};

export const createNewCustomer = async (customer: Customer) => {
  const transformedCustomer = transformData(customer);
  const token = localStorage.getItem("token");
  try {
    const url = `${HOST_URL}/customer/create`;
    const res: AxiosResponse = await axios.post(url, transformedCustomer, {
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

export const getCustomerInfomation = async (phone: string) => {
  try {
    const url = `${HOST_URL}/customer/query/${phone}`;
    const res: AxiosResponse = await axios.get(url);
    return res.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const updateCustomerInfo = async (userId: string, data: Personal) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${HOST_URL}/customer/update/${userId}`;
    const res: AxiosResponse = await axios.put(url, data, {
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
