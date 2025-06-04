import { createAsyncThunk } from "@reduxjs/toolkit";
import type { I_ListResponse, I_QueryParams } from "@/types/api/general";
import projectApiService from "@/api/services/ProjectApiService";
import type { I_Project } from "@/types/entities/project";

const fetchProjects = createAsyncThunk<
  I_ListResponse<I_Project>,
  I_QueryParams
>("projects/fetchProjects", async ({ page = 1, pageSize = 10 }) => {
  const data = await projectApiService.getEntities<I_Project>({
    page,
    pageSize,
  });

  return data;
});

const fetchNextPageProjects = createAsyncThunk<
  I_ListResponse<I_Project>,
  I_QueryParams
>("projects/fetchNextProjects", async ({ page = 1, pageSize = 10 }) => {
  const data = await projectApiService.getEntities<I_Project>({
    page,
    pageSize,
  });

  return data;
});

const createProject = createAsyncThunk<I_Project, Omit<I_Project, "id">>(
  "projects/createProject",
  async (data) => {
    const entity = await projectApiService.createEntity<I_Project>(data);

    return entity;
  },
);

const updateProject = createAsyncThunk<I_Project, I_Project>(
  "projects/updateProject",
  async (data) => {
    const entity = await projectApiService.updateEntity<I_Project>(data);

    return entity;
  },
);

const deleteProject = createAsyncThunk<I_Project["id"], I_Project["id"]>(
  "projects/deleteProject",
  async (id) => {
    await projectApiService.deleteEntity(id);

    return id;
  },
);

export {
  fetchProjects,
  fetchNextPageProjects,
  createProject,
  updateProject,
  deleteProject,
};
