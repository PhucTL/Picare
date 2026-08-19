import { useState } from "react";
import { openWebview, showToast } from "zmp-sdk";
import { openHotline1, openHotline2 } from "@/service/authorizeService";
import { Page } from "zmp-ui";

export const IntroducePage = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    const email = "cskh@picare.vn";
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      openToast();
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const openPhone1 = () => {
    openHotline1();
  };
  const openPhone2 = () => {
    openHotline2();
  };
  const openToast = async () => {
    try {
      const data = await showToast({
        message: "Copied!",
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  const openWebsite = async () => {
    try {
      await openWebview({
        url: "https://shopduocmypham.com/",
        config: {
          style: "normal",
          leftButton: "back",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 justify-center">
      <img
        src="https://file.hstatic.net/1000097940/file/logo_grande.jpg"
        alt="banner"
      />

      <p className="pt-3 text-xl">
        Công Ty:{" "}
        <span className="font-bold text-primary" onClick={openWebsite}>
          Công ty TNHH Picare Việt Nam
        </span>
      </p>
      <p className="pt-3 text-xl" onClick={openPhone1}>
        Hotline 1: <span className="font-bold text-primary">0918.088.123</span>
      </p>
      <p className="pt-3 text-xl" onClick={openPhone2}>
        Hotline 2: <span className="font-bold text-primary">0918.088.223</span>
      </p>
      <p className="pt-3 text-xl">
        Email:{" "}
        <span className="font-bold text-primary" onClick={handleCopyEmail}>
          cskh@picare.vn
        </span>
      </p>
      <p className="pt-3 text-xl">
        Địa chỉ:{" "}
        <span className="font-bold text-primary">
          38/11 Đường Nguyễn Giản Thanh, Phường 15, Quận 10
        </span>
      </p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3919.386449737334!2d106.665247!3d10.781685!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ecd9b8e9949%3A0xfa29ef4fdfddb96d!2zUGlDYXJlIC0gU2hvcCBExrDhu6NjIE3hu7kgUGjhuqltIE5o4bqtcCBLaOG6qXUgVOG7qyBDaMOidSDDgnU!5e0!3m2!1svi!2sus!4v1742872658592!5m2!1svi!2sus"
        className="w-full h-1/2 p-2"
      />
    </div>
  );
};
