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
  FilterObj,
  StatusObjectType,
  TaskObjType,
} from "@/pages/tasks/components/TasksPage.types";
import { useGetStatuses } from "@/react-query/query/statuses/statusesQuery";
import { useGetTasks } from "@/react-query/query/tasks/tasksQuery";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TaskSearchForm from "@/pages/tasks/components/TaskSearchForm";

const defaultValues = {
  priorities: [],
  departments: [],
  employees: 0,
};

const TasksPage = () => {
  const { data: statusesData } = useGetStatuses();
  const { data: tasksData } = useGetTasks();
  const [filteredTaskData, setFilteredTaskData] = useState(tasksData ?? []);

  const formKey = "TaskSearchData";
  const savedData = localStorage.getItem(formKey);
  const parsedData = JSON.parse(savedData as string);

  const form = useForm<FilterObj>({
    defaultValues: parsedData ?? defaultValues,
  });
  const watchedData = form.watch();

  useEffect(() => {
    localStorage.setItem(formKey, JSON.stringify(watchedData));
  }, [watchedData]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(formKey);
    };
  }, []);

  useEffect(() => {
    if (tasksData) {
      setFilteredTaskData(tasksData);
    }
  }, [tasksData]);

  console.log(filteredTaskData);
  const onSubmit = (formValues: FilterObj) => {
    console.log(formValues);
    const newData = tasksData?.filter((taskObj: TaskObjType) => {
      const departmentMatch =
        !formValues?.departments?.length ||
        formValues?.departments.includes(taskObj?.department.id);
      const priorityMatch =
        !formValues?.priorities?.length ||
        formValues?.priorities.includes(taskObj?.priority.id);

      const employeeMatch =
        !formValues?.employees ||
        formValues?.employees === taskObj?.employee.id;

      return departmentMatch && priorityMatch && employeeMatch;
    });
    setFilteredTaskData(newData);
    console.log(filteredTaskData);
  };

  return (
    <div>
      <h2 className="text-[2.13rem] font-semibold">დავალებების გვერდი</h2>
      <TaskSearchForm
        form={form}
        onSubmit={onSubmit}
        setFilteredTaskData={setFilteredTaskData}
      />
      <section className="mt-6">
        <div className="flex flex-row gap-[52px]">
          {statusesData?.map((statusObj: StatusObjectType) => (
            <div key={statusObj.id}>
              <TaskStatusBox
                taskStatus={statusObj.name}
                bgColor={statusBgColors[statusObj?.id - 1]}
              />
              <div>
                {filteredTaskData
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
                        departmentId={taskObj?.department.id}
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
