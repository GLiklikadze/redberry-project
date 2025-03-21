import { DialogContext } from "@/context/useDialog";
import { useState, ReactNode } from "react";

export function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}
