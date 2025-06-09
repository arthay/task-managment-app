import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  fetchProjects,
  fetchNextPageProjects,
} from "@/store/project/asyncActions";
import type { T_RootState } from "@/store/setup";
import {
  getProjectEntities,
  getProjectHasNextPage,
  getProjectIsFetchPending,
  getProjectIsFetchingNextPage,
  getProjectError,
} from "@/store/selectors/project";
import type { I_QueryParams } from "@/types/api/general";
import useAppDispatch from "@/hooks/useAppDispatch";

const PAGE_SIZE = 10;

const useProjectsQuery = ({
  page = 1,
  pageSize = PAGE_SIZE,
}: I_QueryParams) => {
  const dispatch = useAppDispatch();

  const { projects, hasNextPage, isFetchPending, isFetchingNextPage, error } =
    useSelector((state: T_RootState) => ({
      projects: getProjectEntities(state),
      hasNextPage: getProjectHasNextPage(state),
      isFetchPending: getProjectIsFetchPending(state),
      isFetchingNextPage: getProjectIsFetchingNextPage(state),
      error: getProjectError(state),
    }));

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProjects({ page, pageSize }));
    }
  }, [dispatch, page, pageSize, projects.length]);

  const fetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      const nextPage = Math.floor(projects.length / PAGE_SIZE) + 1;
      dispatch(fetchNextPageProjects({ page: nextPage, pageSize }));
    }
  }, [hasNextPage, isFetchingNextPage, projects.length, dispatch, pageSize]);

  return {
    data: { projects },
    isPending: isFetchPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  };
};

export default useProjectsQuery;
