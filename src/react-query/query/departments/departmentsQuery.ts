import { getDepartments } from "@/api/departments/departments";
import { useQuery } from "@tanstack/react-query";

export const useGetDepartments = () => {
  return useQuery({
    queryKey: ["get-departments"],
    retry: 1,
    queryFn: getDepartments,
    // staleTime: 5 * 60 * 1000,
    // gcTime: 5 * 60 * 1000,
  });
};
