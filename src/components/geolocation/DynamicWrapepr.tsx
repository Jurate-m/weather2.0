"use client";
import dynamic from "next/dynamic";

const UserConsent = dynamic(
  () => import("@/components/geolocation/UserConsent"),
  { ssr: false },
);

export default function DynamicWrapepr({
  validCookies,
}: {
  validCookies: boolean;
}) {
  return <UserConsent cookies={validCookies} />;
}
