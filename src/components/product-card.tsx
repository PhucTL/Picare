import React, { FC } from "react";
import { Link } from "react-router-dom";
// import formatter
import { formatPrice } from "@/utils/format";

interface ProductDefaultCardProps {
  image: string;
  title: string;
  category: string;
  defaultPrice: number;
  salePrice?: number | null;
  id?: string;
}

export const ProductCard: FC<ProductDefaultCardProps> = ({
  image,
  title,
  category,
  defaultPrice,
  salePrice,
  id,
}) => {
  return (
    <Link
      to={`/product/${id}`}
      className="flex flex-col justify-between px-[8px] py-[10px] relative bg-background rounded-xl mr-[10px] shadow-md"
    >
      <img
        src={image}
        alt={title}
        className="w-[180px] h-[180px] object-cover"
        loading="lazy"
      />
      <p className="font-bold text-[11px]">{category}</p>
      <p className="text-[12px] font-semibold line-clamp-2 overflow-hidden text-ellipsis">
        {title}
      </p>
      <div className="flex items-center gap-x-[5px] my-[8px]">
        {salePrice && salePrice > 0 ? (
          <>
            <p className="text-[#D0021B] font-bold text-[11px]">
              {formatPrice(defaultPrice)}
            </p>
            <del className="text-[8px] font-semibold text-gray-500">
              {formatPrice(salePrice)}
            </del>
          </>
        ) : (
          <>
            <p className="text-[#D0021B] font-bold text-[13px]">
              {formatPrice(defaultPrice)}
            </p>
          </>
        )}
      </div>
    </Link>
  );
};
