import { httpClient } from "@/api";

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
