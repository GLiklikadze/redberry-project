type TaskStatusPropsTypes = {
  taskStatus: string;
  bgColor: string;
};

const TaskStatusBox: React.FC<TaskStatusPropsTypes> = ({
  taskStatus,
  bgColor,
}) => {
  return (
    <div
      className={`${bgColor} flex h-[54px] w-[381px] items-center justify-center rounded-[0.6rem] border-[#F7BC30] text-xl font-medium text-[#ffffff]`}
    >
      {taskStatus}
    </div>
  );
};

export default TaskStatusBox;
