import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Textarea } from "@/components/ui/textatea";
import { Button } from "@/components/ui/button/button";
import { useGetComments } from "@/react-query/query/comments/commentsQuery";
import left_arrow from "@/assets/left2.png";
import { useAddComment } from "@/react-query/mutation/comments/commentsMutation";
import { useState } from "react";
import { CommentObj } from "@/pages/task-details/components/TaskDetails.types";
import TaskDetailsBox from "@/pages/task-details/components/TaskDetailsBox";

const TaskDetailsPage = () => {
  const [activeReply, setActiveReply] = useState<null | number>(null);
  const params = useParams();
  const { data: commentsData } = useGetComments(Number(params?.task_id));
  const { mutate: mutateAddComment } = useAddComment();
  console.log(commentsData);

  const {
    control,
    handleSubmit,
    reset: commentFormReset,
  } = useForm<{ comment: string }>({
    defaultValues: { comment: "" },
  });

  const {
    control: answerControl,
    handleSubmit: handleAnswerSubmit,
    reset: answerFormReset,
  } = useForm<{
    answer: string;
  }>({
    defaultValues: {
      answer: "",
    },
  });

  const onSubmit = (commentObj: { comment: string }) => {
    mutateAddComment({
      task: Number(params?.task_id),
      text: commentObj?.comment,
      parent_id: null,
    });
    commentFormReset();
  };

  const onAnswerSubmit = (answerObj: { answer: string }) => {
    mutateAddComment({
      task: Number(params?.task_id),
      text: answerObj?.answer,
      parent_id: activeReply,
    });
    setActiveReply(null);
    answerFormReset();
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
        <div className="relative">
          <Controller
            name="comment"
            control={control}
            render={({ field }) => {
              return (
                <Textarea
                  id="comment"
                  className="h-[8.5rem] w-[40.6rem] resize-none px-5 py-7"
                  placeholder="დაწერეთ კომენტარი"
                  {...field}
                />
              );
            }}
          />
          <Button variant="comment" onClick={handleSubmit(onSubmit)}>
            დააკომენტარე
          </Button>
        </div>
        <div className="mt-6 flex flex-row items-center justify-start gap-2.5 space-x-1.5">
          <div className="text-xl font-medium">კომენტარები</div>
          <div className="bg-violet-custom h-[22px] w-[30px] rounded-[30px] pt-[2px] text-center text-sm font-medium text-white">
            {totalComments}
          </div>
        </div>
        <div>
          {commentsData?.map((commentObj: CommentObj) => {
            return (
              <div key={commentObj?.id} className="mb-5 flex flex-row gap-3">
                <img
                  src={commentObj?.author_avatar}
                  className="mt-0.5 h-[38px] w-[38px] rounded-full"
                  alt="author-avatar"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold">
                    {commentObj?.author_nickname}
                  </p>
                  <p>{commentObj?.text}</p>
                  {activeReply === commentObj?.id ? (
                    <div className="relative">
                      <Controller
                        name="answer"
                        control={answerControl}
                        render={({ field }) => {
                          return (
                            <Textarea
                              id="answer"
                              className="h-[8rem] w-[37.5rem] resize-none px-5 pt-7 pb-14"
                              placeholder="დაწერეთ პასუხი"
                              {...field}
                            />
                          );
                        }}
                      />
                      <Button variant="cancel" onClick={handleCloseBox}>
                        <X className="stroke-3" size={48} />
                      </Button>
                      <Button
                        variant="comment"
                        onClick={handleAnswerSubmit(onAnswerSubmit)}
                      >
                        დააკომენტარე
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleReplyClick(commentObj?.id)}
                      className="flex flex-row items-center gap-1.5"
                    >
                      <img
                        src={left_arrow}
                        alt="reply-icon"
                        className="h-4 w-4"
                      />
                      <span className="text-violet-custom text-xs">
                        უპასუხე
                      </span>
                    </button>
                  )}

                  {commentObj?.sub_comments.length > 0 &&
                    commentObj?.sub_comments?.map((subCommentObj) => (
                      <div
                        key={subCommentObj?.id}
                        className="mt-5 flex flex-row gap-3"
                      >
                        <img
                          src={subCommentObj?.author_avatar}
                          className="mt-0.5 h-[38px] w-[38px] rounded-full"
                          alt="author-avatar"
                        />
                        <div className="flex flex-col gap-2">
                          <p className="text-lg font-semibold">
                            {subCommentObj.author_nickname}
                          </p>
                          <p>{subCommentObj.text}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default TaskDetailsPage;
