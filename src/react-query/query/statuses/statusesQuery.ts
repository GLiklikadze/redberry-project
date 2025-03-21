import { getStatuses } from "@/api/statuses/statuses";
import { useQuery } from "@tanstack/react-query";

export const useGetStatuses = () => {
  return useQuery({
    queryKey: ["get-statuses"],
    retry: false,
    queryFn: getStatuses,
    // staleTime: 5 * 60 * 1000,
    // gcTime: 5 * 60 * 1000,
  });
};
