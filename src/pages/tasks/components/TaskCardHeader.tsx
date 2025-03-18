import { TaskCardHeaderProps } from "@/pages/tasks/components/TasksPage.types";
import { format } from "date-fns";
import { ka } from "date-fns/locale";

const priorityTextColorsArr = [
  "text-green-custom",
  "text-yellow-secondary",
  "text-orange-secondary",
];
const priorityBorderColorsArr = [
  "border-green-custom",
  "border-yellow-secondary",
  "border-orange-secondary",
];
const departmentBgColorArr = [
  "bg-pink-secondary",
  "bg-blue-custom",
  "bg-yellow-secondary",
  "bg-orange-secondary",
];

const TaskCardHeader: React.FC<TaskCardHeaderProps> = ({
  taskIcon,
  taskPriority,
  department,
  date,
  taskPriorityId,
}) => {
  const formattedDate = date && format(date, "dd MMM, yyyy", { locale: ka });
  const priorityTextColor = priorityTextColorsArr?.[taskPriorityId - 1];
  const priorityBorderColor = priorityBorderColorsArr?.[taskPriorityId - 1];
  const randomIndex = Math.floor(Math.random() * departmentBgColorArr.length);
  const departmentBgColor = departmentBgColorArr?.[randomIndex];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between text-xs">
        <div className="flex flex-row gap-2.5">
          <div
            className={`${priorityTextColor} ${priorityBorderColor} flex h-[26px] w-[86px] items-center justify-center gap-1 rounded-sm border-[0.5px] text-xs font-medium`}
          >
            <img src={taskIcon} />
            <span>{taskPriority}</span>
          </div>
          <div
            className={`${departmentBgColor} h-[24px] w-[88px] truncate rounded-[15px] px-[9px] pt-[5px] text-xs font-medium text-white`}
          >
            {department}
          </div>
        </div>
        {date ? <span>{formattedDate}</span> : ""}
      </div>
    </div>
  );
};

export default TaskCardHeader;
