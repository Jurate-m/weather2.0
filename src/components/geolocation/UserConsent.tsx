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
        <h1 className='text-2xl pb-2 font-semibold'>
          Use your location for local weather?
        </h1>
        <p className='pb-4'>
          We store your approximate location (±11 km) in a temporary cookie to
          show local weather. It is not shared with third parties.
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
