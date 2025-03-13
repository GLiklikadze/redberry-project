type TaskCardProps = {
  taskPriority: string;
  department: string;
  date: string;
  taskName: string;
  taskDescription: string;
  avatar: string;
  totalComments: number;
};

const TaskCard: React.FC<TaskCardProps> = ({
  taskPriority,
  department,
  date,
  taskName,
  taskDescription,
  avatar,
  totalComments,
}) => {
  return (
    <div className="mt-[30px]">
      <div className="flex min-h-[217px] w-[381px] flex-col gap-7 rounded-[15px] border-[1px] border-[#F7BC30] p-5 text-[15px]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between text-xs">
            <div className="flex flex-row gap-2.5">
              <div className="flex h-[26px] w-[86px] items-center justify-center rounded-sm border-[0.5px] text-xs font-medium">
                {taskPriority}
              </div>
              <div className="bg-pink-custom flex h-[24px] w-[88px] items-center justify-center rounded-[15px] border-[0.5px] text-xs font-medium text-white">
                {department}
              </div>
            </div>
            <span>{date}</span>
          </div>
        </div>
        <div className="px-[10.5px]">
          <h3 className="text-[15px] font-semibold">{taskName}</h3>
          <p className="text-sm text-[14px] font-normal">{taskDescription}</p>
        </div>
        <div className="flex justify-between">
          <img src={avatar} className="w-[31px] rounded-full border-2" />
          <div className="flex justify-center gap-[2.5px]">
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.08086 2.25977C1.87258 2.25977 0.880859 3.25148 0.880859 4.45977V15.0198C0.880859 16.228 1.87258 17.2198 3.08086 17.2198H4.88211C4.94227 17.7491 4.93539 18.239 4.79961 18.6498C4.63289 19.1551 4.3218 19.5796 3.74086 19.9285C3.57758 20.0316 3.50195 20.2293 3.5518 20.4149C3.60164 20.6005 3.76836 20.7329 3.96086 20.7398C5.82742 20.7398 7.96727 19.7652 9.04836 17.2198H18.9209C20.1291 17.2198 21.1209 16.228 21.1209 15.0198V4.45977C21.1209 3.25148 20.1291 2.25977 18.9209 2.25977H3.08086ZM3.08086 3.13977H18.9209C19.6496 3.13977 20.2409 3.73102 20.2409 4.45977V15.0198C20.2409 15.7485 19.6496 16.3398 18.9209 16.3398H8.80086C8.61695 16.3398 8.45195 16.4549 8.38836 16.6285C7.7043 18.4951 6.48227 19.3837 5.21211 19.7085C5.38398 19.4627 5.54727 19.2032 5.63836 18.9248C5.86695 18.2304 5.84805 17.4707 5.70711 16.6973C5.66758 16.4927 5.49055 16.3432 5.28086 16.3398H3.08086C2.35211 16.3398 1.76086 15.7485 1.76086 15.0198V4.45977C1.76086 3.73102 2.35211 3.13977 3.08086 3.13977Z"
                fill="#212529"
              />
            </svg>
            <span className="text-sm">{totalComments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
