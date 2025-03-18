export type StatusObjectType = {
  id: number;
  name: string;
};

export type Department = {
  id: number;
  name: string;
};

export type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: Department;
};

export type Priority = {
  id: number;
  name: string;
  icon: string;
};

export type TaskObjType = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: Department;
  employee: Employee;
  status: StatusObjectType;
  priority: Priority;
  total_comments: number;
};

export type TaskCardHeaderProps = {
  taskIcon: string;
  taskPriority: string;
  department: string;
  date?: string;
  taskPriorityId: number;
};
export type TaskCardMainProps = {
  taskName: string;
  taskDescription: string;
};
export type TaskStatusPropsTypes = {
  taskStatus: string;
  bgColor: string;
};
