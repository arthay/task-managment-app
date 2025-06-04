import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export default taskSlice;
