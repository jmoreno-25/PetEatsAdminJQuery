const API_PRODUCTOS = "https://delirio.runasp.net/api/productos-mas-vendidos";
let ventasBarChart, productosPieChart;

document.addEventListener("DOMContentLoaded", () => {
  const ctxBar = document.getElementById("barChart").getContext("2d");
  ventasBarChart = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        label: "Ventas",
        data: [],
        backgroundColor: "rgba(106, 76, 147, 0.7)"
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        datalabels: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: v => "$" + v.toLocaleString()
          }
        }
      },
      layout: { padding: { top: 20 } }
    },
    plugins: []
  });

  const ctxPie = document.getElementById("pieChart").getContext("2d");
  productosPieChart = new Chart(ctxPie, {
    type: "pie",
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        borderColor: "#fff",
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          color: '#000',
          font: { weight: 'bold', size: 14 },
          formatter: value => value.toLocaleString(),
          anchor: 'center',
          align: 'center'
        }
      }
    },
    plugins: []
  });

  cargarProductosMasVendidos();

  const selectAnio = document.getElementById("selectAnio");
  cargarVentasPorMes(selectAnio.value);
  selectAnio.addEventListener("change", () => {
    cargarVentasPorMes(selectAnio.value);
  });
});

async function cargarVentasPorMes(anio) {
  try {
    // Datos quemados para mostrar gráficos
    const datosQuemados = [
      { Mes: 1, Total_Ventas: 15420 },
      { Mes: 2, Total_Ventas: 18750 },
      { Mes: 3, Total_Ventas: 22150 },
      { Mes: 4, Total_Ventas: 19800 },
      { Mes: 5, Total_Ventas: 24600 },
      { Mes: 6, Total_Ventas: 21350 },
      { Mes: 7, Total_Ventas: 26780 },
      { Mes: 8, Total_Ventas: 23940 },
      { Mes: 9, Total_Ventas: 28150 },
      { Mes: 10, Total_Ventas: 25670 },
      { Mes: 11, Total_Ventas: 30200 },
      { Mes: 12, Total_Ventas: 32850 }
    ];

    const mesesNombre = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    datosQuemados.sort((a, b) => a.Mes - b.Mes);
    ventasBarChart.data.labels = datosQuemados.map(item => `${mesesNombre[item.Mes - 1]}`);
    ventasBarChart.data.datasets[0].data = datosQuemados.map(item => Number(item.Total_Ventas));
    ventasBarChart.update();

  } catch (error) {
    console.error("Error cargando ventas por mes:", error);
  }
}

async function cargarProductosMasVendidos() {
  try {
    // Datos quemados para mostrar gráficos
    const datosQuemados = [
      { PRD_NOMBRE: "Ramo de Rosas Rojas", Total_Vendido: 145 },
      { PRD_NOMBRE: "Ramo de Tulipanes", Total_Vendido: 120 },
      { PRD_NOMBRE: "Arreglo Floral Mixto", Total_Vendido: 98 },
      { PRD_NOMBRE: "Ramo de Girasoles", Total_Vendido: 87 },
      { PRD_NOMBRE: "Bouquet de Lirios", Total_Vendido: 76 },
      { PRD_NOMBRE: "Ramo de Claveles", Total_Vendido: 65 },
      { PRD_NOMBRE: "Arreglo de Orquídeas", Total_Vendido: 54 }
    ];

    const colors = [
      "#6A4C93", "#C44569", "#8B7EC8", "#E056A5", "#9C6DB8",
      "#D87CAE", "#B688C4", "#F08CAE", "#A374B5", "#E67DB4"
    ];

    productosPieChart.data.labels = datosQuemados.map(item => item.PRD_NOMBRE);
    productosPieChart.data.datasets[0].data = datosQuemados.map(item => Number(item.Total_Vendido));
    productosPieChart.data.datasets[0].backgroundColor = colors.slice(0, datosQuemados.length);
    productosPieChart.update();

    const pieLegend = document.getElementById("pieLegend");
    pieLegend.innerHTML = "";

    datosQuemados.forEach((item, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="legend-color" style="background-color:${colors[i]}"></span>
        <span class="legend-text">${item.PRD_NOMBRE}</span>
        <span class="legend-amount">${item.Total_Vendido.toLocaleString()}</span>
      `;
      pieLegend.appendChild(li);
    });

  } catch (error) {
    console.error("Error cargando productos más vendidos:", error);
  }
}
