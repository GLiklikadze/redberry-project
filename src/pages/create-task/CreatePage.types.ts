export type CreateTaskType = {
  name: string;
  description?: string;
  due_date: Date | string;
  status_id: 1 | 2 | 3 | 4;
  employee_id: number;
  priority_id: 1 | 2 | 3;
  department_id?: number;
};
export type PriorityObj = {
  id: 1 | 2 | 3;
  name: string;
  icon: string;
};
export type StatusesObj = {
  id: 1 | 2 | 3 | 4;
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
export type EmployeeGetObjType = {
  avatar: string;
  department: { id: number; name: string };
  id: string;
  name: string;
  surname: string;
};
