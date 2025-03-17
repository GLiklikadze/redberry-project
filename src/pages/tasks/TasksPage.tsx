import TaskCard from "@/pages/tasks/components/TaskCard";
import TaskCardFooter from "@/pages/tasks/components/TaskCardFooter";
import TaskCardHeader from "@/pages/tasks/components/TaskCardHeader";
import TaskCardMain from "@/pages/tasks/components/TaskCardMain";
import {
  statusBgColors,
  taskBorderColors,
} from "@/pages/tasks/components/TaskColors";
import TaskStatusBox from "@/pages/tasks/components/TaskStatusBox";
import {
  StatusObjectType,
  TaskObjType,
} from "@/pages/tasks/components/TasksPage.types";
import { useGetStatuses } from "@/react-query/query/statuses/statusesQuery";
import { useGetTasks } from "@/react-query/query/tasks/tasksQuery";

const TasksPage = () => {
  const { data: statusesData } = useGetStatuses();
  const { data: tasksData } = useGetTasks();

  return (
    <div>
      <h2 className="text-[2.13rem] font-semibold">დავალებების გვერდი</h2>
      <section className="mt-6">
        <div className="flex flex-row gap-[52px]">
          {statusesData?.map((statusObj: StatusObjectType) => (
            <div key={statusObj.id}>
              <TaskStatusBox
                taskStatus={statusObj.name}
                bgColor={statusBgColors[statusObj?.id - 1]}
              />
              <div>
                {tasksData
                  ?.filter(
                    (taskObj: TaskObjType) =>
                      taskObj?.status?.id === statusObj?.id,
                  )
                  ?.map((taskObj: TaskObjType) => (
                    <TaskCard
                      key={taskObj?.id}
                      borderColor={taskBorderColors[statusObj?.id - 1]}
                      task_id={taskObj?.id}
                    >
                      <TaskCardHeader
                        taskPriority={taskObj?.priority?.name}
                        taskPriorityId={taskObj?.priority?.id}
                        date={taskObj?.due_date}
                        department={taskObj?.department.name}
                        taskIcon={taskObj?.priority?.icon}
                      />
                      <TaskCardMain
                        taskDescription={taskObj?.description}
                        taskName={taskObj?.name}
                      />
                      <TaskCardFooter
                        avatar={taskObj?.employee.avatar}
                        totalComments={taskObj?.total_comments}
                      />
                    </TaskCard>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TasksPage;
