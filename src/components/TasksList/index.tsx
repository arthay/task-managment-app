import { useCallback, useState } from "react";
import useTasksQuery from "@/api/hooks/queries/useTasksQuery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import type { I_Task } from "@/types/entities/task";
import { useForm } from "react-hook-form";
import {
  taskFormSchema,
  type T_TaskForm,
} from "@/components/common/forms/TaskForm/validation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmModal from "@/components/common/ConfirmModal";
import { toast } from "sonner";
import { E_TASK_PRIORITY, E_TASK_STATUS } from "@/types/enums/task";
import { useParams } from "react-router-dom";
import useDeleteTaskMutation from "@/api/hooks/mutations/useDeleteTaskMutation";
import TaskModal from "@/components/common/TaskModal";
import useLoadMoreEntities from "@/hooks/useLoadMoreEntities";
import TaskItem from "@/components/TaskItem";

const taskDefaultValues = {
  title: "",
  description: "",
  status: E_TASK_STATUS.PENDING,
  priority: E_TASK_PRIORITY.LOW,
  date: new Date(),
};

function TasksList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<I_Task["id"]>("");
  const [deleteTaskId, setDeleteTaskId] = useState<I_Task["id"]>("");
  const [selectedStatus, setSelectedStatus] = useState<
    E_TASK_STATUS | undefined
  >();
  const [selectedPriority, setSelectedPriority] = useState<
    E_TASK_PRIORITY | undefined
  >();

  const { projectId } = useParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useTasksQuery({
      projectId: projectId || "",
      status: selectedStatus,
      priority: selectedPriority,
    });
  const { mutateAsync: deleteTask, isPending: isPendingDeleteTask } =
    useDeleteTaskMutation();

  const taskForm = useForm<T_TaskForm>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: taskDefaultValues,
    reValidateMode: "onChange",
  });

  const handleCloseTaskModal = () => {
    setIsModalOpen(false);
    setEditTaskId("");
    taskForm.reset(taskDefaultValues);
  };

  const handleCloseDeleteTaskModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setDeleteTaskId("");
  }, []);

  const lastTaskRef = useLoadMoreEntities(
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  );

  const handleEditTaskClick = (id: I_Task["id"]) => {
    setEditTaskId(id);
    const task = data?.tasks.find((task) => task.id === id);
    taskForm.reset({
      title: task?.title || taskDefaultValues.title,
      date: new Date(task?.date || ""),
    });
    setIsModalOpen(true);
  };

  const handleDeleteTaskClick = (id: I_Task["id"]) => {
    setDeleteTaskId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteTaskConfirm = async () => {
    try {
      if (!deleteTaskId) {
        return;
      }

      await deleteTask(deleteTaskId);
      handleCloseDeleteTaskModal();
      toast("Task has been deleted successfully.");
    } catch {
      toast("Something went wrong.");
    }
  };

  return (
    <>
      <TaskModal
        isOpen={isModalOpen}
        editTaskId={editTaskId}
        projectId={projectId || ""}
        form={taskForm}
        onOpenChange={handleCloseTaskModal}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={handleCloseDeleteTaskModal}
        onConfirm={handleDeleteTaskConfirm}
        isLoading={isPendingDeleteTask}
        title="Are you sure?"
        description="You’re going to to permanently delete the selected task."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />
      <div className="p-4 flex flex-col gap-4 h-full">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold mb-4">Tasks List</h1>
          <Button
            className="cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Create Task
          </Button>
        </div>
        <div className="flex flex-col gap-2 flex-1 min-h-0">
          <div className="flex gap-2">
            <Select
              onValueChange={(value) =>
                setSelectedPriority(value as E_TASK_PRIORITY)
              }
            >
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Statuses</SelectLabel>
                  <SelectItem
                    className="cursor-pointer"
                    value={E_TASK_PRIORITY.LOW}
                  >
                    {E_TASK_PRIORITY.LOW}
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer"
                    value={E_TASK_PRIORITY.MEDIUM}
                  >
                    {E_TASK_PRIORITY.MEDIUM}
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer"
                    value={E_TASK_PRIORITY.HIGH}
                  >
                    {E_TASK_PRIORITY.HIGH}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) =>
                setSelectedStatus(value as E_TASK_STATUS)
              }
            >
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Priorities</SelectLabel>
                  <SelectItem
                    className="cursor-pointer"
                    value={E_TASK_STATUS.PENDING}
                  >
                    {E_TASK_STATUS.PENDING}
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer"
                    value={E_TASK_STATUS.IN_PROGRESS}
                  >
                    {E_TASK_STATUS.IN_PROGRESS}
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer"
                    value={E_TASK_STATUS.COMPLETED}
                  >
                    {E_TASK_STATUS.COMPLETED}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {isPending ? (
            <div className="w-full flex justify-center">
              <Loader />
            </div>
          ) : !data?.tasks?.length ? (
            <div>There are no tasks yet.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {data.tasks.map((task, index) => {
                const ref =
                  data.tasks.length === index + 1 ? lastTaskRef : undefined;
                return (
                  <TaskItem
                    key={task.id}
                    task={task}
                    ref={ref}
                    onEditClick={handleEditTaskClick}
                    onDeleteClick={handleDeleteTaskClick}
                  />
                );
              })}
            </div>
          )}
        </div>

        {isFetchingNextPage && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}

export default TasksList;
