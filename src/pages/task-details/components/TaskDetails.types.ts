import { UseFormReturn } from "react-hook-form";

export type CommentObj = {
  author_avatar: string;
  author_nickname: string;
  id: number;
  parent_id: number | null;
  sub_comments: CommentObj[];
  task_id: number;
  text: string;
};
export type CommentFormObj = { comment: string };

export type CommentFormProps = {
  commentForm: UseFormReturn<CommentFormObj>;
  onCommentSubmit: (formValues: CommentFormObj) => void;
};

export type AnswerFormObj = { answer: string };

export type AnswerFormProps = {
  answerForm: UseFormReturn<AnswerFormObj>;
  onAnswerSubmit: (formValues: AnswerFormObj) => void;
  handleCloseBox: () => void;
};

export type AnswerRenderProps = {
  commentObj: CommentObj;
};
export type AnswerButtonProps = {
  commentObj: CommentObj;
  handleReplyClick: (comment_id: number) => void;
};

export type CommentRenderBoxProps = {
  commentObj: CommentObj;
  onAnswerSubmit: (formValues: AnswerFormObj) => void;
  handleCloseBox: () => void;
  activeReply: null | number;
  handleReplyClick: (comment_id: number) => void;
  answerForm: UseFormReturn<AnswerFormObj>;
};
