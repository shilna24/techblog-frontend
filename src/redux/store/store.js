import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import adminReducer from "../slices/admin/adminSlices";
import categoriesReducer from "../slices/category/categorySlice";
import post from "../slices/posts/postSlices";
import comment from "../slices/comments/commentSlices";
import accountVerification from "../slices/accountVerification/accVerificationSlices";


const store = configureStore({
  reducer: {
    users: usersReducer,
    admin:adminReducer,
    category: categoriesReducer,
    post,
    comment,
    accountVerification,
  },
});

export default store;
