"use client";

import { createContext, useState, useEffect, useContext } from "react";

type UserConsentType = {
  accept: boolean;
  decline: boolean;
  token: string | null;
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

export default function ConsentProvider({
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
    setToken("1");
  };

  const handleReject = () => {
    setDecline(true);
    setAccept(false);
    sessionStorage.setItem("geo-consent", "0");
    setToken("0");
  };

  useEffect(() => {
    const storageToken = sessionStorage.getItem("geo-consent");
    if (storageToken) setToken(storageToken);
  }, []);

  return (
    <UserConsentCtx.Provider
      value={{ accept, decline, token, handleAccept, handleReject }}
    >
      {children}
    </UserConsentCtx.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(UserConsentCtx);
  if (!ctx)
    throw new Error("useConsent must be used within UserConsentWrapper");
  return ctx;
}
