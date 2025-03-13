import TaskStatusBox from "@/pages/tasks/components/TaskStatusBox";
import { useGetStatuses } from "@/react-query/query/statuses/statusesQuery";

type StatusObjectType = {
  id: number;
  name: string;
};
const statusBgColors = [
  "bg-yellow-custom",
  "bg-orange-custom",
  "bg-pink-custom",
  "bg-blue-custom",
];
const TasksPage = () => {
  const { data: statusesData } = useGetStatuses();

  return (
    <div>
      <h2 className="text-[2.13rem] font-semibold">დავალებების გვერდი</h2>
      <section className="mt-6">
        <div className="flex flex-row gap-[52px]">
          {statusesData?.map((statusObj: StatusObjectType) => (
            <TaskStatusBox
              key={statusObj.id}
              taskStatus={statusObj.name}
              bgColor={statusBgColors[statusObj?.id - 1]}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TasksPage;
