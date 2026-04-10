"use client";

import { useCoords } from "@/hooks/clientCoodrs";
import { use } from "react";

export default function ClientCoords({
  locationQuery,
}: {
  locationQuery?: Promise<{ location?: string }>;
}) {
  const [denied] = useCoords();
  const query = locationQuery ? use(locationQuery) : undefined;

  if (denied?.status && !query?.location) {
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
