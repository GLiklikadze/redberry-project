import { X } from "lucide-react";
import { Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textatea";
import { Button } from "@/components/ui/button/button";
import { AnswerFormProps } from "@/pages/task-details/components/TaskDetails.types";

const AnswerForm: React.FC<AnswerFormProps> = ({
  answerForm,
  onAnswerSubmit,
  handleCloseBox,
}) => {
  return (
    <div className="relative">
      <Controller
        name="answer"
        control={answerForm.control}
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
              id="answer"
              className={`${error?.message ? "border-red-custom" : ""} h-[8rem] w-[37.5rem] resize-none px-5 pt-7 pb-14`}
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
        onClick={answerForm.handleSubmit(onAnswerSubmit)}
      >
        დააკომენტარე
      </Button>
    </div>
  );
};

export default AnswerForm;
