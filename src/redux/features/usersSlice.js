import { createSlice } from "@reduxjs/toolkit";


const initialState = [] //lista vacia de usuarios

const usersSlice = createSlice({
    name: "usersSlice",
    initialState,
    reducers: {
        cargaInicialUsersSlice: (state, action) => {
            const listaUsuarios = action.payload;
            console.log('listaUsuarios', listaUsuarios)
            return listaUsuarios;
        },
        crearUserSlice: (state, action) => {
            const usuario = action.payload;
            state.push(usuario);

        },
        modificarPlanUserSlice: (state, action) => {
            const usuarioModificado = action.payload;

            const indice = state.findIndex(
                (usuario) => usuario._id === usuarioModificado._id
            );

            if (indice !== -1) {
                state[indice] = usuarioModificado;
            }
        }
    }
})


export const { cargaInicialUsersSlice, crearUserSlice, modificarPlanUserSlice } = usersSlice.actions;
export default usersSlice.reducer;