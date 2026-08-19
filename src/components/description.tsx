import React, { FC } from "react";

interface DescriptionProps {
  htmlContent: string;
}

export const Description: FC<DescriptionProps> = ({ htmlContent }) => {
  return (
    <div
      className="px-[20px] text-[12px]"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
