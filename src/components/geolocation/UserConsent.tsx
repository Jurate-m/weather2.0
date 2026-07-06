"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useConsent } from "./consent-provider";
import { useCoords } from "@/hooks/clientCoodrs";

import RequestConsent from "./consent-ui/request-consent";
import RejectedConsent from "./consent-ui/rejected-consent";

export const LOCATION_ERR_MSG = {
  err_404:
    "Feel free to use the search form to search for desired location forecast",
  err_3:
    "It took to long to reach your location. Please check if permission is granted and location services are turned on.",
  err_2:
    "There was an error retrieving geolocation possition. Please check if permission is granted and location services are turned on and try again.",
  err_1:
    "If you would like to see forecasts for your area, you can enable location permissions in your browser settings and refresh the page.",
};

export default function UserConsent({ cookies }: { cookies: boolean }) {
  const { token, handleAccept, handleReject } = useConsent();
  const [loaded, setLoaded] = useState(false);
  const { denied, code } = useCoords(cookies);
  const params = useSearchParams();
  const location = params.get("location");

  useEffect(() => {
    setLoaded(true);
  }, [token]);

  if (!loaded || location || cookies) return;

  return (
    <main className='max-w-full w-5xl mx-auto px-5 pt-12'>
      {token === null && (
        <RequestConsent
          acceptHandler={handleAccept}
          denyHandler={handleReject}
        />
      )}
      {(denied || token === "0") && (
        <RejectedConsent
          message={
            code
              ? LOCATION_ERR_MSG[code as keyof typeof LOCATION_ERR_MSG]
              : null
          }
          acceptHandler={handleAccept}
        />
      )}
    </main>
  );
}
