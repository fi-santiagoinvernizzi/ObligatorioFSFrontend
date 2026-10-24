import api from "./authServices.js";

export const cambiarPlanApi = async () => {
  const resultado = await api.patch("/users/me/plan");

  return resultado.data;
};

