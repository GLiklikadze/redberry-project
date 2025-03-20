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
// import { useSearchParams } from "react-router";
// import qs from "qs";

const TasksPage = () => {
  const { data: statusesData } = useGetStatuses();
  const { data: tasksData } = useGetTasks();
  const [filteredTaskData, setFilteredTaskData] = useState(tasksData ?? []);
  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (tasksData) {
      setFilteredTaskData(tasksData);
    }
  }, [tasksData]);

  // const parsedQueryParams = qs.parse(searchParams.toString());

  const form = useForm<FilterObj>({
    defaultValues: {
      priorities: [],
      departments: [],
      employees: 0,
    },
  });
  // const priorities = form.watch("priorities");
  // const departments = form.watch("departments");
  // const employees = form.watch("employees");
  // const iSubmited = form.formState.isSubmitted;
  // console.log(searchParams);

  // useEffect(() => {
  //   if (iSubmited) {
  //     setSearchParams(
  //       qs.stringify(
  //         {
  //           departments: departments,
  //           priorities: priorities,
  //           employees: employees,
  //         },
  //         {
  //           skipNulls: true,
  //           filter: (_, value) => {
  //             return value || undefined;
  //           },
  //         },
  //       ),
  //     );
  //   }
  // }, [departments, priorities, employees, iSubmited, setSearchParams]);

  console.log(tasksData);

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
      <TaskSearchForm form={form} onSubmit={onSubmit} />
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
