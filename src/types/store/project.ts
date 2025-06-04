import type { I_Project } from "@/types/entities/project";

export interface I_ProjectStore {
  entities: I_Project[];
  hasNextPage: boolean;
  isFetchPending: boolean;
  isCreatePending: boolean;
  isUpdatePending: boolean;
  isDeletePending: boolean;
  isFetchingNextPage: boolean;
}
