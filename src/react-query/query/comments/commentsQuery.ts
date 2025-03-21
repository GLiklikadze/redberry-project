import { getComments } from "@/api/comments/comments";
import { useQuery } from "@tanstack/react-query";

export const useGetComments = (id: number) => {
  return useQuery({
    queryKey: ["get-comments"],
    retry: 1,
    queryFn: () => getComments(id),
    enabled: !!id,
  });
};
