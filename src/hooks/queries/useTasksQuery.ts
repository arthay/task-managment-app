import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { fetchTasks, fetchNextPageTasks } from "@/store/task/asyncActions";
import type { T_RootState } from "@/store/setup";
import {
  getTaskEntities,
  getTaskHasNextPage,
  getTaskIsFetchPending,
  getTaskIsFetchingNextPage,
  getTaskError,
} from "@/store/selectors/task";
import useAppDispatch from "@/hooks/useAppDispatch";
import type { I_TasksListRequestParams } from "@/types/api/task";
import taskSlice from "@/store/task";

const PAGE_SIZE = 10;

const useTasksQuery = ({
  page = 1,
  pageSize = PAGE_SIZE,
  projectId = "",
  status,
  priority,
  sortBy,
  sortOrder,
}: I_TasksListRequestParams) => {
  const dispatch = useAppDispatch();

  const { tasks, hasNextPage, isFetchPending, isFetchingNextPage, error } =
    useSelector((state: T_RootState) => ({
      tasks: getTaskEntities(state),
      hasNextPage: getTaskHasNextPage(state),
      isFetchPending: getTaskIsFetchPending(state),
      isFetchingNextPage: getTaskIsFetchingNextPage(state),
      error: getTaskError(state),
    }));

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks({ page, pageSize, projectId }));
    }

    return () => {
      dispatch(taskSlice.actions.resetState());
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const refetch = useCallback(() => {
    dispatch(
      fetchTasks({
        page,
        pageSize,
        projectId,
        status,
        priority,
        sortOrder,
        sortBy,
      }),
    );
  }, [
    dispatch,
    page,
    pageSize,
    projectId,
    status,
    priority,
    sortOrder,
    sortBy,
  ]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const fetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      const nextPage = Math.floor(tasks.length / PAGE_SIZE) + 1;
      dispatch(
        fetchNextPageTasks({
          page: nextPage,
          pageSize,
          projectId,
          status,
          priority,
          sortOrder,
          sortBy,
        }),
      );
    }
  }, [
    hasNextPage,
    isFetchingNextPage,
    tasks.length,
    dispatch,
    pageSize,
    projectId,
    status,
    priority,
    sortOrder,
    sortBy,
  ]);

  return {
    data: { tasks },
    isPending: isFetchPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    error,
  };
};

export default useTasksQuery;
