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
          label: "Edit Profile",
          type: "link",
          href: "/user/edit-profile",
        },
        {
          icon: Trash,
          label: "Delete Account",
          type: "link",
          href: "#",
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
          href: "#",
        },
        {
          icon: InfoCircle,
          label: "Privacy Policy",
          type: "link",
          href: "#",
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
