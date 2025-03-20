import TaskCardHeader from "@/pages/tasks/components/TaskCardHeader";
import { useGetSingleTask } from "@/react-query/query/tasks/tasksQuery";
import { Calendar, PieChart, UserIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { useGetStatuses } from "@/react-query/query/statuses/statusesQuery";
import { StatusesObj } from "@/pages/create-task/CreatePage.types";
import { useChangeTaskStatus } from "@/react-query/mutation/tasks/tasksMutation";
import { formatGeorgianDate } from "@/pages/task-details/utils/dateFormat";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

const TaskDetailsBox = () => {
  const params = useParams();
  const { data: singleTaskData } = useGetSingleTask(Number(params?.task_id));
  const { data: statusesData } = useGetStatuses();
  const { mutate } = useChangeTaskStatus();
  const { setValue } = useForm<{ status: number }>();

  return (
    <section className="max-w-[715px]">
      <div className="flex flex-col gap-16">
        <div>
          <TaskCardHeader
            department={singleTaskData?.department.name}
            departmentId={singleTaskData?.department.id}
            taskIcon={singleTaskData?.priority.icon}
            taskPriority={singleTaskData?.priority.name}
            taskPriorityId={singleTaskData?.priority.id}
          />
          <div className="mt-3 flex flex-col gap-[26px]">
            <h1 className="text-[34px] font-semibold">
              {singleTaskData?.name}
            </h1>
            <p className="text-lg leading-[150%]">
              {singleTaskData?.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <h2 className="text-2xl font-medium">დავალების დეტალები</h2>
          <div className="flex flex-row items-center gap-[70px]">
            <div className="flex w-41 flex-row items-center gap-1.5">
              <PieChart />
              <span>სტატუსი</span>
            </div>
            <div>
              <Select
                value={singleTaskData ? String(singleTaskData.status.id) : ""}
                onValueChange={(value) => {
                  setValue("status", Number(value));
                  if (singleTaskData?.id) {
                    mutate({
                      id: singleTaskData.id,
                      status_id: Number(value),
                    });
                  }
                }}
              >
                <SelectTrigger className="h-[45px] w-[259px] rounded-[5px]">
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {statusesData?.map((statusesObj: StatusesObj) => (
                    <SelectItem
                      key={statusesObj?.id}
                      value={String(statusesObj?.id)}
                    >
                      <span>{statusesObj?.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-row items-center gap-[70px]">
            <div className="flex w-41 flex-row items-center gap-1.5">
              <UserIcon />
              <span>თანამშრომელი</span>
            </div>
            <div className="flex flex-row items-center gap-1.5">
              <img
                src={singleTaskData?.employee?.avatar}
                className="h-8 w-8 rounded-full"
              />
              <div className="flex flex-col">
                <div className="text-gray-light text-[11px] font-light whitespace-nowrap">
                  {singleTaskData?.employee?.department?.name}
                </div>
                <div className="text-sm">{`${singleTaskData?.employee?.name} ${singleTaskData?.employee?.surname}`}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-[70px]">
            <div className="flex w-41 flex-row items-center gap-1.5 text-sm">
              <Calendar />
              <span>დავალების ვადა</span>
            </div>
            <div>{formatGeorgianDate(singleTaskData?.due_date)}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskDetailsBox;
