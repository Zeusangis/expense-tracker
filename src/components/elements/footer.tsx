"use client";

import { Home2, Money, Setting2, type Icon } from "iconsax-react";
import Link from "next/link";

// Define the type for menu items
interface MenuItem {
  icon: Icon;
  label: string;
  url: string;
}

// Create array of menu items
const menuItems: MenuItem[] = [
  {
    icon: Home2,
    label: "Home",
    url: "/",
  },
  {
    icon: Money,
    label: "Expenses",
    url: "/expenses",
  },
  {
    icon: Setting2,
    label: "Settings",
    url: "/user",
  },
];

export default function HoverMenu() {
  return (
    <div className="py-3 w-full flex justify-between rounded-xl hover:shadow-xl transition-all duration-300">
      {menuItems.map((item, index) => (
        <Link key={index} href={item.url}>
          <div key={index} className="group relative cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300">
              <item.icon className="group-hover:scale-110 transition-transform duration-300 size-6 stroke-black" />
            </div>
            <span className="absolute -top-12 left-[50%] -translate-x-[50%] z-20 origin-bottom scale-0 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium shadow-lg transition-all duration-300 ease-in-out group-hover:scale-100 before:absolute before:bottom-[-5px] before:left-[50%] before:-translate-x-[50%] before:border-[6px] before:border-transparent before:border-t-white">
              {item.label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
