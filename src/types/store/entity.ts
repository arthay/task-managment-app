export interface I_EntityStory {
  hasNextPage: boolean;
  isFetchPending: boolean;
  isCreatePending: boolean;
  isUpdatePending: boolean;
  isDeletePending: boolean;
  isFetchingNextPage: boolean;
  error?: Error;
}
