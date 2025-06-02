import { z } from "zod";

import { E_PROJECT_FIELD_NAMES } from "@/types/enums/project";

export const projectFormSchema = z.object({
  [E_PROJECT_FIELD_NAMES.NAME]: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
  [E_PROJECT_FIELD_NAMES.DATE]: z.coerce
    .date({ required_error: "Due date is required" })
    .min(new Date(), { message: "Due date is invalid" }),
});

export type T_ProjectForm = z.infer<typeof projectFormSchema>;
