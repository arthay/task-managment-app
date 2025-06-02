import type { I_Project } from "@/types/entities/project";
import type { I_ListResponse, I_QueryParams } from "@/types/api/general";
import { E_TASK_PRIORITY, type E_TASK_STATUS } from "@/types/enums/task";

export type T_ProjectsListResponse = I_ListResponse<I_Project>;

export interface I_TasksListRequestParams extends I_QueryParams {
  projectId: I_Project["id"];
  status?: E_TASK_STATUS;
  priority?: E_TASK_PRIORITY;
}
