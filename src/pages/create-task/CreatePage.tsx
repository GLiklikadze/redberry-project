import { CreateTaskType } from "@/pages/create-task/components/CreatePage.types";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTasks } from "@/react-query/mutation/tasks/tasksMutation";
import { CreateTasksSchema } from "@/pages/create-task/components/createTasksSchema";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import CreateTaskForm from "@/pages/create-task/components/createTaskForm";
import { taskCreateDefaultValues } from "@/pages/create-task/components/defaultValues";

const CreatePage = () => {
  const formKey = "createTaskData";
  const savedData = localStorage.getItem(formKey);
  const parsedData = JSON.parse(savedData as string);

  const form = useForm<CreateTaskType>({
    defaultValues: parsedData ?? taskCreateDefaultValues,
    resolver: zodResolver(CreateTasksSchema),
    mode: "onChange",
  });
  const watchedData = form.watch();

  useEffect(() => {
    localStorage.setItem(formKey, JSON.stringify(watchedData));
  }, [watchedData]);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      localStorage.removeItem(formKey);
    };
  }, []);

  const { mutate } = useCreateTasks();

  const onSubmit = (fieldValues: CreateTaskType) => {
    const { name, description, due_date, employee_id, priority_id, status_id } =
      fieldValues;
    const postObject = {
      name,
      description,
      due_date,
      employee_id,
      priority_id,
      status_id,
    };
    mutate(postObject);
    form.reset();
    navigate("/");
    console.log(postObject);
  };

  return (
    <>
      <h2 className="mb-6 text-[2.13rem] font-semibold">
        შექმენი ახალი დავალება
      </h2>
      <CreateTaskForm form={form} onSubmit={onSubmit} />
    </>
  );
};

export default CreatePage;
