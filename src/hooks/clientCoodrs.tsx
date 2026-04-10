"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PermissionDeniedType } from "@/utils/interfaces";
import { saveClientCoordsCookie, deleteClientCoordsCookie } from "@/actions";

export function useCoords() {
  const [denied, setDenied] = useState<PermissionDeniedType>({
    status: false,
    message: "",
  });
  const [reqLocation, setReqLocation] = useState("");

  const success = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    saveClientCoordsCookie(latitude, longitude);
  };

  const error = async (error: GeolocationPositionError) => {
    setDenied({
      status: true,
      message: `${error.code} ${error.message}`,
    });
    await deleteClientCoordsCookie();
  };

  const handlePersmissions = async (state: PermissionState) => {
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

      await deleteClientCoordsCookie();
    }
  };

  useEffect(() => {
    if (!navigator.permissions) return;

    let permissionStatus: PermissionStatus;

    navigator.permissions.query({ name: "geolocation" }).then((status) => {
      permissionStatus = status;
      handlePersmissions(permissionStatus.state);

      // Safari: The onchange event handler is supported, but the event never fires.
      permissionStatus.addEventListener("change", () =>
        handlePersmissions(permissionStatus.state),
      );
    });
    return () => {
      if (permissionStatus) {
        permissionStatus.removeEventListener("change", () =>
          handlePersmissions(permissionStatus.state),
        );
      }
    };
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
