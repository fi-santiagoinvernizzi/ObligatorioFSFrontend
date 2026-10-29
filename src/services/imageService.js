import api from "./authServices.js";

export const uploadImage = async (base64) => {
  const resultado = await api.post("/images", {
    file: base64,
  });

  return resultado.data;
};
