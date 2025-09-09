import React from "react";
import "../../styles/globals.css";

export const metadata = {
  title: "Hostin",
  description: "Hostin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-roboto " suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
