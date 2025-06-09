import { updateTask } from "@/store/task/asyncActions";
import useMutation from "./useMutation";
import { getTaskIsUpdatePending } from "@/store/selectors/task";
import type { I_Task } from "@/types/entities/task";
import useAppDispatch from "@/hooks/useAppDispatch";

const useUpdateTaskMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (task: I_Task) => {
      return dispatch(updateTask(task)).unwrap();
    },
    getIsPending: getTaskIsUpdatePending,
  });
};

export default useUpdateTaskMutation;
