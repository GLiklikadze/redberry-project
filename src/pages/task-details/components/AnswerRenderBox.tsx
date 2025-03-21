import { AnswerRenderProps } from "@/pages/task-details/components/TaskDetails.types";

const AnswerRenderBox: React.FC<AnswerRenderProps> = ({ commentObj }) => {
  return (
    <>
      {commentObj?.sub_comments.length > 0 &&
        commentObj?.sub_comments?.map((subCommentObj) => (
          <div key={subCommentObj?.id} className="mt-5 flex flex-row gap-3">
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
    </>
  );
};

export default AnswerRenderBox;
