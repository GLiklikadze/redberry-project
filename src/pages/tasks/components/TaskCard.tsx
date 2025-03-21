import { ReactNode } from "react";
import { useNavigate } from "react-router";

type TaskCardProps = {
  children: ReactNode;
  borderColor: string;
  task_id: number;
};
const TaskCard: React.FC<TaskCardProps> = ({
  children,
  borderColor,
  task_id,
}) => {
  const navigate = useNavigate();
  return (
    <div className="mt-[30px]" onClick={() => navigate(`/${task_id}`)}>
      <div
        className={`${borderColor} flex min-h-[217px] w-[381px] flex-col gap-7 rounded-[15px] border-[1px] p-5 text-[15px]`}
      >
        {children}
      </div>
    </div>
  );
};

export default TaskCard;
