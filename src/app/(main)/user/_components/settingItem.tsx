"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { SettingsPageProps, SettingItem } from "@/types/setting";
import { logout } from "@/actions/auth/auth";

const SettingItemComponent: React.FC<SettingItem> = ({
  icon: Icon,
  label,
  type,
  action,
  href,
  initialValue,
}) => {
  const [value, setValue] = React.useState(initialValue);

  const handleAction = () => {
    if (type === "toggle") {
      setValue(!value);
    }
    if (action) {
      action();
    }
  };
  const handleLogoutAction = () => {
    logout();
  };

  const content = (
    <div className="flex items-center justify-between p-3 bg-gray-100 hover:bg-gray-200 shadow-sm rounded-lg transition-all">
      <div className="flex items-center gap-3">
        <Icon size="20" color="black" />
        <span>{label}</span>
      </div>
      {type === "toggle" && (
        <Switch checked={value} onCheckedChange={handleAction} />
      )}
    </div>
  );

  if (type === "link" && href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  if (type === "button") {
    return (
      <Button
        onClick={handleLogoutAction}
        className="w-full py-3 px-4 bg-red-500 text-white rounded-lg flex items-center justify-start gap-3 hover:bg-red-600 transition-colors text-sm"
      >
        <Icon size="10" color="white" />
        <span>{label}</span>
      </Button>
    );
  }

  return (
    <div onClick={handleLogoutAction} className="cursor-pointer">
      {content}
    </div>
  );
};

export default function SettingsPage({ sections }: SettingsPageProps) {
  return (
    <div className="p-2 max-w-md mx-auto max-h[446.5px] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-2">
        {sections.map((section, index) => (
          <section key={index}>
            <h2 className="font-semibold mb-2">{section.title}</h2>
            <div className="space-y-2 text-sm">
              {section.items.map((item, itemIndex) => (
                <SettingItemComponent key={itemIndex} {...item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
