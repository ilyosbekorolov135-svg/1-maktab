import { useState, useEffect } from "react";

export interface SiteSettings {
  siteName: string;
  siteBadge: string;
  siteTagline: string;
  headerLogo: string;
  heroBadge1: string;
  heroBadge2: string;
  // Navigation labels
  navMain: string;
  navTeachers: string;
  navTalented: string;
  navSchedule: string;
  navScheduleBadge: string;
  navReviews: string;
}

const DEFAULTS: SiteSettings = {
  siteName: "1-Maktab",
  siteBadge: "ANGOR TUMANI",
  siteTagline: "Surxondaryo viloyati 1-sonli maktab portali",
  headerLogo: "/uploads/angor_1_maktab_official_logo.jpg",
  heroBadge1: "Surxondaryo #1 Tayanch Maktabi",
  heroBadge2: "Vazir Jamg'armasi 100% Ustamasi",
  navMain: "1-Maktab Asosiy",
  navTeachers: "Fidoiy Ustozlar",
  navTalented: "Iqtidorli O'quvchilar",
  navSchedule: "Dars Jadvali",
  navScheduleBadge: "2026",
  navReviews: "Fikr va Takliflar",
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings({ ...DEFAULTS, ...data });
      }
    } catch {
      // defaults remain
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const saveSettings = async (updates: Partial<SiteSettings>): Promise<boolean> => {
    try {
      const token = sessionStorage.getItem("admin_token") || "";
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, ...updates }));
        return true;
      }
    } catch {}
    return false;
  };

  return { settings, loading, saveSettings, refetch: fetchSettings };
}
