import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../globals";

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (values, { rejectWithValue }) => {
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };
      const { data } = await axios.post(`${API}/tasks/addTask`, config, values);
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
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.tasks = payload;
      })
      .addCase(addTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
