import { Button } from "@/components/ui/button/button";
import { Textarea } from "@/components/ui/textatea";
import { CommentFormProps } from "@/pages/task-details/components/TaskDetails.types";
import { Controller } from "react-hook-form";

const CommentForm: React.FC<CommentFormProps> = ({
  commentForm,
  onCommentSubmit,
}) => {
  return (
    <div className="relative">
      <Controller
        name="comment"
        control={commentForm.control}
        rules={{
          required: "ტექსტი აუცილებელია",
          validate: (value) => {
            if (value.trim() === "") {
              return "უნდა შეიცავდეს ერთ სიმბოლოს მაინც";
            }
            return true;
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <Textarea
              id="comment"
              className={`${error?.message ? "border-red-custom" : ""} h-[8.5rem] w-[40.6rem] resize-none px-5 py-7`}
              placeholder="დაწერეთ კომენტარი"
              {...field}
            />
          );
        }}
      />
      <Button
        variant="comment"
        onClick={commentForm.handleSubmit(onCommentSubmit)}
      >
        დააკომენტარე
      </Button>
    </div>
  );
};

export default CommentForm;
