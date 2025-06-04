import type { T_RootState } from "@/store/setup";

const getState = (state: T_RootState) => state;
export const getProjectState = (state: T_RootState) => getState(state).project;

export const getProjectEntities = (state: T_RootState) =>
  getProjectState(state).entities;
export const getProjectHasNextPage = (state: T_RootState) =>
  getProjectState(state).hasNextPage;
export const getProjectIsFetchPending = (state: T_RootState) =>
  getProjectState(state).isFetchPending;
export const getProjectIsCreatePending = (state: T_RootState) =>
  getProjectState(state).isCreatePending;
export const getProjectIsUpdatePending = (state: T_RootState) =>
  getProjectState(state).isUpdatePending;
export const getProjectIsDeletePending = (state: T_RootState) =>
  getProjectState(state).isDeletePending;
export const getProjectIsFetchingNextPage = (state: T_RootState) =>
  getProjectState(state).isFetchingNextPage;
