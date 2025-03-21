import AnswerButton from "@/pages/task-details/components/AnswerButton";
import AnswerForm from "@/pages/task-details/components/AnswerForm";
import AnswerRenderBox from "@/pages/task-details/components/AnswerRenderBox";
import { CommentRenderBoxProps } from "@/pages/task-details/components/TaskDetails.types";

const CommentRenderBox: React.FC<CommentRenderBoxProps> = ({
  commentObj,
  onAnswerSubmit,
  handleCloseBox,
  activeReply,
  handleReplyClick,
  answerForm,
}) => {
  return (
    <div key={commentObj?.id} className="mb-5 flex flex-row gap-3">
      <img
        src={commentObj?.author_avatar}
        className="mt-0.5 h-[38px] w-[38px] rounded-full"
        alt="author-avatar"
      />
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold">{commentObj?.author_nickname}</p>
        <p>{commentObj?.text}</p>
        {activeReply === commentObj?.id ? (
          <AnswerForm
            answerForm={answerForm}
            onAnswerSubmit={onAnswerSubmit}
            handleCloseBox={handleCloseBox}
          />
        ) : (
          <AnswerButton
            commentObj={commentObj}
            handleReplyClick={handleReplyClick}
          />
        )}
        <AnswerRenderBox commentObj={commentObj} />
      </div>
    </div>
  );
};

export default CommentRenderBox;
