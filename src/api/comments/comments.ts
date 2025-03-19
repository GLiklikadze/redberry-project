import { httpClient } from "@/api";

export const getComments = async (task: number) => {
  try {
    const { data, status, statusText } = await httpClient.get(
      `/tasks/${task}/comments`,
    );
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t fetch comments", err);
    throw err;
  }
};

export const postComments = async (payload: {
  task: number;
  text: string;
  parent_id: number | null;
}) => {
  try {
    const { data, status, statusText } = await httpClient.post(
      `/tasks/${payload.task}/comments`,
      {
        text: payload?.text,
        parent_id: payload?.parent_id,
      },
    );
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t fetch comments", err);
    throw err;
  }
};
