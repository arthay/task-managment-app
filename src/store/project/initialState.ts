import type { I_ProjectStore } from "@/types/store/project";

const initialState: I_ProjectStore = {
  entities: [],
  hasNextPage: false,
  isCreatePending: false,
  isUpdatePending: false,
  isDeletePending: false,
  isFetchPending: false,
  isFetchingNextPage: false,
};

export default initialState;
