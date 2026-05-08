"use client";

import { useState, useEffect, useContext } from "react";
import { saveClientCoordsCookie, deleteClientCoordsCookie } from "@/actions";
import { UserConsentCtx } from "@/components/geolocation/UserConsentWrapper";

export function useCoords(cookiesSet: boolean) {
  const [denied, setDenied] = useState<boolean>(false);
  const { token, handleAccept, handleReject } = useContext(UserConsentCtx);

  const success = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    if (!cookiesSet) await saveClientCoordsCookie(latitude, longitude);
    setDenied(false);
    handleAccept();
  };

  const error = async () => {
    if (cookiesSet) await deleteClientCoordsCookie();
    setDenied(true);
    handleReject();
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  useEffect(() => {
    if (!navigator.geolocation && !navigator.permissions)
      return setDenied(true);

    let permissionStatus: PermissionStatus;

    navigator.permissions
      .query({
        name: "geolocation",
      })
      .then((status) => {
        permissionStatus = status;

        if (token && token === "0") {
          return error();
        }

        if (token === "1") {
          getPosition();
        }

        permissionStatus.addEventListener("change", getPosition);
      });

    return () => {
      if (permissionStatus)
        permissionStatus.removeEventListener("change", getPosition);
    };
  }, [token]);

  return [denied];
}
