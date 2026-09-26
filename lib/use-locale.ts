"use client";

import { usePathname } from "next/navigation";
import { getDictionary } from "@/content/i18n/ui";
import { localeFromPath } from "@/lib/i18n";

/** Current language (from the public URL) and its interface strings. */
export function useLocale() {
  const locale = localeFromPath(usePathname());
  return { locale, t: getDictionary(locale) };
}
