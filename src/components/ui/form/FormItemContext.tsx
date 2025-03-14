import * as React from "react";

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

export { FormItemContext };
export type { FormItemContextValue };
