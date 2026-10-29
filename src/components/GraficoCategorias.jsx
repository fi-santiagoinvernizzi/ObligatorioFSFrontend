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
        backgroundColor: "#00c46a",
        borderColor: "#00c46a",
        borderRadius: 5,
        maxBarThickness: 65,
      },
      
    ],
  };

 const opciones = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: "#edf3f2",
          font: {
            family: "DM Sans",
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#aab8b8",
        },
        grid: {
          color: "#34434a",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#aab8b8",
          precision: 0,
          stepSize: 1,
        },
        grid: {
          color: "#34434a",
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