import { Button } from "@/components/ui/button/button";
import { Form } from "@/components/ui/form/Form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form/FormComponents";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textatea";
import {
  CreateTaskType,
  DepartmentObjType,
  EmployeeGetObjType,
  EmployeeObjType,
  PriorityObj,
  StatusesObj,
} from "@/pages/create-task/CreatePage.types";
import { useGetEmployees } from "@/react-query/query/employees/employeesQuery";
import { useGetDepartments } from "@/react-query/query/departments/departmentsQuery";
import { useGetPriorities } from "@/react-query/query/priorities/prioritiesQuery";
import { useGetStatuses } from "@/react-query/query/statuses/statusesQuery";
import { useForm } from "react-hook-form";
import { addDays, endOfDay, format, isBefore, startOfDay } from "date-fns";
import { ka } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, PlusCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useCreateTasks } from "@/react-query/mutation/tasks/tasksMutation";
import { CreateTasksSchema } from "@/pages/create-task/components/createTasksSchema";
import { useNavigate } from "react-router";
import { useDialog } from "@/context/useDialog";

const taskCreateDefaultValues = {
  name: "",
  description: "",
  due_date: addDays(new Date(), 1),
  status_id: 1 as 1 | 2 | 3 | 4,
  employee_id: 0,
  priority_id: 2 as 1 | 2 | 3,
  department_id: 1,
};

