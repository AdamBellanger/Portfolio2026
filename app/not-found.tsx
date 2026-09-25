import type { Metadata } from "next";
import { ErrorScreen } from "@/components/ui/ErrorScreen";

export const metadata: Metadata = {
  title: "Page introuvable — Adam Bellanger",
};

export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      title="Hôte injoignable."
      message="Cette page n'existe pas, ou plus. Le lien est peut-être erroné, ou la page a été déplacée."
      terminal={[
        "$ ping adambellanger.pro/cette-page",
        "PING cette-page: 56 data bytes",
        "Request timeout for icmp_seq 0",
        "Request timeout for icmp_seq 1",
        "Request timeout for icmp_seq 2",
        "",
        "--- cette-page ping statistics ---",
        "3 packets transmitted, 0 received, 100% packet loss",
        "",
        "$ cd /  # retour à l'accueil conseillé",
      ]}
    />
  );
}
