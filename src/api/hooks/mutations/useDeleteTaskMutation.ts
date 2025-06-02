import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { I_Task } from "@/types/entities/task";
import { TASKS_LIST_QUERY_KEY } from "@/api/hooks/queries/constants";
import taskService from "@/api/services/TaskService";

const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: I_Task["id"]) => taskService.deleteEntity<I_Task>(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_LIST_QUERY_KEY] });
    },
  });
};

export default useDeleteTaskMutation;
