import hourglass from "@/assets/Hourglass.svg";
import { Button } from "@/components/ui/button/button";
import button_plus from "@/assets/button/add.svg";
import { Link } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form/FormField";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/FormComponents";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDepartments } from "@/react-query/query/departments/departmentsQuery";
import { useCreateEmployees } from "@/react-query/mutation/employees/employeesMutation";

type EmployeeFormType = {
  name: string;
  surname: string;
  avatar: File | null;
  department_id: number;
};

export type DepartmentObjType = {
  id: number;
  name: string;
};
const Header = () => {
  const { data: departmentsData } = useGetDepartments();

  const form = useForm<EmployeeFormType>({
    defaultValues: {
      name: "",
      surname: "",
      avatar: null,
      department_id: 0,
    },
    mode: "onBlur",
  });
  const { mutate: mutateCreateEmployees } = useCreateEmployees();

  const onSubmit = (employFormValues: EmployeeFormType) => {
    mutateCreateEmployees(employFormValues);
    console.log(employFormValues);
  };

  return (
    <div className="flex h-[6.25rem] items-center justify-between bg-gray-100">
      <Link to="/">
        <div className="ml-[7.5rem] flex flex-row">
          <h1 className="text-3xl font-normal text-[#8338EC]">Momentum</h1>
          <img src={hourglass} alt="hourglass-logo" />
        </div>
      </Link>

      <div className="mr-[7.5rem] flex gap-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="header-outline">თანამშრომლის შექმნა</Button>
          </DialogTrigger>

          <DialogContent className="min-h-[766px] min-w-[913px] px-[50px] pt-[90px] pb-[60px]">
            <DialogHeader>
              <DialogTitle className="text-center text-[2.13rem] font-semibold">
                თანამშრომლის დამატება
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <FormProvider {...form}>
              <div className="flex w-full flex-row justify-between gap-[45px] pt-[45px] pb-[25px]">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-[384px]">
                      <FormLabel className="text-base">სახელი*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          className="h-[42px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem className="w-[384px]">
                      <FormLabel className="text-base">გვარი*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          className="h-[42px] w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="w-[384px]">
                    <FormLabel className="text-base">ავატარი*</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department_id"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="flex w-[384px] flex-col">
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
            </FormProvider>
            <DialogFooter className="sm:justify-start">
              <DialogClose
                className="flex w-full flex-row justify-end gap-[22px]"
                asChild
              >
                <div className="flex flex-row justify-end gap-[22px]">
                  <Button type="button" variant="outline">
                    გაუქმება
                  </Button>
                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    type="button"
                    variant="header"
                  >
                    დაამატე თანამშრომელი
                  </Button>
                </div>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Link to="create-task">
          <Button variant="header" className="font-display">
            <img src={button_plus} alt="plus" />
            შექმენი ახალი დავალება
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
