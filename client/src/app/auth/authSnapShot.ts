import type { User } from "./useAuthContext";

export type AuthSnapshot = {
  isSignedIn: boolean;
  user?: User;
};

const KEY = "spaza-auth-snapshot";

export function saveAuthSnapshot(snapshot: AuthSnapshot) {
  localStorage.setItem(KEY, JSON.stringify(snapshot));
}

export function getAuthSnapshot(): AuthSnapshot | null {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearAuthSnapshot() {
  localStorage.removeItem(KEY);
}
