import { getPriorities } from "@/api/priorities/priorities";
import { useQuery } from "@tanstack/react-query";

export const useGetPriorities = () => {
  return useQuery({
    queryKey: ["get-priorities"],
    retry: 1,
    queryFn: getPriorities,
    // staleTime: 5 * 60 * 1000,
    // gcTime: 5 * 60 * 1000,
  });
};
