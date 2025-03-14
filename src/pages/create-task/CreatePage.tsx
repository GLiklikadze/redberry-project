import { Button } from "@/components/ui/button/button";
import { Form } from "@/components/ui/form/Form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
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
  EmployeeObjType,
  PriorityObj,
  StatusesObj,
} from "@/pages/create-task/CreatePage.types";
import { useGetEmployees } from "@/react-query/employees/employeesQuery";
import { useGetDepartments } from "@/react-query/query/departments/departmentsQuery";
import { useGetPriorities } from "@/react-query/query/priorities/prioritiesQuery";
import { useGetStatuses } from "@/react-query/query/statuses/statusesQuery";

import { useForm } from "react-hook-form";

const taskCreateDefaultValues = {
  name: "",
  description: "",
  due_date: "",
  status_id: 1,
  employee_id: 0,
  priority_id: 2,
  department_id: 1,
};

const CreatePage = () => {
  const form = useForm<CreateTaskType>({
    defaultValues: taskCreateDefaultValues,
    mode: "onBlur",
  });

  const { data: prioritiesData } = useGetPriorities();
  const { data: statusesData } = useGetStatuses();
  const { data: departmentsData } = useGetDepartments();
  const { data: employeesData } = useGetEmployees();

  const onSubmit = (fieldValues: CreateTaskType) => {
    console.log(fieldValues);
  };

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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">სათაური*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        className="h-[45px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-x-1.5">
                    <FormLabel className="text-base">აღწერა</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ""}
                        className="h-[133px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employee_id"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base">
                      პასუხისმგებელი თანამშრომელი
                    </FormLabel>
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
                        {employeesData?.map((employee: EmployeeObjType) => (
                          <SelectItem
                            key={employee?.id}
                            value={String(employee?.id)}
                          >
                            <span>{`${employee?.name} ${employee?.surname}`}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="due_date"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="mt-[85px] flex flex-col">
                    <FormLabel className="text-base">დედლაინი</FormLabel>
                    <Input
                      type="date"
                      value={value}
                      onChange={onChange}
                      placeholder="DD/MM/YYYY"
                      className="h-[45px] w-[318px]"
                    />
                    <FormMessage />
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
