import React from "react";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 mt-4 mx-auto max-w-md bg-blue-500 text-white p-4 rounded shadow-lg">
      <p>{message}</p>
      <button onClick={onClose} className="mt-2 bg-white text-blue-500 rounded p-1">
        Close
      </button>
    </div>
  );
};

export default Notification;
