import { Coupon, Voucher } from "@/interfaces/Voucher";
import axios, { AxiosResponse } from "axios";

const urlParams = new URLSearchParams(window.location.search);
const appEnv = urlParams.get("env");

let HOST_URL = import.meta.env.VITE_API_URL;

export const getVoucherByCode = async (code: string): Promise<Voucher> => {
  try {
    const url = `${HOST_URL}/discount/code/${code}`;
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

export const checkVoucherService = async (
  code: string,
  customerId: string,
  amount: number
) => {
  try {
    const url = `${HOST_URL}/discount/valid?code=${code}&customerid=${customerId}&amount=${amount}`;
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
