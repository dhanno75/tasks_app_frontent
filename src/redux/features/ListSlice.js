import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../globals";

export const addList = createAsyncThunk(
  "lists/addList",
  async (values, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };
      const { data } = await axios.post(`${API}/lists/addList`, config, values);
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

export const getLists = createAsyncThunk(
  "tasks/getLists",
  async (values, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };

      const { data } = await axios.get(
        `${API}/lists/listsByUid/${values.userId}`,
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

const ListSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    loading: false,
    listsInfo: null,
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
      .addCase(addList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.lists = payload;
      })
      .addCase(addList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLists.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.lists = payload.data;
        state.listsInfo = payload;
      })
      .addCase(getLists.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearSomeState } = ListSlice.actions;
export default ListSlice.reducer;
