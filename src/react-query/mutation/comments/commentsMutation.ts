import { postComments } from "@/api/comments/comments";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-comment"],
    mutationFn: postComments,
    onSuccess: () => {
      queryClient.invalidateQueries(["get-comments"] as InvalidateQueryFilters);
    },
  });
};
