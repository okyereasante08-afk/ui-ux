import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

// Non-standard browser API — not in TypeScript's default DOM lib types.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PWAContextType {
  offlineReady: boolean;
  needRefresh: boolean;
  updateServiceWorker: () => Promise<void>;
  isOnline: boolean;
  installPrompt: BeforeInstallPromptEvent | null;
  showInstallPrompt: () => void;
}

const PWAContext = createContext<PWAContextType | null>(null);

export function PWAProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  const {
    needRefresh: [needRefresh],
    offlineReady: [offlineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      console.log("SW registered:", swUrl);
      // Check for updates every hour
      setInterval(() => {
        registration?.update();
      }, 60 * 60 * 1000);
    },
    onRegisterError(error) {
      console.error("SW registration error:", error);
    },
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const showInstallPrompt = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then(() => setInstallPrompt(null));
    }
  };

  return (
    <PWAContext.Provider
      value={{
        offlineReady,
        needRefresh,
        updateServiceWorker,
        isOnline,
        installPrompt,
        showInstallPrompt,
      }}
    >
      {children}
      {/* Offline indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-circuit-navy/90 backdrop-blur-sm border-b border-aces-blue/30 py-2 px-4">
          <p className="text-center text-xs font-mono text-aces-blue">
            OFFLINE MODE — CONTENT CACHED
          </p>
        </div>
      )}
      {/* Update prompt */}
      {needRefresh && (
        <div className="fixed top-12 left-4 right-4 z-[100] bg-aces-blue rounded-lg shadow-lg p-4 animate-in slide-in-from-top">
          <p className="text-sm text-white font-medium mb-2">New version available</p>
          <button
            onClick={() => updateServiceWorker(true)}
            className="w-full py-2 bg-foreground/20 rounded text-sm text-white font-mono"
          >
            UPDATE NOW
          </button>
        </div>
      )}
    </PWAContext.Provider>
  );
}

export function usePWA() {
  const ctx = useContext(PWAContext);
  if (!ctx) throw new Error("usePWA must be used within PWAProvider");
  return ctx;
}
