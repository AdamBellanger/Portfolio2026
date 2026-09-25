"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ErrorScreen, primaryButton, secondaryButton } from "@/components/ui/ErrorScreen";
import { Magnetic } from "@/components/ui/Magnetic";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorScreen
      code="500"
      title="Le serveur a trébuché."
      message="Une erreur inattendue s'est produite de mon côté. Réessayez dans un instant ; si ça persiste, écrivez-moi."
      terminal={[
        "$ curl -I adambellanger.pro",
        "HTTP/2 500 Internal Server Error",
        `x-error-digest: ${error.digest ?? "n/a"}`,
        "",
        "$ docker compose logs portfolio --tail 1",
        "portfolio  | Unhandled exception, request aborted",
        "",
        "$ docker compose restart portfolio  # je m'en occupe",
      ]}
      actions={
        <>
          <Magnetic strength={0.25}>
            <button type="button" onClick={reset} className={primaryButton}>
              Réessayer
            </button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Link href="/" className={secondaryButton}>
              Retour à l&apos;accueil
            </Link>
          </Magnetic>
        </>
      }
    />
  );
}
