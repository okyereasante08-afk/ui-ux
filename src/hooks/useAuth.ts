import { useEffect, useState, useCallback } from "react";
import { AuthUser } from "@/types/marketplace";
import { getCurrentUser, subscribeToAuthChanges, logout as logoutUser } from "@/lib/auth";

/**
 * Reads the current mock-auth user and stays in sync with login/logout,
 * including logout triggered from another tab. `isLoading` covers the
 * brief window before localStorage has been read on mount, so guards
 * (e.g. VendorDashboard) can avoid flashing "logged out" UI.
 */
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setUser(getCurrentUser());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    return subscribeToAuthChanges(refresh);
  }, [refresh]);

  const logout = useCallback(() => {
    logoutUser();
  }, []);

  return { user, isLoading, logout };
}
