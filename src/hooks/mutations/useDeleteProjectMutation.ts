import { deleteProject } from "@/store/project/asyncActions";
import { getProjectIsDeletePending } from "@/store/selectors/project";
import type { I_Project } from "@/types/entities/project";
import useMutation from "./useMutation";
import useAppDispatch from "@/hooks/useAppDispatch";

const useDeleteProjectMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (id: I_Project["id"]) => {
      return dispatch(deleteProject(id)).unwrap();
    },
    getIsPending: getProjectIsDeletePending,
  });
};

export default useDeleteProjectMutation;
