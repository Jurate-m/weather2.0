"use client";

import { useState, useEffect, useRef } from "react";
import { saveClientCoordsCookie, deleteClientCoordsCookie } from "@/actions";
import { useConsent } from "@/components/geolocation/consent-provider";

export function useCoords(cookiesSet: boolean) {
  const [denied, setDenied] = useState<null | boolean>(null);
  const [code, setCode] = useState<null | string>(null);
  const { token } = useConsent();
  const permissionRef = useRef<PermissionStatus | null>(null);
  const savedRef = useRef(false);
  const deletedRef = useRef(false);

  const options = {
    // enableHighAccuracy: true,
    timeout: 10000, // 'The default value is Infinity, meaning that getCurrentPosition() won't return until the position is available.'
    maximumAge: 0,
  };

  const success = async (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    if (!cookiesSet && !savedRef.current) {
      savedRef.current = true;
      await saveClientCoordsCookie(latitude, longitude);
    }
    setDenied(false);
  };

  const error = async (err?: GeolocationPositionError) => {
    if (cookiesSet && !deletedRef.current) {
      deletedRef.current = true;
      await deleteClientCoordsCookie();
    }

    if (err) {
      setCode(`err_${err.code}`);
      setDenied(true);
    }
  };

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  useEffect(() => {
    if (!navigator.geolocation && !navigator.permissions) {
      setCode("err_404");
      return setDenied(true);
    }

    navigator.permissions.query({ name: "geolocation" }).then((status) => {
      permissionRef.current = status;

      if (token === "1") {
        getPosition();
      }

      permissionRef.current.addEventListener("change", getPosition);
    });

    return () => {
      permissionRef.current?.removeEventListener("change", getPosition);
      permissionRef.current = null;
    };
  }, [token]);

  return { denied, code };
}
