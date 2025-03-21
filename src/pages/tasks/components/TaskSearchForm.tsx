import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller, FormProvider } from "react-hook-form";
import { Check, ChevronDown, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  EmployeeObjType,
  PriorityObj,
} from "@/pages/create-task/CreatePage.types";
import { Label } from "@/components/ui/label";
import { DepartmentObjType } from "@/components/header/Header";
import { FormField } from "@/components/ui/form/FormField";
import { FormItem, FormLabel } from "@/components/ui/form/FormComponents";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { useGetEmployees } from "@/react-query/query/employees/employeesQuery";
import { useGetDepartments } from "@/react-query/query/departments/departmentsQuery";
import { useGetPriorities } from "@/react-query/query/priorities/prioritiesQuery";
import { TaskSearchFormProps } from "@/pages/tasks/components/TasksPage.types";

const TaskSearchForm: React.FC<TaskSearchFormProps> = ({ form, onSubmit }) => {
  const { data: prioritiesData } = useGetPriorities();
  const { data: departmensData } = useGetDepartments();
  const { data: employeesData } = useGetEmployees();
  return (
    <div className="mt-[3.3rem] flex w-[43rem] flex-row gap-11 rounded-[10px] border-2">
      <FormProvider {...form}>
        <Controller
          name="departments"
          control={form.control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex w-[200px] gap-2 py-3 pl-[1.1rem]">
                  დეპარტამენტი
                  <ChevronDown className="h-6 w-6" />
                </button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="start" className="w-[43rem]">
                <div className="flex flex-col gap-5.5 py-5">
                  {departmensData?.map((departmentObj: DepartmentObjType) => (
                    <div
                      key={departmentObj?.id}
                      className="flex flex-row items-center gap-5"
                    >
                      <Checkbox
                        id={`department-${departmentObj.id}`}
                        checked={field.value.includes(departmentObj.id)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, departmentObj.id]
                            : field.value.filter(
                                (id: number) => id !== departmentObj.id,
                              );
                          field.onChange(newValue);
                        }}
                      />
                      <Label
                        htmlFor={`priority-${departmentObj.id}`}
                        className="flex items-center space-x-2 text-base"
                      >
                        <span>{departmentObj?.name}</span>
                      </Label>
                    </div>
                  ))}
                </div>
                <PopoverClose asChild>
                  <Button variant="cancel">
                    <X />
                  </Button>
                </PopoverClose>
                <Button variant="comment" onClick={form.handleSubmit(onSubmit)}>
                  არჩევა
                </Button>
              </PopoverContent>
            </Popover>
          )}
        />
        <Controller
          name="priorities"
          control={form.control}
          render={({ field }) => {
            return (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex w-[200px] gap-2 py-3 pl-[1.1rem]">
                    პრიორიტეტი
                    <ChevronDown className="h-6 w-6" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[27.8rem]"
                  side="bottom"
                  align="start"
                >
                  <div className="flex flex-col gap-5.5 py-5">
                    {prioritiesData?.map((priorityObj: PriorityObj) => (
                      <div
                        key={priorityObj?.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`priority-${priorityObj.id}`}
                          checked={field.value.includes(priorityObj.id)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, priorityObj.id]
                              : field.value.filter(
                                  (id: number) => id !== priorityObj.id,
                                );
                            field.onChange(newValue);
                          }}
                        />
                        <Label
                          htmlFor={`priority-${priorityObj.id}`}
                          className="flex items-center space-x-2 text-base"
                        >
                          <img
                            src={priorityObj?.icon}
                            alt={priorityObj?.name}
                            width={20}
                            height={20}
                          />
                          <span>{priorityObj?.name}</span>
                        </Label>
                      </div>
                    ))}
                    <PopoverClose asChild>
                      <Button variant="cancel">
                        <X />
                      </Button>
                    </PopoverClose>
                    <Button
                      variant="comment"
                      onClick={form.handleSubmit(onSubmit)}
                    >
                      არჩევა
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            );
          }}
        />

        <FormField
          control={form.control}
          name="employees"
          render={({ field: { value, onChange } }) => (
            <FormItem className="flex flex-col">
              <FormLabel></FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex w-[200px] gap-2 py-3 pl-[1.1rem]">
                    თანამშრომელი
                    <ChevronDown className="h-6 w-6" />
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-[16rem] p-2 py-5"
                  align="start"
                  alignOffset={-53}
                >
                  <div className="h-36 space-y-1 overflow-y-scroll">
                    {employeesData?.map((employee: EmployeeObjType) => (
                      <div
                        key={employee.id}
                        onClick={() => {
                          onChange(employee.id);
                          form.handleSubmit(onSubmit)();
                        }}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-100",
                          value === employee.id && "bg-gray-200",
                        )}
                      >
                        <img
                          src={employee.avatar}
                          className="h-7 w-7 rounded-full"
                          alt="employee_avatar"
                        />
                        <p className="text-base">{`${employee.name} ${employee.surname}`}</p>
                        {value === employee.id && (
                          <Check className="text-gray-custom ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </FormProvider>
    </div>
  );
};

export default TaskSearchForm;
