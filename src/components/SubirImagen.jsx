
import { useEffect, useId, useState } from "react";
import { uploadImage } from "../services/imageService.js";

const SubirImagen = ({ handleImgURL, resetKey }) => {
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputId = useId();
  const [inputKey, setInputKey] = useState(0);
  const [imagenSubida, setImagenSubida] = useState(false);

  useEffect(() => {
    setArchivo(null); 
    setPreview("");
    setError("");
    handleImgURL(null);
    setImagenSubida(false);
  }, [resetKey]);

  useEffect(() => {
    if (!preview) return;

    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  const handleFileChange = (evento) => {
    const seleccionado = evento.target.files?.[0];

    if (!seleccionado) return;

    if (!seleccionado.type.startsWith("image/")) {
      setError("Seleccioná un archivo de imagen.");
      evento.target.value = "";
      return;
    }

    if (seleccionado.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar los 5 MB.");
      evento.target.value = "";
      return;
    }

    setError("");
    setImagenSubida(false);
    handleImgURL(null);
    setArchivo(seleccionado);
    setPreview(URL.createObjectURL(seleccionado));
  };

  const quitarSeleccion = () => {
    setArchivo(null);
    setPreview("");
    setError("");
    handleImgURL(null);
    setInputKey((valor) => valor + 1);
    setImagenSubida(false);
  };

  const handleUpload = async () => {
    if (!archivo) return;

    setLoading(true);
    setError("");

    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(
          new Error("No se pudo leer la imagen.")
        );

        reader.readAsDataURL(archivo);
      });

      const resultado = await uploadImage(base64);

      handleImgURL({
            url: resultado.secure_url,
            public_id: resultado.public_id,
        });
      setImagenSubida(false);
    } catch (error) {
      console.error("Error al subir la imagen:", error);

      setError(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "No se pudo subir la imagen. Intentá nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <h4>Póster personalizado (opcional)</h4>

      <input
        key={inputKey}
        id={inputId}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={loading}
      />

      {preview && (
        <div style={{ marginTop: "1rem" }}>
          <img
            src={preview}
            alt="Vista previa del póster"
            style={{
              display: "block",
              maxWidth: "220px",
              maxHeight: "320px",
              objectFit: "contain",
              marginBottom: "0.5rem",
            }}
          />
        </div>
      )}

      {archivo && (
        <div style={{ marginTop: "0.5rem" }}>
          <button type="button" onClick={handleUpload}  disabled={loading || imagenSubida}>
            {loading ? "Subiendo imagen..." : imagenSubida ? "Póster subido" : "Subir póster"}
          </button>

          <button
            type="button"
            onClick={quitarSeleccion}
            disabled={loading}
            style={{ marginLeft: "0.5rem" }}
          >
            Quitar selección
          </button>
        </div>
      )}

      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default SubirImagen;