const CreatePage = () => {
  const form = useForm<CreateTaskType>({
    defaultValues: taskCreateDefaultValues,
    resolver: zodResolver(CreateTasksSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const getClassName = (
    errors: string,
    fieldName: string,
    isDirty: boolean,
    type: string,
  ) => {
    let className = "";

    if (errors === type) {
      className += "text-red-custom";
    }
    if (fieldName && errors !== type && isDirty) {
      className += "text-green-custom";
    }

    return className;
  };
  const department_id = form.watch("department_id");
  const { data: prioritiesData } = useGetPriorities();
  const { data: statusesData } = useGetStatuses();
  const { data: departmentsData } = useGetDepartments();
  const { data: employeesData } = useGetEmployees();

  const employeesFilteredData = employeesData?.filter(
    (data: EmployeeGetObjType) => data?.department.id === department_id,
  );
  console.log(form?.formState?.errors);
  console.log(form?.formState?.dirtyFields);

  const isDepartmentSelected = form.formState?.dirtyFields?.department_id;

  const disabledLabelStyles = isDepartmentSelected ? "" : "text-gray-400";

  const { mutate } = useCreateTasks();
  console.log(isDepartmentSelected);

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
  const disablePastDates = (date: Date) => {
    return isBefore(endOfDay(date), startOfDay(new Date()));
  };
  const { setOpen } = useDialog();
  return (
    <>
      <h2 className="mb-6 text-[2.13rem] font-semibold">
        შექმენი ახალი დავალება
      </h2>
      <div className="text-gray-custom h-[958px] w-[1684px] rounded-sm border-[0.3px] border-[#DDD2FF] bg-[#FBF9FF] px-[55px] py-[65px]">
        <Form {...form}>
          <div className="flex flex-row gap-40">
            <div className="flex w-[550px] flex-col gap-[55px]">
              <FormField
                control={form.control}
                name="name"
                render={({ field, formState: { errors, isDirty } }) => (
                  <FormItem>
                    <FormLabel className="text-base">სათაური*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        className="h-[45px]"
                      />
                    </FormControl>
                    <div className="text-gray-msg mt-0.5 text-[10px] font-[350]">
                      <p
                        className={getClassName(
                          String(errors?.name?.type),
                          field?.name,
                          isDirty,
                          "too_small",
                        )}
                      >
                        მინიმუმ 2 სიმბოლო
                      </p>
                      <p
                        className={getClassName(
                          String(errors?.name?.type),
                          field?.name,
                          isDirty,
                          "too_big",
                        )}
                      >
                        მაქსიმუმ 255 სიმბოლო
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field, formState: { errors, isDirty } }) => (
                  <FormItem className="space-x-1.5">
                    <FormLabel className="text-base">აღწერა</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ""}
                        className="h-[133px] resize-none"
                      />
                    </FormControl>
                    <div className="text-gray-msg mt-0.5 text-[10px] font-[350]">
                      <p
                        className={getClassName(
                          String(errors?.description?.type),
                          field?.name,
                          isDirty,
                          "custom",
                        )}
                      >
                        მინიმუმ 4 სიტყვა
                      </p>
                      <p
                        className={getClassName(
                          String(errors?.description?.type),
                          field?.name,
                          isDirty,
                          "too_big",
                        )}
                      >
                        მაქსიმუმ 255 სიმბოლო
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex h-[260px] flex-row gap-8">
                <FormField
                  control={form.control}
                  name="priority_id"
                  render={({ field: { value, onChange } }) => (
                    <FormItem className="flex w-[259px] flex-col">
                      <FormLabel className="text-base">პრიორიტეტი*</FormLabel>
                      <Select
                        value={String(value)}
                        onValueChange={(val) => onChange(Number(val))}
                      >
                        <FormControl>
                          <SelectTrigger className="h-[46px] rounded-[5px]">
                            <SelectValue></SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {prioritiesData?.map((priorityObj: PriorityObj) => (
                            <SelectItem
                              key={priorityObj?.id}
                              value={String(priorityObj?.id)}
                            >
                              <div className="flex flex-row gap-[6px]">
                                <img
                                  src={priorityObj?.icon}
                                  alt="priority-icon"
                                />
                                <span>{priorityObj?.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status_id"
                  render={({ field: { value, onChange } }) => (
                    <FormItem className="flex w-[259px] flex-col">
                      <FormLabel className="text-base">სტატუსი*</FormLabel>
                      <Select
                        value={String(value)}
                        onValueChange={(val) => onChange(Number(val))}
                      >
                        <FormControl>
                          <SelectTrigger className="h-[46px] rounded-[5px]">
                            <SelectValue></SelectValue>
                          </SelectTrigger>
                        </FormControl>
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
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex w-[550px] flex-col gap-[55px]">
              <FormField
                control={form.control}
                name="department_id"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base">დეპარტამენტი*</FormLabel>
                    <Select
                      value={String(value)}
                      onValueChange={(val) => onChange(Number(val))}
                    >
                      <FormControl>
                        <SelectTrigger className="h-[46px] rounded-[5px]">
                          <SelectValue></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departmentsData?.map(
                          (departmentObj: DepartmentObjType) => (
                            <SelectItem
                              key={departmentObj?.id}
                              value={String(departmentObj?.id)}
                            >
                              <span>{departmentObj?.name}</span>
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employee_id"
                render={({
                  field: { value, onChange },
                  formState: { errors },
                }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel
                      className={`text-base ${!errors?.employee_id ? disabledLabelStyles : ""}`}
                    >
                      პასუხისმგებელი თანამშრომელი*
                    </FormLabel>
                    <Select
                      value={String(value)}
                      onValueChange={(val) => onChange(Number(val))}
                      disabled={!isDepartmentSelected}
                    >
                      <FormControl>
                        <SelectTrigger className="h-[46px] rounded-[5px]">
                          <SelectValue></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <button
                          onClick={() => setOpen(true)}
                          className="text-violet-custom flex flex-row gap-2 px-[10px] py-[10px]"
                        >
                          <PlusCircleIcon className="stroke-[1.5]" />
                          დაამატე თანამშრომელი
                        </button>
                        {employeesFilteredData?.map(
                          (employee: EmployeeObjType) => (
                            <SelectItem
                              key={employee?.id}
                              value={String(employee?.id)}
                            >
                              <div className="flex flex-row items-center gap-1.5">
                                <img
                                  src={employee?.avatar}
                                  className="w-7 rounded-full"
                                  alt="employee_avatar"
                                />
                                <p>{`${employee?.name} ${employee?.surname}`}</p>
                              </div>
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>თარიღი</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "h-[45] w-[318px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>აირჩიეთ თარიღი</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(
                              date ? format(date, "yyyy-MM-dd") : "",
                            )
                          }
                          disabled={disablePastDates}
                          initialFocus
                          locale={ka}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>აირჩიეთ მომავალი თარიღი</FormDescription>
                  </FormItem>
                )}
              />
              <div className="mt-[90px] flex justify-end">
                <Button onClick={form.handleSubmit(onSubmit)}>
                  დავალების შექმნა
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreatePage;
