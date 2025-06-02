import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PROJECTS_LIST_QUERY_KEY } from "@/api/hooks/queries/constants";
import type { I_Project } from "@/types/entities/project";
import projectService from "@/api/services/ProjectService";

const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: Omit<I_Project, "id">) =>
      projectService.createEntity<I_Project>(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_LIST_QUERY_KEY] });
    },
  });
};

export default useCreateProjectMutation;
