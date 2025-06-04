import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { I_Task } from "@/types/entities/task";
import { TASKS_LIST_QUERY_KEY } from "@/api/hooks/queries/constants";
import taskApiService from "@/api/services/TaskApiService";

const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: I_Task["id"]) => taskApiService.deleteEntity<I_Task>(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_LIST_QUERY_KEY] });
    },
  });
};

export default useDeleteTaskMutation;
