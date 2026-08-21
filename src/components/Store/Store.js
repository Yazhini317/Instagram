import React from 'react'
import {configureStore} from '@reduxjs/toolkit'
import savedReducer from './SavedSlice'
import likedReducer from './LikedSlice'
const Store =configureStore ({
    reducer :{
        saved : savedReducer,
        likedSlice : likedReducer
    }
})

export default Store