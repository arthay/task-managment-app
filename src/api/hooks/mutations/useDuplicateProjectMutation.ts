import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { I_Project } from "@/types/entities/project";
import { PROJECTS_LIST_QUERY_KEY } from "@/api/hooks/queries/constants";
import projectService from "@/api/services/ProjectService";

const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: I_Project["id"]) =>
      projectService.duplicateEntity<I_Project>(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_LIST_QUERY_KEY] });
    },
  });
};

export default useUpdateProjectMutation;
