import LayoutSidebar from "@/components/dashboard/layout-sidebar";
import MobileMenu from "@/components/dashboard/mobile_menu";
import { CircleUserRound } from "lucide-react";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex">
        <LayoutSidebar />
        <div className="flex-1">
          <div className="h-12 flex justify-between items-center gap-2 border-b w-full dark:text-white">
            <div>
              <MobileMenu />
            </div>
            <h1 className="dark:text-white text-2xl font-bold mr-2">
              <CircleUserRound className="w-5 h-5" />
            </h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
