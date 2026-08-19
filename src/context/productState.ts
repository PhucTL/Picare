import { atom } from "jotai";
import { Product } from "@/interfaces/Product";

export const keywordState = atom<string>("");

export const limitProductState = atom<number>(20);
