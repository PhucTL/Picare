import React from "react";
import { useNavigate } from "react-router-dom";

interface SubscriptionProps {
  title: string;
  description: string;
}

const Subscription: React.FC<SubscriptionProps> = ({ title, description }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/authorize");
  };
  return (
    <div
      className="m-0 bg-primary text-white rounded-xl p-4 space-y-2"
      role="region"
      aria-labelledby="subscription-title"
      onClick={handleNavigate}
    >
      <h2 id="subscription-title" className="font-bold text-lg">
        {title}
      </h2>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default Subscription;
