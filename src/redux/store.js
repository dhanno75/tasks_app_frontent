import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/UserSlice";
import TaskSlice from "./features/TaskSlice";
import ListSlice from "./features/ListSlice";

export default configureStore({
  reducer: {
    user: UserSlice,
    list: ListSlice,
    task: TaskSlice,
  },
});
