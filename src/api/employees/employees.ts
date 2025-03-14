import { httpClient } from "@/api";

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
