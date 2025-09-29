import React from "react";
import AccountSidebar from "./AccountSidebar";
import { Outlet } from "react-router-dom";

export default function AccountLayout() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
