import { addDays } from "date-fns";

export const taskCreateDefaultValues = {
  name: "",
  description: "",
  due_date: addDays(new Date(), 1),
  status_id: 1 as 1 | 2 | 3 | 4,
  employee_id: 0,
  priority_id: 2 as 1 | 2 | 3,
  department_id: 1,
};
