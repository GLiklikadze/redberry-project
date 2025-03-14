export type CreateTaskType = {
  name: string;
  description: string;
  due_date: string;
  status_id: number;
  employee_id: number;
  priority_id: number;
  department_id: number;
};
export type PriorityObj = {
  id: number;
  name: string;
  icon: string;
};
export type StatusesObj = {
  id: number;
  name: string;
  icon: string;
};
export type DepartmentObjType = {
  id: number;
  name: string;
};
export type EmployeeObjType = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department_id: number;
};
