import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import {
  createProject,
  deleteProject,
  fetchNextPageProjects,
  fetchProjects,
  updateProject,
} from "@/store/project/asyncActions";

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteProject.pending, (state) => {
      state.isDeletePending = true;
    });
    builder.addCase(createProject.pending, (state) => {
      state.isCreatePending = true;
    });
    builder.addCase(updateProject.pending, (state) => {
      state.isUpdatePending = true;
    });
    builder.addCase(fetchProjects.pending, (state) => {
      state.isFetchPending = true;
    });
    builder.addCase(fetchNextPageProjects.pending, (state) => {
      state.isFetchingNextPage = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, { payload }) => {
      state.entities = payload.entities;
      state.isFetchPending = false;
      state.hasNextPage = payload.paginatorInfo.hasNextPage;
    });
    builder.addCase(fetchNextPageProjects.fulfilled, (state, { payload }) => {
      state.entities = [...state.entities, ...payload.entities];
      state.isFetchingNextPage = false;
      state.hasNextPage = payload.paginatorInfo.hasNextPage;
    });
    builder.addCase(createProject.fulfilled, (state, { payload }) => {
      state.entities = [payload, ...state.entities];
      state.isCreatePending = false;
    });
    builder.addCase(updateProject.fulfilled, (state, { payload }) => {
      const entityIndex = state.entities.findIndex(
        (entity) => entity.id === payload.id,
      );

      state.entities[entityIndex] = {
        ...state.entities[entityIndex],
        ...payload,
      };
      state.isUpdatePending = false;
    });
    builder.addCase(deleteProject.fulfilled, (state, { payload }) => {
      state.entities = state.entities.filter((entity) => entity.id !== payload);

      state.isDeletePending = false;
    });
  },
});

export default projectSlice;
