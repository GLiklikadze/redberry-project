import { createContext, useContext } from "react";
type DialogContextType = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined,
);

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error("useDialog must be used within a DialogProvider");
  return context;
}
