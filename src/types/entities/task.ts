import { type E_TASK_PRIORITY, E_TASK_STATUS } from "@/types/enums/task";
import type { I_Project } from "@/types/entities/project";

export interface I_Task {
  id: string;
  projectId: I_Project["id"];
  title: string;
  description?: string;
  priority: E_TASK_PRIORITY;
  status: E_TASK_STATUS;
  date: string;
}
