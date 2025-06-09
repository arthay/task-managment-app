import { createTask } from "@/store/task/asyncActions";
import { getTaskIsCreatePending } from "@/store/selectors/task";
import type { I_Task } from "@/types/entities/task";
import useMutation from "./useMutation";
import useAppDispatch from "@/hooks/useAppDispatch";

const useCreateTaskMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (task: Omit<I_Task, "id">) => {
      return dispatch(createTask(task)).unwrap();
    },
    getIsPending: getTaskIsCreatePending,
  });
};

export default useCreateTaskMutation;
