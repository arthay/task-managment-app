import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import {
  createTask,
  deleteTask,
  fetchNextPageTasks,
  fetchTasks,
  updateTask,
} from "./asyncActions";

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    resetState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteTask.pending, (state) => {
      state.isDeletePending = true;
    });
    builder.addCase(createTask.pending, (state) => {
      state.isCreatePending = true;
    });
    builder.addCase(updateTask.pending, (state) => {
      state.isUpdatePending = true;
    });
    builder.addCase(fetchTasks.pending, (state) => {
      state.isFetchPending = true;
    });
    builder.addCase(fetchNextPageTasks.pending, (state) => {
      state.isFetchingNextPage = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, { payload }) => {
      state.entities = payload.entities;
      state.isFetchPending = false;
      state.hasNextPage = payload.paginatorInfo.hasNextPage;
    });
    builder.addCase(fetchNextPageTasks.fulfilled, (state, { payload }) => {
      state.entities = [...state.entities, ...payload.entities];
      state.isFetchingNextPage = false;
      state.hasNextPage = payload.paginatorInfo.hasNextPage;
    });
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.entities = [payload, ...state.entities];
      state.isCreatePending = false;
    });
    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      const entityIndex = state.entities.findIndex(
        (entity) => entity.id === payload.id,
      );

      state.entities[entityIndex] = {
        ...state.entities[entityIndex],
        ...payload,
      };
      state.isUpdatePending = false;
    });
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      state.entities = state.entities.filter((entity) => entity.id !== payload);

      state.isDeletePending = false;
    });
    builder.addCase(fetchTasks.rejected, (state, { error }) => {
      state.error = error as Error;
      state.isFetchPending = false;
    });
    builder.addCase(fetchNextPageTasks.rejected, (state, { error }) => {
      state.error = error as Error;
      state.isFetchingNextPage = false;
    });
    builder.addCase(createTask.rejected, (state, { error }) => {
      state.error = error as Error;
      state.isCreatePending = false;
    });
    builder.addCase(updateTask.rejected, (state, { error }) => {
      state.error = error as Error;
      state.isUpdatePending = false;
    });
    builder.addCase(deleteTask.rejected, (state, { error }) => {
      state.error = error as Error;
      state.isDeletePending = false;
    });
  },
});

export default taskSlice;
