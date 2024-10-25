"use client";

import {usePathname} from "next/navigation";
import Header from "../components/General/Header";
import Sidebar from "../components/General/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <>
      <main>
        <div className="dashboardLayout">
          <Sidebar />
          <div
            className={`dashboardLayout__children ${
              pathName === "/dashboard" ? "dashboard__layout" : ""
            }`}>
            <Header />
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
