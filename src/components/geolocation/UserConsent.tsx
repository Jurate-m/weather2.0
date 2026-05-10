"use client";

import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { useCoords } from "@/hooks/clientCoodrs";
import { UserConsentCtx } from "@/components/geolocation/UserConsentWrapper";

export const LOCATION_ERR_MSG = [
  "Feel free to use the search form to search for desired location forecast.",
  "If you would like to see forecasts for your area, you can enable location permissions in your browser settings and refresh the page.",
];

export default function UserConsent({ cookies }: { cookies: boolean }) {
  const { accept, decline, handleAccept, handleReject } =
    useContext(UserConsentCtx);
  const [denied, message] = useCoords(cookies);

  const params = useSearchParams();
  const location = params.get("location");

  if (location || cookies) return;

  if (denied || decline) {
    return (
      <section>
        <h1 className='text-2xl pb-2 font-semibold'>
          Unfortunatelly we couldn't retrieve your location.{" "}
        </h1>
        {message ? message : LOCATION_ERR_MSG[0]}
      </section>
    );
  }

  if (!denied && !accept && !decline) {
    return (
      <section>
        <h1 className='text-2xl pb-2 font-semibold'>
          Allow to use your location for local weather?
        </h1>
        <p className='pb-4'>
          We store your approximate location in a temporary cookie to show local
          weather. It is not shared with third parties.
        </p>
        <ul className='flex -mx-2'>
          <li className='px-2'>
            <button
              onClick={handleReject}
              className='block py-2 px-4 rounded-lg bg-red-700 hover:bg-red-600 focus:bg-red-600 text-white font-semibold'
            >
              No thanks
            </button>
          </li>
          <li className='px-2'>
            <button
              onClick={handleAccept}
              className='block py-2 px-4 rounded-lg bg-emerald-700 hover:bg-green-700 focus:bg-green-700 text-white font-semibold'
            >
              Allow
            </button>
          </li>
        </ul>
      </section>
    );
  }
}
