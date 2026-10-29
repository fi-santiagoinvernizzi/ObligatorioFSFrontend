
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
        agregarPeliculaSlice: (state, action) => {
            state.peliculas.push(action.payload);
            state.pagination.total += 1;
        },
        modificarPeliculaSlice: (state, action) => {
            const peliculaModificada = action.payload;

            const indice = state.peliculas.findIndex(
                (pelicula) => pelicula._id === peliculaModificada._id
            );

            if (indice !== -1) { state.peliculas[indice] = peliculaModificada; }
        },
        eliminarPeliculaSlice: (state, action) => {
            state.peliculas = state.peliculas.filter(
                (pelicula) => pelicula._id !== action.payload
            );

            state.pagination.total -= 1;
        },
    },
});


export const { cargarPeliculasSlice, agregarPeliculaSlice, modificarPeliculaSlice, eliminarPeliculaSlice } = peliculasSlice.actions;


export default peliculasSlice.reducer;
