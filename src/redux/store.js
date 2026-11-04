import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './features/usersSlice.js'
import peliculasSlice from './features/peliculasSlice.js'

export const store = configureStore({
    reducer: {
        usersSlice, peliculasSlice,
    },
})