import axios from "axios";

const api = axios.create({
    baseURL: "https://obligatorio-fs-three.vercel.app/api/v1", 
    headers: {
        "Content-Type": "application/json"
    }
});

//interceptor de la peticion
api.interceptors.request.use((config) => {
    //busca en el localStorage el token
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//interceptor de la respuesta
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
        }

        return Promise.reject(error);
    }
);

//verificar que se manda en este formato 
export const loginApi = async (dataLogin) => {
    const resultado = await api.post("/auth/login", dataLogin);
    return resultado.data;
}

export const registrarUsuarioApi = async (dataUsuario) => {
  const resultado = await api.post("/auth/register", dataUsuario);
  return resultado.data;
};


export const cambiarPlanApi = async (datosPlan) => {
    const resultado = await api.patch("/users/me/plan", datosPlan);
    return resultado.data;
};



export default api;