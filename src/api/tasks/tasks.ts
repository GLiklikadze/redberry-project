import { httpClient } from "@/api";

type TasksPostObj = {
  name: string;
  description?: string;
  due_date: string | Date;
  employee_id: number;
  priority_id: 1 | 2 | 3;
  status_id: 1 | 2 | 3 | 4;
};

export const getTasks = async () => {
  try {
    const { data, status, statusText } = await httpClient.get("/tasks");
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
};
export const getSingleTask = async (id: number) => {
  try {
    const { data, status, statusText } = await httpClient.get(`/tasks/${id}`);
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Error fetch task:", id, err);
    throw err;
  }
};

export const createTasks = async (createTaskPayload: TasksPostObj) => {
  try {
    const { data, status, statusText } = await httpClient.post(
      "/tasks",
      createTaskPayload,
    );
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Error creating tasks", err);
    throw err;
  }
};
type changeTaskPayload = {
  id: number;
  status_id: number;
};

export const changeTaskStatus = async (payload: changeTaskPayload) => {
  try {
    const { data, status, statusText } = await httpClient.put(
      `/tasks/${payload?.id}`,
      { status_id: payload?.status_id },
    );
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Error changing task status", err);
    throw err;
  }
};
