"use client";

import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { useCoords } from "@/hooks/clientCoodrs";
import { UserConsentCtx } from "@/components/geolocation/UserConsentWrapper";

export default function UserConsent({ cookies }: { cookies: boolean }) {
  const { accept, decline, handleAccept, handleReject } =
    useContext(UserConsentCtx);
  const [denied] = useCoords(cookies);

  const params = useSearchParams();
  const location = params.get("location");

  if (!denied && !accept && !decline) {
    return (
      <section>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleReject}>Reject</button>
      </section>
    );
  }

  if ((denied || decline) && !location) {
    return (
      <section>
        <h1>
          Unfortunatelly we couldn't retrieve your location. <br />
          Feel free to use Search and get forecasts that way.
        </h1>
      </section>
    );
  }
}
