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
import type { T_TaskForm } from "./validation.schema";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  E_TASK_FIELD_NAMES,
  E_TASK_PRIORITY,
  E_TASK_STATUS,
} from "@/types/enums/task";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface I_TaskFormProps {
  form: UseFormReturn<T_TaskForm>;
  isLoading: boolean;
  onSubmit: (values: T_TaskForm) => Promise<void>;
}

function TaskForm({ form, isLoading, onSubmit }: I_TaskFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5 md:gap-4 w-full">
            <FormField
              control={form.control}
              name={E_TASK_FIELD_NAMES.TITLE}
              disabled={isLoading}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="leading-loose text-foreground">
                    Title
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
              name={E_TASK_FIELD_NAMES.DESCRIPTION}
              disabled={isLoading}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="leading-loose text-foreground">
                    Description
                  </FormLabel>
                  <FormControl ref={field.ref}>
                    <Textarea
                      className="h-9 py-1"
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={E_TASK_FIELD_NAMES.PRIORITY}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={E_TASK_PRIORITY.LOW}>
                        {E_TASK_PRIORITY.LOW}
                      </SelectItem>
                      <SelectItem value={E_TASK_PRIORITY.MEDIUM}>
                        {E_TASK_PRIORITY.MEDIUM}
                      </SelectItem>
                      <SelectItem value={E_TASK_PRIORITY.HIGH}>
                        {E_TASK_PRIORITY.HIGH}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={E_TASK_FIELD_NAMES.STATUS}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={E_TASK_STATUS.PENDING}>
                        {E_TASK_STATUS.PENDING}
                      </SelectItem>
                      <SelectItem value={E_TASK_STATUS.IN_PROGRESS}>
                        {E_TASK_STATUS.IN_PROGRESS}
                      </SelectItem>
                      <SelectItem value={E_TASK_STATUS.COMPLETED}>
                        {E_TASK_STATUS.COMPLETED}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={E_TASK_FIELD_NAMES.DATE}
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
                            format(field.value, "dd-MM-yyyy")
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

export default TaskForm;
