"use client";

import { useState, useEffect } from "react";
import { PermissionDeniedType } from "@/utils/interfaces";
import { saveClientCoordsCookie, deleteClientCoordsCookie } from "@/actions";

export function useCoords() {
  const [denied, setDenied] = useState<PermissionDeniedType>();
  const [reqLocation, setReqLocation] = useState("");

  const success = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    saveClientCoordsCookie(latitude, longitude);
  };

  const error = (error: GeolocationPositionError) => {
    setDenied({
      status: error.code,
      message: error.message,
    });
    deleteClientCoordsCookie();
  };

  const handlePersmissions = (state: PermissionState) => {
    setReqLocation(state);

    if (state === "granted") {
      setDenied({
        status: false,
        message: "",
      });
    }

    if (state === "denied") {
      setDenied({
        status: true,
        message: "Denied location",
      });

      deleteClientCoordsCookie();
    }
  };

  useEffect(() => {
    if (!navigator.permissions) return;

    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        handlePersmissions(permissionStatus.state);

        // Safari: The onchange event handler is supported, but the event never fires.
        permissionStatus.onchange = () => {
          handlePersmissions(permissionStatus.state);
        };
      });
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setDenied({
        status: true,
        message: "Navigator not available",
      });
    } else {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
      });
    }
  }, [reqLocation]);

  return [denied];
}
