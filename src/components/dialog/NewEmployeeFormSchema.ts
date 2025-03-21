import { z } from "zod";
const imgTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export const NewEmployeeFormSchema = z.object({
  name: z.string().nonempty().min(3).max(255),
  surname: z.string().nonempty().min(3).max(255),
  avatar: z
    .instanceof(File, { message: "Avatar must be a valid file" })
    .refine((file) => imgTypes.includes(file.type), {
      message: "მხოლოს ფოტო (JPEG, PNG, GIF, WEBP)",
    })
    .refine((file) => file.size <= 600 * 1024, {
      message: "მაქს 600 kb",
    }),
  department_id: z.number(),
});
