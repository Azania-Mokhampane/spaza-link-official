import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { clearAuthSnapshot, saveAuthSnapshot } from "./authSnapShot";
import type { UserRole } from "./useAuthContext";

/**
This component:
 - runs only when Clerk loads
 - keeps snapshot up to date
 - clears snapshot on sign out
 
in order to preserve ui-continuity
 */
export function AuthSync() {
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && user) {
      saveAuthSnapshot({
        isSignedIn: true,
        user: {
          email: user.emailAddresses[0].emailAddress,
          id: user.id,
          phoneNumber: user.phoneNumbers[0]?.phoneNumber,
          role: user.publicMetadata?.role as UserRole,
        },
      });
    } else {
      clearAuthSnapshot();
    }
  }, [isSignedIn, user, isLoaded]);

  return null;
}
