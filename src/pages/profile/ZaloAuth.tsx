import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import Notification from "src/components/Notification"; // Adjusted import path

const ZaloAuth: React.FC = () => {
  const ZALO_APP_SECRET_KEY = "W3bVLpFmkIcsGVuCWhY5"; // Updated app secret key
  const accessToken = "1440F22D8A91C3B798FE1866243D5FF2488BA5D608416BE05B52FAE6B2B6A2C8";

  const [notificationVisible, setNotificationVisible] = useState(false);

  const calculateHMacSHA256 = (data: string, secretKey: string) => {
    return CryptoJS.HmacSHA256(data, secretKey).toString(CryptoJS.enc.Hex);
  };

  const handleLogin = async () => {
    const options = {
      method: "GET" as const,
      headers: {
        access_token: accessToken,
        appsecret_proof: calculateHMacSHA256(accessToken, ZALO_APP_SECRET_KEY),
      },
      params: {
        fields: "id,name,birthday,picture",
      },
      url: "https://graph.zalo.me/v2.0/me",
    };

    try {
      const response = await axios(options);
      console.log("Response Code:", response.status);
      console.log("Response Body:", response.data);
      setNotificationVisible(true); // Show notification on successful login
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegisterClick = () => {
    console.log("Register button clicked"); // Debug log
    console.log("Prompting for permission..."); // Additional debug log

    const userConfirmed = window.confirm("Do you allow access to your information?");
    console.log("User confirmed:", userConfirmed); // Log user response

    if (userConfirmed) {
      handleLogin();
    }
  };

  return (
    <div className="m-4">
      <button onClick={handleRegisterClick} className="bg-blue-500 text-white rounded p-2">
        Đăng Ký Thành viên
      </button>
      {notificationVisible && (
        <Notification 
          message="Authentication process initiated. Please follow the prompts." 
          onClose={() => setNotificationVisible(false)} 
        />
      )}
    </div>
  );
};

export default ZaloAuth;
