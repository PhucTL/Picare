import {
  Country,
  District,
  Location,
  Province,
  Ward,
} from "@/interfaces/Checkout";
import axios, { AxiosResponse } from "axios";
const urlParams = new URLSearchParams(window.location.search);
const appEnv = urlParams.get("env");

let HOST_URL = import.meta.env.VITE_API_URL;

export const getAllCountry = async (): Promise<Country[]> => {
  try {
    const url = `${HOST_URL}/location/country/all`;
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

export const getCountryById = async (countryId: string): Promise<Country> => {
  try {
    const url = `${HOST_URL}/location/country/${countryId}`;
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

export const getProvinceById = async (
  countryId: string
): Promise<Province[]> => {
  try {
    const url = `${HOST_URL}/location/province/${countryId}`;
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

export const getDistrictById = async (
  provinceId: string
): Promise<District[]> => {
  try {
    const url = `${HOST_URL}/location/district/${provinceId}`;
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

export const getWardById = async (districtId: string): Promise<Ward[]> => {
  try {
    const url = `${HOST_URL}/location/ward/${districtId}`;
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
