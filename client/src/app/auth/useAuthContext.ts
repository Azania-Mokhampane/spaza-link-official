import { useUser } from "@clerk/clerk-react";
import { getAuthSnapshot } from "./authSnapShot";

export type UserRole = "customer" | "trader";

export type User = {
  id: string;
  email: string;
  phoneNumber?: string;
  role?: UserRole;
};

export function useAuthContext() {
  const { isLoaded, user, isSignedIn } = useUser();
  const snapshot = getAuthSnapshot();
  const isOnline = navigator.onLine;

  // Online + Clerk loaded → real auth
  if (isOnline && isLoaded) {
    return {
      isReady: true,
      isSignedIn: isSignedIn,
      user: {
        email: user?.emailAddresses[0].emailAddress,
        id: user?.id,
        phoneNumber: user?.phoneNumbers[0]?.phoneNumber || "",
        role: user?.publicMetadata?.role as UserRole,
      },
      source: "clerk" as const,
    };
  }

  // Offline or Clerk unavailable → snapshot
  if (!isOnline && snapshot?.isSignedIn) {
    return {
      isReady: true,
      isSignedIn: true,
      user: snapshot.user,
      source: "snapshot" as const,
    };
  }

  return {
    isReady: false,
    isSignedIn: false,
    user: null,
    source: "none" as const,
  };
}
