import { createAsyncThunk } from "@reduxjs/toolkit";
import type { I_ListResponse } from "@/types/api/general";
import taskApiService from "@/api/services/TaskApiService";
import type { I_Task } from "@/types/entities/task";
import type { I_TasksListRequestParams } from "@/types/api/task";

const fetchTasks = createAsyncThunk<
  I_ListResponse<I_Task>,
  I_TasksListRequestParams
>(
  "tasks/fetchTasks",
  async ({
    page = 1,
    pageSize = 10,
    projectId,
    status,
    priority,
    sortBy,
    sortOrder,
  }) => {
    const data = await taskApiService.getEntitiesListByProjectId({
      page,
      pageSize,
      projectId,
      status,
      priority,
      sortBy,
      sortOrder,
    });

    return data;
  },
);

const fetchNextPageTasks = createAsyncThunk<
  I_ListResponse<I_Task>,
  I_TasksListRequestParams
>(
  "tasks/fetchNextTasks",
  async ({
    page = 1,
    pageSize = 10,
    projectId,
    status,
    priority,
    sortBy,
    sortOrder,
  }) => {
    const data = await taskApiService.getEntitiesListByProjectId({
      page,
      pageSize,
      projectId,
      status,
      priority,
      sortOrder,
      sortBy,
    });

    return data;
  },
);

const createTask = createAsyncThunk<I_Task, Omit<I_Task, "id">>(
  "tasks/createTask",
  async (data) => {
    const entity = await taskApiService.createEntity<I_Task>(data);

    return entity;
  },
);

const updateTask = createAsyncThunk<I_Task, I_Task>(
  "tasks/updateTask",
  async (data) => {
    const entity = await taskApiService.updateEntity<I_Task>(data);

    return entity;
  },
);

const deleteTask = createAsyncThunk<I_Task["id"], I_Task["id"]>(
  "tasks/deleteTask",
  async (id) => {
    await taskApiService.deleteEntity(id);

    return id;
  },
);

export { fetchTasks, fetchNextPageTasks, createTask, updateTask, deleteTask };
