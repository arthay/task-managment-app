import { createProject } from "@/store/project/asyncActions";
import { getProjectIsCreatePending } from "@/store/selectors/project";
import type { I_Project } from "@/types/entities/project";
import useMutation from "./useMutation";
import useAppDispatch from "@/hooks/useAppDispatch";

const useCreateProjectMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (project: Omit<I_Project, "id">) => {
      return dispatch(createProject(project)).unwrap();
    },
    getIsPending: getProjectIsCreatePending,
  });
};

export default useCreateProjectMutation;
