import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../globals";

export const addingList = createAsyncThunk(
  "lists/addingList",
  async (values, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/lists/addList`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
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

export const updatingList = createAsyncThunk(
  "lists/updatingList",
  async (values, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/lists/updateList/${values.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
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
      .addCase(addingList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addingList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.lists.push(payload.data);
      })
      .addCase(addingList.rejected, (state, { payload }) => {
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
        state.lists = payload.result;
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
