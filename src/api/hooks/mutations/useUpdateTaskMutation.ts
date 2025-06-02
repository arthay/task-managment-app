import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { I_Task } from "@/types/entities/task";
import { TASKS_LIST_QUERY_KEY } from "@/api/hooks/queries/constants";
import taskService from "@/api/services/TaskService";

const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: I_Task) => taskService.updateEntity<I_Task>(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_LIST_QUERY_KEY] });
    },
  });
};

export default useUpdateTaskMutation;
