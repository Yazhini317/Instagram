import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
const savedFromWeb=JSON.parse(localStorage.getItem('saved')) || [];
const SavedSlice = createSlice({
    name:"saved",
    initialState:savedFromWeb,
    reducers:{
        addSaved(state,action){
                state.push(action.payload)
                localStorage.setItem('saved',JSON.stringify([...state]))
        },
        removeSaved(state,action){
                const removeSave=state.filter((states)=>states.id !== action.payload)
                localStorage.setItem('saved',JSON.stringify([...removeSave]))
                return removeSave;
            }
    }
}) 

export default SavedSlice.reducer;
export const {addSaved,removeSaved}=SavedSlice.actions