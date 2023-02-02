import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

//register action
// export const registerUserAction = createAsyncThunk(
//   "user/register",
//   async (user, { rejectWithValue, getState, dispatch }) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     //http call
//     try {
//       const { data } = await axios.post(
//         `${baseUrl}/api/users/register`,
//         user,
//         config
//       );
//       return data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

//Login
export const loginAdminAction = createAsyncThunk(
  "admin/login",
  async (adminData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //make http call
      const { data } = await axios.post(
        `${baseUrl}/api/admin/login`,
        adminData,
        config
      );
      //save user into local storage
      localStorage.setItem("adminInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Profile
// export const userProfileAction = createAsyncThunk(
//   "user/profile",
//   async (id, { rejectWithValue, getState, dispatch }) => {
//     //get user token
//     const user = getState()?.users;
//     const { userAuth } = user;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${userAuth?.token}`,
//       },
//     };
//     //http call
//     try {
//       const { data } = await axios.get(
//         `${baseUrl}/api/users/profile/${id}`,
//         config
//       );
//       return data;
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );


// //Logout action

export const logoutAction = createAsyncThunk(
  "/admin/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("adminInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get user from local storage and place into store
const adminLoginFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

//slices
const adminSlices = createSlice({
  name: "admin",
  initialState: {
    adminAuth: adminLoginFromStorage,
  },
  extraReducers: builder => {
    //login
    builder.addCase(loginAdminAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginAdminAction.fulfilled, (state, action) => {
      state.adminAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginAdminAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //Profile
    // builder.addCase(userProfileAction.pending, (state, action) => {
    //   state.loading = true;
    //   state.appErr = undefined;
    //   state.serverErr = undefined;
    // });
    // builder.addCase(userProfileAction.fulfilled, (state, action) => {
    //   state.profile = action?.payload;
    //   state.loading = false;
    //   state.appErr = undefined;
    //   state.serverErr = undefined;
    // });
    // builder.addCase(userProfileAction.rejected, (state, action) => {
    //   state.appErr = action?.payload?.message;
    //   state.serverErr = action?.error?.message;
    //   state.loading = false;
    // });
    //logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.adminAuth = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
  },
});

export default adminSlices.reducer;
