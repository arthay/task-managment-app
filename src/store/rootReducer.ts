import { combineReducers } from "@reduxjs/toolkit";

import projectSlice from "./project";
import taskSlice from "./task";

const reducer = combineReducers({
  project: projectSlice.reducer,
  task: taskSlice.reducer,
});

export default reducer;
