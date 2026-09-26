"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "ab-visit-counted";

/** Discreet footer stat: counts one visit per browser session. */
export function VisitCounter({
  title,
  numberLocale,
  titleClassName,
}: {
  title: string;
  numberLocale: string;
  titleClassName: string;
}) {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let counted = false;
    try {
      counted = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}

    let cancelled = false;
    fetch("/api/visits", { method: counted ? "GET" : "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { total: number } | null) => {
        if (cancelled || !data) return;
        setTotal(data.total);
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {}
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (total === null || total < 1) return null;

  return (
    <div>
      <p className={titleClassName}>{title}</p>
      <p className="mt-2 text-sm tabular-nums">{new Intl.NumberFormat(numberLocale).format(total)}</p>
    </div>
  );
}
