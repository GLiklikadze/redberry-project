import { format } from "date-fns";
import { ka } from "date-fns/locale";

export const formatGeorgianDate = (date: Date): string => {
  if (date) {
    return `${format(date, "EEE", { locale: ka })} - ${format(date, "dd/M/yyyy")}`;
  } else {
    return "unknown";
  }
};
