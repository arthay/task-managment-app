import type { I_TaskStore } from "@/types/store/task";

const initialState: I_TaskStore = {
  entities: [],
  hasNextPage: false,
  isCreatePending: false,
  isUpdatePending: false,
  isDeletePending: false,
  isFetchPending: false,
  isFetchingNextPage: false,
};

export default initialState;
