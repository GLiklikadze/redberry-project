import { getSingleTask, getTasks } from "@/api/tasks/tasks";
import { useQuery } from "@tanstack/react-query";

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["get-tasks"],
    retry: false,
    queryFn: getTasks,
    // staleTime: 5 * 60 * 1000,
    // gcTime: 5 * 60 * 1000,
  });
};
export const useGetSingleTask = (id: number) => {
  return useQuery({
    queryKey: ["get-single-task"],
    retry: false,
    queryFn: () => getSingleTask(id),
    // staleTime: 5 * 60 * 1000,
    // gcTime: 5 * 60 * 1000,
  });
};
