import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TASKS_LIST_QUERY_KEY } from "@/api/hooks/queries/constants";
import type { I_Task } from "@/types/entities/task";
import taskApiService from "@/api/services/TaskApiService";

const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Omit<I_Task, "id">) =>
      taskApiService.createEntity<I_Task>(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_LIST_QUERY_KEY] });
    },
  });
};

export default useCreateTaskMutation;
