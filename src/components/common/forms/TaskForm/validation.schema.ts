import { z } from "zod";

import {
  E_TASK_FIELD_NAMES,
  E_TASK_PRIORITY,
  E_TASK_STATUS,
} from "@/types/enums/task";

export const taskFormSchema = z.object({
  [E_TASK_FIELD_NAMES.TITLE]: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" }),
  [E_TASK_FIELD_NAMES.DESCRIPTION]: z.string(),
  [E_TASK_FIELD_NAMES.PRIORITY]: z.nativeEnum(E_TASK_PRIORITY),
  [E_TASK_FIELD_NAMES.STATUS]: z.nativeEnum(E_TASK_STATUS),
  [E_TASK_FIELD_NAMES.DATE]: z.coerce
    .date({ required_error: "Due date is required" })
    .min(new Date(), { message: "Due date is required" }),
});

export type T_TaskForm = z.infer<typeof taskFormSchema>;
