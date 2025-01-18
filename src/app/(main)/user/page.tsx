"use client";

import SettingsPage from "./_components/settingItem";
import { SettingSection } from "@/types/setting";
import {
  Logout,
  NotificationCircle,
  SecurityCard,
  InfoCircle,
  Moon,
  Trash,
} from "iconsax-react";

export default function Settings() {
  const settingsSections: SettingSection[] = [
    {
      title: "Preferences",
      items: [
        {
          icon: Moon,
          label: "Dark Mode",
          type: "toggle",
          initialValue: false,
          action: () => console.log("Dark mode toggled"),
        },
        {
          icon: NotificationCircle,
          label: "Notifications",
          type: "toggle",
          initialValue: true,
          action: () => console.log("Notifications toggled"),
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          icon: SecurityCard,
          label: "Change Password",
          type: "link",
          href: "/change-password",
        },
        {
          icon: Trash,
          label: "Delete Account",
          type: "link",
          href: "/delete-account",
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          icon: InfoCircle,
          label: "Terms of Service",
          type: "link",
          href: "/terms",
        },
        {
          icon: InfoCircle,
          label: "Privacy Policy",
          type: "link",
          href: "/privacy",
        },
      ],
    },
    {
      title: "",
      items: [
        {
          icon: Logout,
          label: "Logout",
          type: "button",
          action: () => console.log("Logout clicked"),
        },
      ],
    },
  ];

  return <SettingsPage sections={settingsSections} />;
}
