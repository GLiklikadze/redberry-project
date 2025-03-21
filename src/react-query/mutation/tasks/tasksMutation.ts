import { changeTaskStatus, createTasks } from "@/api/tasks/tasks";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useCreateTasks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-tasks"],
    mutationFn: createTasks,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "get-tasks",
        "get-single-task",
      ] as InvalidateQueryFilters);
    },
  });
};
export const useChangeTaskStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["change-task-status"],
    mutationFn: changeTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "get-tasks",
        "get-single-task",
      ] as InvalidateQueryFilters);
    },
  });
};
