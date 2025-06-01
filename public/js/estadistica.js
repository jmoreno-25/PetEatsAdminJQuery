const API_PRODUCTOS = "http://backendpeteats.runasp.net/api/productos-mas-vendidos";
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
        backgroundColor: "rgba(54, 162, 235, 0.7)"
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
    const res = await fetch(`http://backendpeteats.runasp.net/api/ventas-por-mes/${anio}`);
    const data = await res.json();

    const mesesNombre = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    data.sort((a, b) => a.Mes - b.Mes);
    ventasBarChart.data.labels = data.map(item => `${mesesNombre[item.Mes - 1]}`);
    ventasBarChart.data.datasets[0].data = data.map(item => Number(item.Total_Ventas));
    ventasBarChart.update();

  } catch (error) {
    console.error("Error cargando ventas por mes:", error);
  }
}

async function cargarProductosMasVendidos() {
  try {
    const res = await fetch(API_PRODUCTOS);
    const data = await res.json();

    const colors = [
      "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
      "#FF9F40", "#66FF66", "#FF6666", "#66B2FF", "#FF66B2"
    ];

    productosPieChart.data.labels = data.map(item => item.PRD_NOMBRE);
    productosPieChart.data.datasets[0].data = data.map(item => Number(item.Total_Vendido));
    productosPieChart.data.datasets[0].backgroundColor = colors.slice(0, data.length);
    productosPieChart.update();

    const pieLegend = document.getElementById("pieLegend");
    pieLegend.innerHTML = "";

    data.forEach((item, i) => {
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
