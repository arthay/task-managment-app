import type { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import type { T_ProjectForm } from "./validation.schema";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { E_PROJECT_FIELD_NAMES } from "@/types/enums/project";

interface I_ProjectFormProps {
  form: UseFormReturn<T_ProjectForm>;
  isLoading: boolean;
  onSubmit: (values: T_ProjectForm) => Promise<void>;
}

function ProjectForm({ form, isLoading, onSubmit }: I_ProjectFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5 md:gap-4 w-full">
            <FormField
              control={form.control}
              name={E_PROJECT_FIELD_NAMES.NAME}
              disabled={isLoading}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="leading-loose text-foreground">
                    Name
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
              name={E_PROJECT_FIELD_NAMES.DATE}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal cursor-pointer",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button
              disabled={isLoading}
              variant="default"
              type="submit"
              className="w-full md:w-auto cursor-pointer"
              isLoading={isLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default ProjectForm;
