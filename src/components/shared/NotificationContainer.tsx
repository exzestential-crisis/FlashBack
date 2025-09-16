"use client";

import React, { useEffect, useState } from "react";
import { useNotifications } from "@/stores/notification";

interface NotificationItem {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

const getNotificationStyles = (type: string) => {
  switch (type) {
    case "success":
      return "bg-green-700 text-white";
    case "error":
      return "bg-red-600 text-white";
    case "warning":
      return "bg-yellow-600 text-white";
    case "info":
    default:
      return "bg-sky-700 text-white";
  }
};

const NotificationContainer: React.FC = () => {
  const { notifications, remove } = useNotifications();
  const [fadingNotifications, setFadingNotifications] = useState<number[]>([]);

  useEffect(() => {
    if (notifications.length === 0) return;

    const firstFadeTimer = setTimeout(() => {
      if (notifications.length > 0) {
        startFadeSequence();
      }
    }, 3000);

    return () => clearTimeout(firstFadeTimer);
  }, [notifications.length]);

  const startFadeSequence = () => {
    let currentIndex = 0;

    const fadeNext = () => {
      if (currentIndex >= notifications.length) return;

      const item: NotificationItem = notifications[currentIndex];

      setFadingNotifications((prev) => [...prev, item.id]);

      setTimeout(() => {
        remove(item.id);
        setFadingNotifications((prev) => prev.filter((id) => id !== item.id));
      }, 3000);

      currentIndex++;
      if (currentIndex < notifications.length) {
        setTimeout(fadeNext, 500);
      }
    };

    fadeNext();
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .notification-item {
          animation: slideUp 0.5s ease-out forwards;
          transition: all 0.3s ease;
        }
        .fade-out-active {
          animation: fadeOut 3s ease-out forwards;
        }
      `}</style>
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2">
        {notifications.map((item: NotificationItem) => (
          <div
            key={item.id}
            className={`notification-item ${getNotificationStyles(
              item.type
            )} px-7 py-4 rounded-lg shadow-md text-lg max-w-[350px] sm:max-w-[400px] ${
              fadingNotifications.includes(item.id) ? "fade-out-active" : ""
            }`}
          >
            {item.message}
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationContainer;
