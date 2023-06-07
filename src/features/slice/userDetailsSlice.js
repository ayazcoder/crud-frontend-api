import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

export const createUser = createAsyncThunk("createUser", async (data) => {
  const res = await fetch("http://localhost:3001/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
    return isRejectedWithValue(err);
  }
});

// Update data
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { isRejectedWithValue }) => {
    // console.log("Updated Data:", data)
    const { _id } = data;
    // console.log("========================================")
    // console.log(_id)
    // console.log("========================================")
    const res = await fetch(
      `http://localhost:3001/products/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await res.json();
      console.log("=============Updated data in API===========", result);
      return result;
    } catch (err) {
      console.log("-----------Error--------:", err);
      return isRejectedWithValue(err);
    }
  }
);

// Show user
export const showUser = createAsyncThunk(
  "showUser",
  async (args, { isRejectedWithValue }) => {
    const res = await fetch("http://localhost:3001/products");
    try {
      const result = await res.json();
      console.log("get result", result);
      return result;
    } catch (err) {
      console.log(err);
      return isRejectedWithValue(err);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (_id, { isRejectedWithValue }) => {
    const res = await fetch(
      `http://localhost:3001/products/${_id}`,
      { method: "DELETE" }
    );
    try {
      const result = await res.json();
      //  return   console.log("=============data===========",result)
      return result;
    } catch (err) {
      console.log(err);
      return isRejectedWithValue(err);
    }
  }
);
export const userDetails = createSlice({
  name: "userDetails",
  initialState: {
    users: [],
    loading: false,
    error: null,
    handleFetch: false,
    searchData: [],
  },

  reducers: {
    // ================Search User
    searchUser: (state, action) => {
      state.searchData = action.payload;
      console.log(action.payload);
    },

    setHandleFetch: (state, action) => {
      state.handleFetch = action.payload;
    },
  },

  extraReducers: {
    // Create User
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.users = action.payload.message;
    },
    // ========================== show user
    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [showUser.rejected]: (state, action) => {
      state.loading = false;
      state.users = action.payload.message;
    },
    // ========================== delete user
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.handleFetch = !state.handleFetch;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      // const {id} = action.payload
      // if(id){
      //   state.users = state.users.filter((ele)=>ele.id != id);
      //   return state.users
      // }
      state.users = action.payload;
    },

    // update User
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      // state.users.push(action.payload)
      state.users = state.users.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.users = action.payload.message;
    },
  },
});

// export const { } = userDetailsSlice.actions
export default userDetails.reducer;
export const { searchUser, setHandleFetch } = userDetails.actions;
