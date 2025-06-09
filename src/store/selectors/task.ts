import type { T_RootState } from "@/store/setup";

const getState = (state: T_RootState) => state;
export const getTaskState = (state: T_RootState) => getState(state).task;

export const getTaskEntities = (state: T_RootState) =>
  getTaskState(state).entities;
export const getTaskHasNextPage = (state: T_RootState) =>
  getTaskState(state).hasNextPage;
export const getTaskIsFetchPending = (state: T_RootState) =>
  getTaskState(state).isFetchPending;
export const getTaskIsCreatePending = (state: T_RootState) =>
  getTaskState(state).isCreatePending;
export const getTaskIsUpdatePending = (state: T_RootState) =>
  getTaskState(state).isUpdatePending;
export const getTaskIsDeletePending = (state: T_RootState) =>
  getTaskState(state).isDeletePending;
export const getTaskIsFetchingNextPage = (state: T_RootState) =>
  getTaskState(state).isFetchingNextPage;
export const getTaskError = (state: T_RootState) => getTaskState(state).error;
