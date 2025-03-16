import { createEmployees } from "@/api/employees/employees";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useCreateEmployees = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-employees"],
    mutationFn: createEmployees,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "get-employees",
      ] as InvalidateQueryFilters);
    },
  });
};
