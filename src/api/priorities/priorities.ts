import { httpClient } from "@/api";

export const getPriorities = async () => {
  try {
    const { data, status, statusText } = await httpClient.get("./priorities");
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Error fetching priorities", err);
    throw err;
  }
};
