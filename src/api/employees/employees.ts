import { httpClient } from "@/api";

type EmployeeFormType = {
  name: string;
  surname: string;
  avatar: File | null;
  department_id: number;
};

export const getEmployees = async () => {
  try {
    const { data, status, statusText } = await httpClient.get("/employees");
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Error fetching employees", err);
    throw err;
  }
};

export const createEmployees = async (employeesPayload: EmployeeFormType) => {
  try {
    const { data, status, statusText } = await httpClient.post(
      "/employees",
      employeesPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Error creating employees", err);
    throw err;
  }
};
