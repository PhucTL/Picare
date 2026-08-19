import React from "react";
import { openWebview } from "zmp-sdk";

export function PolicyPage() {
  const policies = [
    {
      title: "Chính sách đổi trả",
      url: "https://shopduocmypham.com/pages/chinh-sach-doi-tra",
    },
    {
      title: "Chính sách vận chuyển giao nhận",
      url: "https://shopduocmypham.com/pages/chinh-sach-van-chuyen-giao-nhan",
    },
    {
      title: "Chính sách bảo mật thông tin",
      url: "https://shopduocmypham.com/pages/chinh-sach-bao-mat-thong-tin",
    },
    {
      title: "Hướng dẫn mua hàng",
      url: "https://shopduocmypham.com/pages/huong-dan-mua-hang",
    },
    {
      title: "Hình thức thanh toán",
      url: "https://shopduocmypham.com/pages/hinh-thuc-thanh-toan",
    },
    {
      title: "Tuyên bố miễn trừ trách nhiệm",
      url: "https://shopduocmypham.com/pages/tuyen-bo-mien-tru-trach-nhiem",
    },
  ];
  const openUrlInWebview = async (url: string) => {
    try {
      await openWebview({
        url: url,
        config: {
          style: "bottomSheet",
          leftButton: "back",
        },
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  return (
    <div
      className="p-6 bg-gray-50 rounded-lg shadow-md"
      role="region"
      aria-labelledby="policy-title"
    >
      <h1
        id="policy-title"
        className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2"
      >
        Vui lòng đọc kỹ các thông tin sau:
      </h1>
      <ul className="space-y-3 list-disc list-inside">
        {policies.map((policy, index) => (
          <li key={index}>
            {policy.url ? (
              <p
                className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => openUrlInWebview(policy.url)}
              >
                {policy.title}
              </p>
            ) : (
              <span className="text-gray-500">
                {policy.title} (Invalid URL)
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
