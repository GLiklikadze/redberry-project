import { AnswerButtonProps } from "@/pages/task-details/components/TaskDetails.types";
import left_arrow from "@/assets/left2.png";

export const AnswerButton: React.FC<AnswerButtonProps> = ({
  commentObj,
  handleReplyClick,
}) => {
  return (
    <button
      onClick={() => handleReplyClick(commentObj?.id)}
      className="flex flex-row items-center gap-1.5"
    >
      <img src={left_arrow} alt="reply-icon" className="h-4 w-4" />
      <span className="text-violet-custom text-xs">უპასუხე</span>
    </button>
  );
};

export default AnswerButton;
