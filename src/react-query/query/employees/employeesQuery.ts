import { getEmployees } from "@/api/employees/employees";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployees = () => {
  return useQuery({
    queryKey: ["get-employees"],
    retry: 1,
    queryFn: getEmployees,
  });
};
