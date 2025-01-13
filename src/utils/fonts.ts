import localFont from "next/font/local";

export const productSans = localFont({
  src: [
    {
      path: "../app/assets/fonts/ProductSans-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/ProductSans-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../app/assets/fonts/ProductSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/ProductSans-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../app/assets/fonts/ProductSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/ProductSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/ProductSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../app/assets/fonts/ProductSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/ProductSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../app/assets/fonts/ProductSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/ProductSans-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-product-sans",
});
