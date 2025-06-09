import { useCallback } from "react";
import { format } from "date-fns";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import Modal from "@/components/common/Modal";
import TaskForm from "@/components/common/forms/TaskForm";

import type { T_TaskForm } from "@/components/common/forms/TaskForm/validation.schema";
import useCreateTaskMutation from "@/hooks/mutations/useCreateTaskMutation";
import useUpdateTaskMutation from "@/hooks/mutations/useUpdateTaskMutation";
import type { I_Task } from "@/types/entities/task";
import type { I_Project } from "@/types/entities/project";

interface I_TaskModalProps {
  isOpen: boolean;
  editTaskId: string;
  form: UseFormReturn<T_TaskForm>;
  projectId: I_Project["id"];
  onOpenChange: () => void;
}

function TaskModal({
  projectId,
  isOpen,
  onOpenChange,
  editTaskId,
  form,
}: I_TaskModalProps) {
  const { mutateAsync: createTask, isPending: isPendingCreateTask } =
    useCreateTaskMutation();
  const { mutateAsync: updateTask, isPending: isPendingUpdateTask } =
    useUpdateTaskMutation();

  const handleFormSubmit = useCallback(
    async (values: T_TaskForm) => {
      try {
        const data = {
          ...values,
          ...("date" in values && { date: format(values.date, "dd-MM-yyyy") }),
        } as I_Task;

        if (editTaskId) {
          await updateTask({ ...data, id: editTaskId });
          toast("Task has been updated successfully.");
          onOpenChange();

          return;
        }

        await createTask({ ...data, projectId });
        toast("Task has been created successfully.");

        onOpenChange();
      } catch {
        toast("Something went wrong.");
      }
    },
    [createTask, editTaskId, onOpenChange, updateTask, projectId],
  );

  return (
    <Modal
      open={isOpen}
      onClose={onOpenChange}
      title={`${editTaskId ? "Edit" : "Create"} Task`}
    >
      <TaskForm
        form={form}
        isLoading={isPendingCreateTask || isPendingUpdateTask}
        onSubmit={handleFormSubmit}
      />
    </Modal>
  );
}

export default TaskModal;
