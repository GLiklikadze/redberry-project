import { z } from "zod";

export const CreateTasksSchema = z.object({
  name: z.string().nonempty().min(3).max(255),
  description: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) {
          return true;
        }
        const words = value.trim().split(/\s+/);
        return words.length >= 4;
      },
      { message: "Must contain at least 4 words" },
    ),
  due_date: z.union([z.string(), z.date()]),
  status_id: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  employee_id: z.number().positive(),
  priority_id: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  department_id: z.number().optional(),
});
