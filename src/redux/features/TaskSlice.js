import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../globals";

export const addTasks = createAsyncThunk(
  "tasks/addTask",
  async (values, { rejectWithValue }) => {
    try {
      console.log(values.vals);
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };
      const { data } = await axios.post(
        `${API}/lists/${values.listId}/tasks`,
        config,
        values.vals
      );
      console.log(data);
      return data;
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (values, { rejectWithValue }) => {
    console.log(values);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };

      const { data } = await axios.get(
        `${API}/lists/${values.listId}/tasks`,
        config
      );

      return data;
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const TaskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    tasksInfo: null,
    error: null,
    success: false,
  },
  reducers: {
    clearSomeState: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTasks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.tasks = payload;
      })
      .addCase(addTasks.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.error = payload;
      })
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.success = true;
        state.tasks = payload.data;
        state.tasksInfo = payload;
      })
      .addCase(getTasks.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearSomeState } = TaskSlice.actions;
export default TaskSlice.reducer;
