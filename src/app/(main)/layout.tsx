import { Home, Money, User } from "iconsax-react";
import Link from "next/link";
import React from "react";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="relative w-[300px] h-[600px] border-[5px] border-black rounded-2xl bg-gray-50"
        style={{ boxShadow: "5px 5px 2.5px 6px rgb(209, 218, 218)" }}
      >
        <span className="absolute -right-2 top-14 border border-4 border-black h-7 rounded-md" />
        <span className="absolute -right-2 bottom-36 border border-4 border-black h-10 rounded-md" />
        <div className="flex flex-col justify-between h-full">
          <div className="h-full bg-gray-200 rounded-t-2xl p-2">{children}</div>
          <div className="h-16 py-2 px-3 bg-gray-200 rounded-b-2xl border-t border-gray-300 flex items-center justify-between">
            <Link href="/">
              <Home size="32" color="black" />
            </Link>
            <Link href="/expenses">
              <Money size="32" color="black" />
            </Link>
            <Link href="/user">
              <User size="32" color="black" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
