"use client";

import { createContext, useState, useEffect } from "react";

type UserConsentType = {
  accept: boolean;
  decline: boolean;
  token: null | string;
  handleAccept: () => void;
  handleReject: () => void;
};

export const UserConsentCtx = createContext<UserConsentType>({
  accept: false,
  decline: false,
  token: null,
  handleAccept: () => {},
  handleReject: () => {},
});

export default function UserConsentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accept, setAccept] = useState(false);
  const [decline, setDecline] = useState(false);
  const [token, setToken] = useState<null | string>(null);

  const handleAccept = () => {
    setAccept(true);
    setDecline(false);
    sessionStorage.setItem("geo-consent", "1");
  };

  const handleReject = () => {
    setDecline(true);
    setAccept(false);
    sessionStorage.setItem("geo-consent", "0");
  };

  useEffect(() => {
    setToken(sessionStorage.getItem("geo-consent"));
  }, [accept]);

  return (
    <UserConsentCtx
      value={{ accept, decline, token, handleAccept, handleReject }}
    >
      {children}
    </UserConsentCtx>
  );
}
