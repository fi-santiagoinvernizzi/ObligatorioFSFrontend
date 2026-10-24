
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    peliculas: [],
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
};

const peliculasSlice = createSlice({
    name: "peliculasSlice",
    initialState,
    reducers: {
        cargarPeliculasSlice: (state, action) => {
            const { data, pagination } = action.payload;

            state.peliculas = data;
            state.pagination = pagination;
        },
    },
});

export const { cargarPeliculasSlice } = peliculasSlice.actions;

export default peliculasSlice.reducer;
