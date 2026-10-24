import { configureStore } from '@reduxjs/toolkit'
import tareasSlice from "./features/tareasSlice.js"
import usersSlice from './features/usersSlice.js'
import peliculasSlice from './features/peliculasSlice.js'

export const store = configureStore({
    reducer: {
        tareasSlice, usersSlice, peliculasSlice,
    },
})