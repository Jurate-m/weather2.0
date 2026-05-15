"use client";

import { useState, useEffect, useContext, useRef } from "react";
import { saveClientCoordsCookie, deleteClientCoordsCookie } from "@/actions";
import { UserConsentCtx } from "@/components/geolocation/UserConsentWrapper";

export function useCoords(cookiesSet: boolean) {
  const [denied, setDenied] = useState<null | boolean>(null);
  const [code, setCode] = useState<null | string>(null);
  const { token } = useContext(UserConsentCtx);
  const permissionRef = useRef<PermissionStatus | null>(null);
  const savedRef = useRef(false);
  const deletedRef = useRef(false);

  const options = {
    enableHighAccuracy: false,
    timeout: 10000,
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
      setCode(`${err.code}`);
      setDenied(true);
    }
  };

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  useEffect(() => {
    if (!navigator.geolocation && !navigator.permissions) {
      setCode("404");
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

  return [denied, code];
}
