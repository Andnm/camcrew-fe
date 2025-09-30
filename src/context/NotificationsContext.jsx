import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { getSocket } from "../lib/socket";
import { listNotifications } from "../api/notifications";

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnread = useCallback(async () => {
    if (!user) {
      setUnreadCount(0);
      return;
    }
    try {
      const res = await listNotifications({ page: 1, limit: 1, isRead: false });
      setUnreadCount(res?.pagination?.totalResults || 0);
    } catch(e) {
        console.log(e);
    }
  }, [user]);

  useEffect(() => {
    refreshUnread();
  }, [refreshUnread]);

  useEffect(() => {
    if (!user?.email) return;
    const socket = getSocket();
    const eventName = `notification-${user.email}`;
    const handler = (notif) => {
      setUnreadCount((c) => c + (notif?.is_read ? 0 : 1));
      window.dispatchEvent(new CustomEvent("app:new-notification", { detail: notif }));
    };
    socket.on(eventName, handler);
    return () => socket.off(eventName, handler);
  }, [user?.email]);

  return (
    <NotificationsContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
        refreshUnread,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used inside <NotificationsProvider/>");
  return ctx;
}
