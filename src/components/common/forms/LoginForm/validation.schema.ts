import { z } from "zod";

import { E_LOGIN_FIELD_NAMES } from "@/types/enums/login";

export const loginFormSchema = z.object({
  [E_LOGIN_FIELD_NAMES.USERNAME]: z
    .string({ required_error: "Username is required" })
    .min(4, { message: "Name is required" }),
  [E_LOGIN_FIELD_NAMES.PASSWORD]: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Due date is invalid" }),
});

export type T_LoginForm = z.infer<typeof loginFormSchema>;
