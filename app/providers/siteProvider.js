"use client";

import { useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import SiteContext from "../context/site";

let cachedSettings = null;

const SiteProviders = ({ children }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (cachedSettings) {
      setSettings(cachedSettings);
      return;
    }
    getSiteSettings();
  }, []);

  const getSiteSettings = async () => {
    try {
      const res = await fetch(`${process.env.backend_url}api/v1/setting/site`, {
        cache: "no-store",
      });
      const result = await res.json();
      if (res.ok && result.success) {
        cachedSettings = result.data;
        setSettings(result.data);
      } else {
        console.error("Failed to fetch site settings:", result.data || result);
      }
    } catch (err) {
      console.error("Error fetching site settings:", err);
    }
  };

  if (!settings) {
    return null; // Prevent mismatch during hydration
  }

  return (
    <SiteContext.Provider value={{ settings }}>
      <SkeletonTheme>{children}</SkeletonTheme>
    </SiteContext.Provider>
  );
};

export default SiteProviders;
