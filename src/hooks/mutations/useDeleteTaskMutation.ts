import { deleteTask } from "@/store/task/asyncActions";
import { getTaskIsDeletePending } from "@/store/selectors/task";
import type { I_Task } from "@/types/entities/task";
import useMutation from "./useMutation";
import useAppDispatch from "@/hooks/useAppDispatch";

const useDeleteTaskMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (id: I_Task["id"]) => {
      return dispatch(deleteTask(id)).unwrap();
    },
    getIsPending: getTaskIsDeletePending,
  });
};

export default useDeleteTaskMutation;
