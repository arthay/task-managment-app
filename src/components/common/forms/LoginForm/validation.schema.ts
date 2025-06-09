import { z } from "zod";

import { E_LOGIN_FIELD_NAMES } from "@/types/enums/login";

export const loginFormSchema = z.object({
  [E_LOGIN_FIELD_NAMES.USERNAME]: z
    .string({ required_error: "Username is required" })
    .min(4, { message: "Username must be at least 4 characters" }),
  [E_LOGIN_FIELD_NAMES.PASSWORD]: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type T_LoginForm = z.infer<typeof loginFormSchema>;
