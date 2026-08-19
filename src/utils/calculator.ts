// import formater
import { formatPrice } from "./format";

export const calculateSalePrice = (
  originalPrice: number,
  salePercent: number | null
) => {
  if (!salePercent) {
    return formatPrice(originalPrice);
  }

  const discount = (originalPrice * salePercent) / 100;
  const lastPrice = originalPrice - discount;

  return formatPrice(lastPrice);
};
