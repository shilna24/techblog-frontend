import {createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";


//create commnt

export const createCommentAction = createAsyncThunk("comment/create",async(comment,{rejectWithValue,getState,dispatch})=>{
    //get user token
    
    const user = getState()?.users;
    const { userAuth } = user;
    // console.log(userAuth?.token);
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
        const { data}= await axios.post(`${baseUrl}/api/comments`,
        {
             description:comment?.description,
             postId:comment?.postId,
    
        },
        config
        );
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
    
    }
    );


    //Slices-------------------------
    const commentSlices = createSlice({
        name:"comment",
        initialState:{},
        extraReducers:(builder)=>{
        // create comment
        builder.addCase(createCommentAction.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(createCommentAction.fulfilled,(state,action)=>{
            state.commentCreated = action?.payload;
            state.loading = false;
            //state.isCreated = true;
            state.appErr =undefined;
            state.serverErr =undefined;
        })
        builder.addCase(createCommentAction.rejected,(state,action)=>{
            state.loading = false;
            state.commentCreated=undefined;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message
        })
    }
    })
    export default commentSlices.reducer;