import { useState } from "react";
import useTasksQuery from "@/hooks/queries/useTasksQuery";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import type { I_Task, T_TaskSortBy } from "@/types/entities/task";
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
import useDeleteTaskMutation from "@/hooks/mutations/useDeleteTaskMutation";
import TaskModal from "@/components/common/TaskModal";
import useLoadMoreEntities from "@/hooks/useLoadMoreEntities";
import TaskItem from "@/components/TaskItem";
import Dropdown from "@/components/common/Dropdown";
import {
  TASK_PRIORITY_FILTER_OPTIONS,
  TASK_SORT_BY_OPTIONS,
  TASK_SORT_ORDER_OPTIONS,
  TASK_STATUS_FILTER_OPTIONS,
} from "@/components/TasksList/constants";
import { Trash } from "lucide-react";
import type { T_SortOrder } from "@/types/api/general";
import useUnauthorize from "@/hooks/useUnauthorize";

interface I_FilterState {
  priority?: E_TASK_PRIORITY;
  status?: E_TASK_STATUS;
}

interface I_SortState {
  by?: T_TaskSortBy;
  order?: T_SortOrder;
}

const taskDefaultValues = {
  title: "",
  description: "",
  status: E_TASK_STATUS.PENDING,
  priority: E_TASK_PRIORITY.LOW,
  date: new Date(),
};

function TasksList() {
  const [filters, setFilters] = useState<I_FilterState>({});
  const [sorting, setSorting] = useState<I_SortState>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<I_Task["id"]>("");
  const [deleteTaskId, setDeleteTaskId] = useState<I_Task["id"]>("");

  const { projectId } = useParams();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error,
  } = useTasksQuery({
    projectId: projectId || "",
    status: filters.status,
    priority: filters.priority,
    sortBy: sorting.by,
    sortOrder: sorting.order,
  });
  const { mutateAsync: deleteTask, isPending: isPendingDeleteTask } =
    useDeleteTaskMutation();

  const taskForm = useForm<T_TaskForm>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: taskDefaultValues,
    reValidateMode: "onChange",
  });

  const lastTaskRef = useLoadMoreEntities(
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  );

  useUnauthorize(error);

  const handleCloseTaskModal = () => {
    setIsModalOpen(false);
    setEditTaskId("");
    taskForm.reset(taskDefaultValues);
  };

  const handleCloseDeleteTaskModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteTaskId("");
  };

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

  const handleFilterChange = (
    key: keyof I_FilterState,
    value: E_TASK_PRIORITY | E_TASK_STATUS,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSortingChange = (
    key: keyof I_SortState,
    value: I_SortState["by"] | I_SortState["order"],
  ) => {
    setSorting((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilter = () => {
    setFilters({});
  };

  const handleResetSorting = () => {
    setSorting({});
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
            <Dropdown
              placeholder="Filter by priority"
              value={filters.priority}
              defaultValue={filters.priority}
              options={TASK_PRIORITY_FILTER_OPTIONS}
              onValueChange={(value) =>
                handleFilterChange("priority", value as E_TASK_PRIORITY)
              }
            />
            <Dropdown
              placeholder="Filter by status"
              value={filters.status}
              defaultValue={filters.status}
              onValueChange={(value) =>
                handleFilterChange("status", value as E_TASK_STATUS)
              }
              options={TASK_STATUS_FILTER_OPTIONS}
            />
            <Button
              disabled={!filters.priority && !filters.status}
              className="cursor-pointer"
              onClick={handleResetFilter}
            >
              <Trash />
            </Button>
          </div>
          <div className="flex gap-2">
            <Dropdown
              placeholder="Sort By"
              value={sorting.by}
              options={TASK_SORT_BY_OPTIONS}
              onValueChange={(value) =>
                handleSortingChange("by", value as I_SortState["by"])
              }
            />
            <Dropdown
              placeholder="Sort Order"
              disabled={!sorting.by}
              value={sorting.order}
              onValueChange={(value) =>
                handleSortingChange("order", value as I_SortState["order"])
              }
              options={TASK_SORT_ORDER_OPTIONS}
            />
            <Button
              disabled={!sorting.order && !sorting.by}
              className="cursor-pointer"
              onClick={handleResetSorting}
            >
              <Trash />
            </Button>
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
