import {
  loginFormSchema,
  type T_LoginForm,
} from "@/components/common/forms/LoginForm/validation.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { E_LOGIN_FIELD_NAMES } from "@/types/enums/login";
import { Button } from "@/components/ui/button";

interface I_LoginFormProps {
  onSubmit: (values: T_LoginForm) => Promise<void> | void;
}

function LoginForm({ onSubmit }: I_LoginFormProps) {
  const form = useForm<T_LoginForm>({
    defaultValues: { username: "", password: "" },
    resolver: zodResolver(loginFormSchema),
    reValidateMode: "onChange",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name={E_LOGIN_FIELD_NAMES.USERNAME}
            disabled={form.formState.isSubmitting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="leading-loose text-foreground">
                  Username
                </FormLabel>
                <FormControl ref={field.ref}>
                  <Input className="h-9 py-1" placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={E_LOGIN_FIELD_NAMES.PASSWORD}
            disabled={form.formState.isSubmitting}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="leading-loose text-foreground">
                  Password
                </FormLabel>
                <FormControl ref={field.ref}>
                  <Input
                    type="password"
                    placeholder="********"
                    className="h-9 py-1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          isLoading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          type="submit"
          className="w-full cursor-pointer"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
