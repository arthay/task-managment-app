import { useInfiniteQuery } from "@tanstack/react-query";

import { PROJECTS_LIST_QUERY_KEY } from "./constants";
import projectService from "@/api/services/ProjectService";
import type { I_Project } from "@/types/entities/project";
import type { I_QueryParams } from "@/types/api/general";

const useProjectsQuery = ({ page = 1, pageSize = 10 }: I_QueryParams) => {
  const queryData = useInfiniteQuery({
    queryKey: [PROJECTS_LIST_QUERY_KEY],
    queryFn: ({ pageParam }) =>
      projectService.getEntities<I_Project>({ page: pageParam, pageSize }),
    initialPageParam: page,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.paginatorInfo.hasNextPage
        ? lastPage.paginatorInfo.page + 1
        : undefined,
  });

  return {
    ...queryData,
    data: {
      ...queryData.data,
      projects:
        queryData.data?.pages.flatMap((item) => item?.entities || []) || [],
    },
  };
};

export default useProjectsQuery;
