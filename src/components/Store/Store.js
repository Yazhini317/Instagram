import React from 'react'
import {configureStore} from '@reduxjs/toolkit'
import savedReducer from './SavedSlice'
const Store =configureStore ({
    reducer :{
        saved : savedReducer
    }
})

export default Store