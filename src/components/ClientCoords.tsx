"use client";

import { useCoords } from "@/hooks/clientCoodrs";

export default function ClientCoords() {
  const [denied] = useCoords();

  if (denied?.status) {
    return (
      <h1>
        Unfortunatelly we couldn't retrieve your location. <br />
        Feel free to use Search and get forecasts that way.
      </h1>
    );
  }
}
