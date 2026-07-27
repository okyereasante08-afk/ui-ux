import { createContext, useContext, useState, type ReactNode } from "react";

interface MoreMenuContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const MoreMenuContext = createContext<MoreMenuContextType | null>(null);

export function MoreMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MoreMenuContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </MoreMenuContext.Provider>
  );
}

export function useMoreMenu() {
  const ctx = useContext(MoreMenuContext);
  if (!ctx) throw new Error("useMoreMenu must be used within MoreMenuProvider");
  return ctx;
}
