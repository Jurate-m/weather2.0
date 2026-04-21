"use client";

import { useState, useEffect } from "react";
import { saveClientCoordsCookie, deleteClientCoordsCookie } from "@/actions";

export function useCoords(cookiesSet: boolean) {
  const [denied, setDenied] = useState<boolean>(false);

  const success = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    if (!cookiesSet) await saveClientCoordsCookie(latitude, longitude);
    setDenied(false);
  };

  const error = async () => {
    if (cookiesSet) await deleteClientCoordsCookie();
    setDenied(true);
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

        if (permissionStatus.state !== "prompt") {
          getPosition();
        }

        permissionStatus.addEventListener("change", getPosition);
      });

    return () => {
      if (permissionStatus)
        permissionStatus.removeEventListener("change", getPosition);
    };
  }, []);

  return [denied];
}
