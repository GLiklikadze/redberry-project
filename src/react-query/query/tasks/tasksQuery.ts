import { getTasks } from "@/api/tasks/tasks";
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
