import type { I_Task, T_TaskSortBy } from "@/types/entities/task";
import type {
  I_ListResponse,
  I_QueryParams,
  T_SortOrder,
} from "@/types/api/general";
import type { I_Project } from "@/types/entities/project";
import { E_TASK_PRIORITY, type E_TASK_STATUS } from "@/types/enums/task";

export type T_TasksListResponse = I_ListResponse<I_Task>;

export interface I_TasksListRequestParams extends I_QueryParams {
  projectId: I_Project["id"];
  status?: E_TASK_STATUS;
  priority?: E_TASK_PRIORITY;
  sortBy?: T_TaskSortBy;
  sortOrder?: T_SortOrder;
}
