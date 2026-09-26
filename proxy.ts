import { NextResponse, type NextRequest } from "next/server";
import {
  internalPath,
  isLocale,
  LOCALE_COOKIE,
  localeFromPath,
  negotiateLocale,
  switchLocalePath,
} from "@/lib/i18n";

// Language routing, in front of every page request:
// 1. First visit on a French URL from a browser set to another language →
//    redirect to the English page (an explicit footer choice, stored in the
//    "lang" cookie, always wins over the browser setting).
// 2. Public URLs are rewritten onto the internal app/[lang] tree
//    (/projets → /fr/projets, /en/projects → /en/projets).
// 3. Internal-looking URLs (/fr/…, /en/projets) redirect to their public form.

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse/i;

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Generated metadata images are requested by their internal path.
  if (pathname.includes("/opengraph-image")) return NextResponse.next();

  // /fr/… is never a public URL.
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    return redirect(request, pathname.slice(3) || "/", 308);
  }

  // English URLs use translated segments; send the French ones to them.
  const legacyEn = pathname.match(/^\/en\/(projets|a-propos)(\/.*)?$/);
  if (legacyEn) {
    const segment = legacyEn[1] === "projets" ? "projects" : "about";
    return redirect(request, `/en/${segment}${legacyEn[2] ?? ""}`, 308);
  }

  const urlLocale = localeFromPath(pathname);
  if (urlLocale === "fr") {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    const isBot = BOT.test(request.headers.get("user-agent") ?? "");
    const preferred = isLocale(saved)
      ? saved
      : isBot
        ? "fr"
        : negotiateLocale(request.headers.get("accept-language"));
    if (preferred === "en") {
      const response = redirect(request, switchLocalePath(pathname, "en"), 307);
      response.cookies.set(LOCALE_COOKIE, "en", { path: "/", maxAge: 31536000, sameSite: "lax" });
      return response;
    }
  }

  const response = NextResponse.rewrite(new URL(internalPath(pathname) + search, request.url));
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

function redirect(request: NextRequest, pathname: string, status: 307 | 308) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const response = NextResponse.redirect(url, status);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Pages only: skip the API, Next internals and any file with an extension
  // (images, fonts, the CV, sitemap.xml, robots.txt, icon.svg…).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
