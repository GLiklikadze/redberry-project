export type CommentObj = {
  author_avatar: string;
  author_nickname: string;
  id: number;
  parent_id: number | null;
  sub_comments: CommentObj[];
  task_id: number;
  text: string;
};
