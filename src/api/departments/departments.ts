import { httpClient } from "@/api";

export const getDepartments = async () => {
  try {
    const { data, status, statusText } = await httpClient.get("/departments");
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t fetch departments", err);
    throw err;
  }
};
