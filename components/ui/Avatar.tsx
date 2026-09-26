import Image from "next/image";
import avatar from "@/public/images/avatar.webp";

/** Round portrait shown next to the "Travaillons ensemble" headings. */
export function Avatar({ className = "" }: { className?: string }) {
  return (
    <Image
      src={avatar}
      alt=""
      sizes="96px"
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  );
}
