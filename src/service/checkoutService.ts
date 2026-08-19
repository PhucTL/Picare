import { Location, Personal } from "@/interfaces/Checkout";
import toast from "react-hot-toast";
import { nativeStorage } from "zmp-sdk";
const urlParams = new URLSearchParams(window.location.search);
const appEnv = urlParams.get("env");

export const setLocationToStorage = (location: Location): void => {
  try {
      nativeStorage.setItem("savedNativeLocation", JSON.stringify(location));
  } catch (error) {
    console.error("Error setting location to localStorage:", error);
  }
};

export const getLocationFromStorage = (): Location | undefined => {
  try {
      const nativeData = nativeStorage.getItem("savedNativeLocation");
      if (nativeData) {
        return JSON.parse(nativeData);
      }
    return undefined;
  } catch (error) {
    console.error("Error getting location from localStorage:", error);
    return undefined;
  }
};

export const setPersonalToStorage = (personal: Personal): void => {
  try {
      nativeStorage.setItem("savedNativePersonal", JSON.stringify(personal));
  } catch (error) {
    console.error("Error setting personal to localStorage:", error);
  }
};

export const getPersonalFromStorage = (): Personal | undefined => {
  try {
      const nativeData = nativeStorage.getItem("savedNativePersonal");
      if (nativeData) {
        return JSON.parse(nativeData);
      }
    return undefined;
  } catch (error) {
    console.error("Error getting personal from localStorage:", error);
    return undefined;
  }
};

export const clearAllDataFromStorage = () => {
  try {
    nativeStorage.clear();
    toast("Xoá dữ liệu thành công");
    setTimeout(() => {
      window.location.reload();
    }, 700);
  } catch (error) {
    console.log(error);
  }
};
