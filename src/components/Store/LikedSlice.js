import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
const likeFromWeb=JSON.parse(localStorage.getItem('likedSlice')) || [];
const LikedSlice = createSlice({
 name : "likedslice",
 initialState:likeFromWeb,
 reducers:{
    addLike(state,action){
        state.push(action.payload)
        localStorage.setItem('likedSlice',JSON.stringify([...state]))
    },
    removeLike(state,action){
        const removedLike = state.filter((state)=>state.id !== action.payload)
        localStorage.setItem('likedSlice',JSON.stringify([...removedLike]))
        return removedLike
    }
 }
}) 


export default LikedSlice.reducer;
export const {addLike,removeLike} = LikedSlice.actions