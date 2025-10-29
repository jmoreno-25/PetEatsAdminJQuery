let pedidos = [];
API_BASE_URL = "https://backendestatus.runasp.net/api/pedidos";
API_BASE_DETALLE_URL = "https://backendestatus.runasp.net/api/detallepedidos";

// Datos quemados para mostrar pedidos
const datosQuemadosPedidos = [
  {
    id: 1,
    userId: 1,
    fecha: "2025-10-28T13:38:37.767Z",
    subtotal: 15.00,
    iva: 1.80,
    total: 16.80,
    comprobante: "https://drive.google.com/uc?export=view&id=1KTnBbBygQKDe02ZdkkwntyJ7w20P-DGE",
    estado: "pendiente",
    clienteNombre: "Juan Pérez",
    clienteCedula: "1234567890",
    detalles: [
      { prdId: 1, precio: 15.00, cantidad: 1, producto: "Ramo de Rosas Rojas" }
    ]
  },
  {
    id: 2,
    userId: 2,
    fecha: "2025-10-27T10:20:15.000Z",
    subtotal: 25.00,
    iva: 3.00,
    total: 28.00,
    comprobante: "https://drive.google.com/uc?export=view&id=1KTnBbBygQKDe02ZdkkwntyJ7w20P-DGE",
    estado: "confirmado",
    clienteNombre: "María García",
    clienteCedula: "0987654321",
    detalles: [
      { prdId: 2, precio: 25.00, cantidad: 1, producto: "Arreglo Floral Mixto" }
    ]
  },
  {
    id: 3,
    userId: 1,
    fecha: "2025-10-26T16:45:30.000Z",
    subtotal: 35.00,
    iva: 4.20,
    total: 39.20,
    comprobante: "https://drive.google.com/uc?export=view&id=1KTnBbBygQKDe02ZdkkwntyJ7w20P-DGE",
    estado: "entregado",
    clienteNombre: "Carlos López",
    clienteCedula: "1122334455",
    detalles: [
      { prdId: 1, precio: 15.00, cantidad: 1, producto: "Ramo de Rosas Rojas" },
      { prdId: 3, precio: 20.00, cantidad: 1, producto: "Peluche Osito" }
    ]
  },
  {
    id: 4,
    userId: 3,
    fecha: "2025-10-25T09:15:45.000Z",
    subtotal: 45.00,
    iva: 5.40,
    total: 50.40,
    comprobante: "https://drive.google.com/uc?export=view&id=1KTnBbBygQKDe02ZdkkwntyJ7w20P-DGE",
    estado: "pagado",
    clienteNombre: "Ana Martínez",
    clienteCedula: "9988776655",
    detalles: [
      { prdId: 2, precio: 25.00, cantidad: 1, producto: "Arreglo Floral Mixto" },
      { prdId: 4, precio: 20.00, cantidad: 1, producto: "Ramo de Girasoles" }
    ]
  },
  {
    id: 5,
    userId: 2,
    fecha: "2025-10-24T14:30:20.000Z",
    subtotal: 18.00,
    iva: 2.16,
    total: 20.16,
    comprobante: "https://drive.google.com/uc?export=view&id=1KTnBbBygQKDe02ZdkkwntyJ7w20P-DGE",
    estado: "rechazado",
    clienteNombre: "Luis Rodríguez",
    clienteCedula: "5544332211",
    detalles: [
      { prdId: 5, precio: 18.00, cantidad: 1, producto: "Bouquet de Lirios" }
    ]
  }
];

$(document).ready(function () {
    // Usar datos quemados en lugar de la API
    pedidos = datosQuemadosPedidos;
    renderPedidos(pedidos);
    configurarBuscador();
    
    /*
    // Código original para usar API real
    $.ajax({
        url: API_BASE_URL,
        method: 'GET',
        success: function (data) {
            pedidos = data;
            renderPedidos(pedidos);
            configurarBuscador();
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar pedidos:", error);
        }
    });
    */
});

