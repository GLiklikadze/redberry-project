import { httpClient } from "@/api";

export const getStatuses = async () => {
  try {
    const { data, status, statusText } = await httpClient.get("/statuses");
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Error fetching statuses:", err);
    throw err;
  }
};
