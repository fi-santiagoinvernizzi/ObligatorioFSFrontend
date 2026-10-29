import React from "react";
import { useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraficoCategorias = () => {
  const listaPeliculas = useSelector(
    (state) => state.peliculasSlice.peliculas
  );

  const cantidadPorCategoria = {};

  (listaPeliculas || []).forEach((pelicula) => {
    const nombreCategoria = pelicula.category?.name || "Sin categoría";

    cantidadPorCategoria[nombreCategoria] =
      (cantidadPorCategoria[nombreCategoria] || 0) + 1;
  });

  const datos = {
    labels: Object.keys(cantidadPorCategoria),
    datasets: [
      {
        label: "Cantidad de películas",
        data: Object.values(cantidadPorCategoria),
        backgroundColor: "#00c030",
        borderColor: "#00a82a",
        borderWidth: 1,
      },
      
    ],
  };

  const opciones = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Cantidad de películas por categoría",
      },
      color: "#e8edf0",
        scales: {
        x: {
            ticks: {
            color: "#aab5bd",
            },
            grid: {
            color: "#35434c",
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
            color: "#aab5bd",
            precision: 0,
            stepSize: 1,
            },
            grid: {
            color: "#35434c",
            },
        },
        },
    },
  };

  return (
    <div className="grafico-categorias">
      <h3>Películas por categoría</h3>

      {listaPeliculas?.length > 0 ? (
        <Bar data={datos} options={opciones} />
      ) : (
        <p>No hay películas para mostrar en el gráfico.</p>
      )}
    </div>
  );
};

export default GraficoCategorias;