function renderPedidos(pedidos) {
  const contenedor = document.getElementById("pedidosBody");
  contenedor.innerHTML = "";

  pedidos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card shadow-sm p-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center";

    // Determinar color del badge según el estado
    let badgeClass = '';
    let estadoTexto = '';
    switch(p.estado) {
      case 'pendiente': 
        badgeClass = 'bg-warning text-dark'; 
        estadoTexto = 'Pendiente';
        break;
      case 'confirmado': 
        badgeClass = 'bg-info text-white'; 
        estadoTexto = 'Confirmado';
        break;
      case 'pagado': 
        badgeClass = 'bg-primary text-white'; 
        estadoTexto = 'Pagado';
        break;
      case 'entregado': 
        badgeClass = 'bg-success text-white'; 
        estadoTexto = 'Entregado';
        break;
      case 'rechazado': 
        badgeClass = 'bg-danger text-white'; 
        estadoTexto = 'Rechazado';
        break;
      default: 
        badgeClass = 'bg-secondary text-white';
        estadoTexto = p.estado;
    }

    // Formatear fecha
    const fecha = new Date(p.fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    card.innerHTML = `
      <div class="flex-grow-1">
        <h5 class="fw-bold mb-2" style="color: var(--kMorado);">
          <i class="bi bi-receipt me-2"></i>Pedido #${p.id}
        </h5>

        <div class="row">
          <div class="col-md-6 mb-2">
            <p class="mb-1"><i class="bi bi-person me-1"></i><strong>Cliente:</strong> ${p.clienteCedula} - ${p.clienteNombre}</p>
          </div>
          <div class="col-md-6 mb-2">
            <p class="mb-1"><i class="bi bi-calendar me-1"></i><strong>Fecha:</strong> ${fecha}</p>
          </div>

          <div class="col-md-6 mb-2">
            <p class="mb-1"><i class="bi bi-currency-dollar me-1"></i><strong>Total:</strong> $${p.total.toFixed(2)}</p>
          </div>
          <div class="col-md-6 mb-2">
            <span class="badge px-3 py-2 ${badgeClass}">
              ${estadoTexto}
            </span>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column gap-2">
        <a href="Detalles.html?id=${p.id}" title="Ver Detalle">
          <i class="bi bi-eye fs-4" style="color: var(--kFucsia);"></i>
        </a>
        ${p.comprobante ? `<a href="${p.comprobante}" target="_blank" title="Ver Comprobante">
          <i class="bi bi-file-earmark-image fs-4" style="color: var(--kMorado);"></i>
        </a>` : ''}
      </div>
    `;

    contenedor.appendChild(card);
  });
}

function renderDetalles(pedido) {
    const tbody = document.getElementById("detalleProductos");
    tbody.innerHTML = "";

    pedido.forEach(p => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${p.PED_ID}</td>
            <td>${p.PRD_NOMBRE}</td>
            <td>${p.DP_PRECIO}</td>
            <td>${p.DP_CANTIDAD}</td>
            <td>${p.DP_TOTAL}</td>
        `;

        tbody.appendChild(row);
    });
}

function configurarBuscador() {
    document.getElementById("buscarPedidoForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const query = document.getElementById("buscarInput").value.toLowerCase();
        const filtrados = pedidos.filter(p =>
            p.id.toString().includes(query) ||
            p.clienteCedula.includes(query) ||
            p.clienteNombre.toLowerCase().includes(query)
        );
        renderPedidos(filtrados);
    });
}

function cargarPedido(id) {
    $.ajax({
        url: `${API_BASE_URL}/${id}`,
        method: 'GET',
        success: function (data) {
            const pedido = data;
            document.getElementById('pedidoId').innerText = pedido.PED_ID;
            document.getElementById('clienteRUC').innerText = pedido.CLI_CEDULA_RUC;
            document.getElementById('pedidoFecha').innerText = pedido.PED_FECHA;
            document.getElementById('pedidoTotal').innerText = pedido.PED_TOTAL.toFixed(2);
            document.getElementById('nuevoEstado').value = pedido.PED_ESTADO;
            renderDetalles(pedido.detalle);
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar el pedido:", error);
        }
    });
}

function cargarDetallePedido(id){
    $.ajax({
        url: `${API_BASE_DETALLE_URL}/${id}`,
        method: 'GET',
        success: function (data) {
            const detalles = data;
            const tbody = document.getElementById('detalleProductos');
            tbody.innerHTML = '';
            detalles.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.PRD_ID}</td>
                    <td>${item.PRD_NOMBRE}</td>
                    <td>$${item.DP_PRECIO.toFixed(2)}</td>
                    <td>${item.DP_CANTIDAD}</td>
                    <td>$${item.DP_TOTAL.toFixed(2)}</td>
                `;
                tbody.appendChild(row);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar detalles:", error);
            alert('Error al cargar detalle del pedido');
        }  
    }); 
}

function actualizarPedido(id, estado) {
    $.ajax({
        url: `${API_BASE_URL}/${id}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ PED_ESTADO: estado }),
        success: function (response) {
            alert("Pedido actualizado con éxito");
            window.location.href = "Index.html";
        },
        error: function (xhr, status, error) {
            console.error("Error al actualizar el pedido:", error);
        }
    });
}