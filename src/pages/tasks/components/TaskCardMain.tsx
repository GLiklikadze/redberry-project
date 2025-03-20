import { TaskCardMainProps } from "@/pages/tasks/components/TasksPage.types";

const TaskCardMain: React.FC<TaskCardMainProps> = ({
  taskName,
  taskDescription,
}) => {
  return (
    <div className="space-y-3 px-[10.5px]">
      <h3 className="truncate text-[15px] font-semibold">{taskName}</h3>
      <p className="max-h-10 truncate text-sm text-[14px] font-normal">
        {taskDescription}
      </p>
    </div>
  );
};

export default TaskCardMain;
