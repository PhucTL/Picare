import { Product } from "@/interfaces/Product";
import axios, { AxiosResponse } from "axios";

const urlParams = new URLSearchParams(window.location.search);
const appEnv = urlParams.get("env");

let HOST_URL = import.meta.env.VITE_API_URL;

export const getProductByLimit = async (limit: number): Promise<Product[]> => {
  try {
    const url = `${HOST_URL}/product/limit/${limit}`;
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

export const getProductById = async (
  id: string | undefined
): Promise<Product> => {
  try {
    const url = `${HOST_URL}/product/${id}`;
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

export const getProductListByCollectionId = async (
  collectionId: string
): Promise<Product[]> => {
  try {
    const url = `${HOST_URL}/product/collection/${collectionId}`;
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
