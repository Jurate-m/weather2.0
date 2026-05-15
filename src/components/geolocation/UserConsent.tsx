"use client";

import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { UserConsentCtx } from "./UserConsentWrapper";
import { useCoords } from "@/hooks/clientCoodrs";
import Icon from "@/components/ui/Icon";

export const LOCATION_ERR_MSG = {
  "404":
    "Feel free to use the search form to search for desired location forecast",
  "3": "It took to long to reach your location. Please check if permission is granted and location services are turned on.",
  "1": "If you would like to see forecasts for your area, you can enable location permissions in your browser settings and refresh the page.",
  "0": "If you would like to see forecasts for your area, you can grant permission to use your location for local forecast.",
};

const ReqConsentMessage = ({
  acceptHandler,
  denyHandler,
}: {
  acceptHandler: () => void;
  denyHandler: () => void;
}) => {
  return (
    <section className='narrow'>
      <h1 className='text-2xl pb-2 font-semibold'>
        Allow to use your location for local weather?
      </h1>
      <p className='pb-4'>
        We store your approximate location in a temporary cookie to show local
        weather. It is not shared with third parties.
      </p>
      <ul className='flex -mx-2'>
        <li className='px-4'>
          <button
            onClick={denyHandler}
            className='block py-2 px-4 rounded-lg bg-red-700 hover:bg-red-600 focus:bg-red-600 text-white font-semibold'
          >
            No thanks
          </button>
        </li>
        <li className='px-2'>
          <button
            onClick={acceptHandler}
            className='block py-2 px-4 rounded-lg bg-emerald-700 hover:bg-green-700 focus:bg-green-700 text-white font-semibold'
          >
            Allow
          </button>
        </li>
      </ul>
    </section>
  );
};

const DenyConsentMessage = ({
  messageCode,
  acceptHandler,
}: {
  messageCode: string | boolean | null;
  acceptHandler?: () => void;
}) => {
  return (
    <section className='narrow'>
      <h1 className='text-2xl pb-2 font-semibold'>
        Unfortunatelly we couldn't retrieve your location.{" "}
      </h1>
      <div className='flex'>
        <div>
          {messageCode === "1" && <p>{LOCATION_ERR_MSG["1"]} </p>}
          {messageCode === "3" && <p>{LOCATION_ERR_MSG["3"]} </p>}
          <p>
            Feel free to use the search form to search for desired location
            forecast.
          </p>

          {!messageCode && (
            <>
              <p className='pb-4'>{LOCATION_ERR_MSG["0"]}</p>
              <button
                onClick={acceptHandler}
                className='block py-2 px-4 rounded-lg bg-emerald-700 hover:bg-green-700 focus:bg-green-700 text-white font-semibold'
              >
                Grant permission
              </button>
            </>
          )}
        </div>
        <div>
          <Icon iconId={6} />
        </div>
      </div>
    </section>
  );
};

export default function UserConsent({ cookies }: { cookies: boolean }) {
  const { token, handleAccept, handleReject } = useContext(UserConsentCtx);
  const [denied, code] = useCoords(cookies);
  const params = useSearchParams();
  const location = params.get("location");

  if (location || cookies) return;

  if (!cookies && token === null) {
    return (
      <ReqConsentMessage
        acceptHandler={handleAccept}
        denyHandler={handleReject}
      />
    );
  }

  if (token === null) {
    return;
  }

  if (token === "0" || denied) {
    return (
      <DenyConsentMessage
        messageCode={code ? code : null}
        acceptHandler={handleAccept}
      />
    );
  }
}
