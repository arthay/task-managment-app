import { updateProject } from "@/store/project/asyncActions";
import useMutation from "./useMutation";
import { getProjectIsUpdatePending } from "@/store/selectors/project";
import type { I_Project } from "@/types/entities/project";
import useAppDispatch from "@/hooks/useAppDispatch";

const useUpdateProjectMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (project: I_Project) => {
      return dispatch(updateProject(project)).unwrap();
    },
    getIsPending: getProjectIsUpdatePending,
  });
};

export default useUpdateProjectMutation;
