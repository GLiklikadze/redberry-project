import { useForm } from "react-hook-form";
import { useGetComments } from "@/react-query/query/comments/commentsQuery";
import { useParams } from "react-router";
import { useAddComment } from "@/react-query/mutation/comments/commentsMutation";
import { useState } from "react";
import {
  CommentFormObj,
  CommentObj,
} from "@/pages/task-details/components/TaskDetails.types";
import TaskDetailsBox from "@/pages/task-details/components/TaskDetailsBox";
import CommentForm from "@/pages/task-details/components/CommentForm";
import CommentRenderBox from "@/pages/task-details/components/CommentRenderBox";

const TaskDetailsPage = () => {
  const [activeReply, setActiveReply] = useState<null | number>(null);
  const params = useParams();
  const { data: commentsData } = useGetComments(Number(params?.task_id));
  const { mutate: mutateAddComment } = useAddComment();
  console.log(commentsData);

  const commentForm = useForm<CommentFormObj>({
    defaultValues: { comment: "" },
  });

  const answerForm = useForm<{
    answer: string;
  }>({
    defaultValues: {
      answer: "",
    },
  });

  const onCommentSubmit = (commentObj: CommentFormObj) => {
    mutateAddComment({
      task: Number(params?.task_id),
      text: commentObj?.comment,
      parent_id: null,
    });
    commentForm.reset();
  };

  const onAnswerSubmit = (answerObj: { answer: string }) => {
    mutateAddComment({
      task: Number(params?.task_id),
      text: answerObj?.answer,
      parent_id: activeReply,
    });
    setActiveReply(null);
    answerForm.reset();
  };
  const handleCloseBox = () => {
    setActiveReply(null);
  };

  const handleReplyClick = (comment_id: number) => {
    setActiveReply(comment_id);
    console.log(comment_id);
  };
  const totalComments = commentsData
    ? commentsData.length +
      commentsData.flatMap((c: CommentObj) => c.sub_comments || []).length
    : 0;

  return (
    <div className="flex flex-row gap-[14rem]">
      <TaskDetailsBox />
      <section className="bg-gray-comments mt-11 flex w-[741px] flex-col gap-10 px-11 py-10">
        <CommentForm
          commentForm={commentForm}
          onCommentSubmit={onCommentSubmit}
        />
        <div className="mt-6 flex flex-row items-center justify-start gap-2.5 space-x-1.5">
          <div className="text-xl font-medium">კომენტარები</div>
          <div className="bg-violet-custom h-[22px] w-[30px] rounded-[30px] pt-[2px] text-center text-sm font-medium text-white">
            {totalComments}
          </div>
        </div>
        <div>
          {commentsData?.map((commentObj: CommentObj) => {
            return (
              <CommentRenderBox
                activeReply={activeReply}
                commentObj={commentObj}
                handleCloseBox={handleCloseBox}
                onAnswerSubmit={onAnswerSubmit}
                handleReplyClick={handleReplyClick}
                answerForm={answerForm}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default TaskDetailsPage;
