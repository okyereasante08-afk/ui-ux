import { AuthUser, UserRole } from "@/types/marketplace";

/*
  Mock auth backed by localStorage — same storage-first pattern as
  useTheme.tsx (STORAGE_KEY + document/window side effects), just scoped
  to auth instead of theme.

  Why a subscribe/publish store instead of plain getItem/setItem calls:
  BottomNav, the vendor-dashboard guard, and any header badge all need to
  react the instant login/logout happens — including logout fired from
  another tab. `window.addEventListener("storage", ...)` only fires for
  CROSS-tab changes, not same-tab writes, so every write here also
  dispatches a custom "aces-auth-change" event to cover the same-tab case
  (e.g. the login form redirecting immediately after login()).

  Swapping to real auth later: replace the bodies of login/logout/
  registerUser/getCurrentUser with actual API calls and keep the same
  signatures — consuming components won't need to change.
*/

const STORAGE_KEY = "aces_auth_user";
const USERS_KEY = "aces_registered_users"; // mock "database" of accounts
const AUTH_EVENT = "aces-auth-change";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCurrentUser(): AuthUser | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function getRegisteredUsers(): (AuthUser & { password: string })[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRegisteredUsers(users: (AuthUser & { password: string })[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function broadcastAuthChange() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  storeName?: string;
}

export function registerUser(input: RegisterInput): { user?: AuthUser; error?: string } {
  if (!isBrowser()) return { error: "Not available server-side" };

  const users = getRegisteredUsers();
  if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    return { error: "An account with this email already exists." };
  }
  if (input.role === "vendor" && !input.storeName?.trim()) {
    return { error: "Store name is required for vendor accounts." };
  }

  const newUser: AuthUser & { password: string } = {
    id: `u_${Date.now()}`,
    name: input.name,
    email: input.email,
    role: input.role,
    storeName: input.storeName,
    createdAt: new Date().toISOString(),
    password: input.password, // mock only — never store plaintext passwords in production
  };

  saveRegisteredUsers([...users, newUser]);

  const { password: _password, ...publicUser } = newUser;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(publicUser));
  broadcastAuthChange();
  return { user: publicUser };
}

export function login(email: string, password: string): { user?: AuthUser; error?: string } {
  if (!isBrowser()) return { error: "Not available server-side" };

  const users = getRegisteredUsers();
  const match = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!match) {
    return { error: "Invalid email or password." };
  }

  const { password: _password, ...publicUser } = match;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(publicUser));
  broadcastAuthChange();
  return { user: publicUser };
}

export function logout() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
  broadcastAuthChange();
}

/** Subscribe to auth changes (login/logout/register), same-tab or cross-tab. Returns an unsubscribe fn. */
export function subscribeToAuthChanges(callback: () => void): () => void {
  if (!isBrowser()) return () => {};

  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };

  window.addEventListener(AUTH_EVENT, callback);
  window.addEventListener("storage", handleStorageEvent);

  return () => {
    window.removeEventListener(AUTH_EVENT, callback);
    window.removeEventListener("storage", handleStorageEvent);
  };
}

// --- Dev convenience: seed a demo vendor so /vendor-dashboard is explorable
// without going through /register first.
export function seedDemoVendor() {
  if (!isBrowser()) return;
  const users = getRegisteredUsers();
  if (users.some((u) => u.email === "demo@aces.com")) return;
  saveRegisteredUsers([
    ...users,
    {
      id: "u_demo",
      name: "Demo Vendor",
      email: "demo@aces.com",
      password: "demo1234",
      role: "vendor",
      storeName: "Demo Store",
      createdAt: new Date().toISOString(),
    },
  ]);
}
