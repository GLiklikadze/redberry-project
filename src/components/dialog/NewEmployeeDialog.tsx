import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
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
import { useCreateEmployees } from "@/react-query/mutation/employees/employeesMutation";
import { useGetDepartments } from "@/react-query/query/departments/departmentsQuery";
import { Button } from "@/components/ui/button/button";
import { useDialog } from "@/context/useDialog";
import { getClassName } from "@/pages/create-task/components/utils";
import { NewEmployeeFormSchema } from "@/components/dialog/NewEmployeeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type EmployeeFormType = {
  name: string;
  surname: string;
  avatar: File;
  department_id: number;
};
export type DepartmentObjType = {
  id: number;
  name: string;
};
const NewEmployeeDialog = () => {
  const { data: departmentsData } = useGetDepartments();

  const form = useForm<EmployeeFormType>({
    defaultValues: {
      name: "",
      surname: "",
      avatar: undefined,
      department_id: 0,
    },
    resolver: zodResolver(NewEmployeeFormSchema),
    mode: "onChange",
  });
  const { mutate: mutateCreateEmployees } = useCreateEmployees();

  const onSubmit = (employFormValues: EmployeeFormType) => {
    mutateCreateEmployees(employFormValues);
    form.reset();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    form.setValue("avatar", null);
    setOpen(false);
  };
  const { open, setOpen } = useDialog();
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
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
                render={({
                  field,
                  formState: { errors },
                  fieldState: { isDirty },
                }) => (
                  <FormItem className="w-[384px]">
                    <FormLabel className="text-base">სახელი*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        className="h-[42px]"
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
                name="surname"
                render={({
                  field,
                  formState: { errors },
                  fieldState: { isDirty },
                }) => (
                  <FormItem className="w-[384px]">
                    <FormLabel className="text-base">გვარი*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        className="h-[42px] w-full"
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
                      accept="image/png, image/jpeg, image/gif, image/webp"
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
    </div>
  );
};

export default NewEmployeeDialog;
