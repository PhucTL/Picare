import { CustomCollection } from "@/interfaces/Collection";
import axios, { AxiosResponse } from "axios";

const urlParams = new URLSearchParams(window.location.search);
const appEnv = urlParams.get("env");

let HOST_URL = import.meta.env.VITE_API_URL;

export const getListOfCollection = async (): Promise<CustomCollection[]> => {
  try {
    const url = `${HOST_URL}/custom_collection`;
    const res: AxiosResponse = await axios.get(url);
    console.log(res.data);
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
export const getListOfSmartCollection = async (): Promise<
  CustomCollection[]
> => {
  try {
    const url = `${HOST_URL}/smart_collection`;
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
