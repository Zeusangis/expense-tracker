import { IconProps } from "iconsax-react";

export interface SettingItem {
  icon: React.ComponentType<IconProps>;
  label: string;
  type: "toggle" | "link" | "button";
  action?: () => void;
  href?: string;
  initialValue?: boolean;
}

export interface SettingSection {
  title: string;
  items: SettingItem[];
}

export interface SettingsPageProps {
  sections: SettingSection[];
}
