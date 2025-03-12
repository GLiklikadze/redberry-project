const TasksPage = () => {
  return (
    <div className="">
      <h2 className="text-[2.13rem] font-semibold">დავალებების გვერდი</h2>
      <section className="mt-6">
        <div className="flex h-[54px] w-[381px] items-center justify-center rounded-[0.6rem] border-[#F7BC30] text-xl font-medium text-[#ffffff]">
          დასაწყები
        </div>
        <div className="mt-[30px]">
          <div className="min-h-[217px] w-[381px] rounded-[15px] border-[1px] border-[#F7BC30] p-5 text-[15px] font-medium">
            <h3>Redberry-ს საიტის ლენდინგის დიზაინი </h3>
            <p className="text-sm font-normal">
              შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს,
              ნავიგაციას.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TasksPage;
