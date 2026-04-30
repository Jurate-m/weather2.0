"use client";

import { useCoords } from "@/hooks/clientCoodrs";
import { use } from "react";

export default function ClientCoordsInner({
  locationQuery,
  validCookies,
}: {
  locationQuery?: Promise<{ location?: string }>;
  validCookies: boolean;
}) {
  const [denied] = useCoords(validCookies);

  const query = locationQuery ? use(locationQuery) : undefined;

  if (denied && !query?.location) {
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
