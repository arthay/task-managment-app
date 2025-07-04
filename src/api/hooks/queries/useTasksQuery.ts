import { useInfiniteQuery } from "@tanstack/react-query";

import { TASKS_LIST_QUERY_KEY } from "./constants";
import taskApiService from "@/api/services/TaskApiService";
import type { I_TasksListRequestParams } from "@/types/api/task";

const useTasksQuery = ({
  page = 1,
  pageSize = 10,
  projectId,
  status,
  priority,
}: I_TasksListRequestParams) => {
  const queryData = useInfiniteQuery({
    queryKey: [TASKS_LIST_QUERY_KEY, pageSize, projectId, status, priority],
    queryFn: ({ pageParam }) =>
      taskApiService.getEntitiesListByProjectId({
        page: pageParam,
        pageSize,
        status,
        priority,
        projectId,
      }),
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
      tasks:
        queryData.data?.pages.flatMap((item) => item?.entities || []) || [],
    },
  };
};

export default useTasksQuery;
