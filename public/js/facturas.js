let facturas = [];
API_BASE_URL = "http://backendpeteats.runasp.net/api/facturas";
API_BASE_DETALLE_URL = "http://backendpeteats.runasp.net/api/detallefacturas";
$(document).ready(function () {
    $.ajax({
        url: API_BASE_URL,
        method: 'GET',
        success: function (data) {
            facturas = data;
            renderFacturas(facturas);
            configurarBuscador();
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar facturas:", error);
        }
    });
});

function renderFacturas(facturas) {
    const tbody = document.getElementById("facturasBody");
    tbody.innerHTML = "";

    facturas.forEach(f => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${f.FAC_ID}</td>
            <td>${f.CLI_CEDULA_RUC}</td>
            <td>${f.CLI_NOMBRE}</td>
            <td>${f.CLI_APELLIDO}</td>
            <td>${f.FAC_FECHA}</td>
            <td>${f.FAC_SUBTOTAL}</td>
            <td>${f.FAC_IVA}</td>
            <td>$${f.FAC_TOTAL.toFixed(2)}</td>
            <td>${f.FAC_ESTADO}</td>
            <td><a href="Detalles.html?id=${f.FAC_ID}">🧾</a></td>
        `;

        tbody.appendChild(row);
    });
}
function renderDetalles(factura) {
    const tbody = document.getElementById("detalleProductos");
    tbody.innerHTML = "";

    factura.forEach(f => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${f.FAC_ID}</td>
            <td>${f.PRD_NOMBRE}</td>
            <td>${f.DF_PRECIO}</td>
            <td>${f.DF_CANTIDAD}</td>
            <td>${f.DF_TOTAL}</td>

        `;

        tbody.appendChild(row);
    });
}
function configurarBuscador() {
    document.getElementById("buscarFacturaForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const query = document.getElementById("buscarInput").value.toLowerCase();
        const filtrados = facturas.filter(f =>
            f.FAC_ID.toString().includes(query) ||
            f.CLI_CEDULA_RUC.includes(query) ||
            f.CLI_NOMBRE.toLowerCase().includes(query) ||
            f.CLI_APELLIDO.toLowerCase().includes(query)
        );
        renderFacturas(filtrados);
    });
}
function cargarFactura(id) {
    $.ajax({
        url: `${API_BASE_URL}/${id}`,
        method: 'GET',
        success: function (data) {
            const factura = data;
            document.getElementById('facturaId').innerText = factura.FAC_ID;
            document.getElementById('clienteRUC').innerText = factura.CLI_CEDULA_RUC;
            document.getElementById('facturaFecha').innerText = factura.FAC_FECHA;
            document.getElementById('facturaTotal').innerText = factura.FAC_TOTAL.toFixed(2);
            document.getElementById('nuevoEstado').value = factura.FAC_ESTADO;
            renderDetalles(factura.detalle);
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar la factura:", error);
        }
    });
}
function cargarDetalleFactura(id){
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
                    <td>$${item.DF_PRECIO.toFixed(2)}</td>
                    <td>${item.DF_CANTIDAD}</td>
                    <td>$${item.DF_TOTAL.toFixed(2)}</td>
                `;
                tbody.appendChild(row);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar detalles:", error);
            alert('Error al cargar detalle de la factura');
        }  
    }); 
};

//   function cargarDetalleFactura(id) {
//             fetch(`http://localhost:3000/api/detallefacturas/${id}`)
//                 .then(res => res.json())
//                 .then(detalles => {
//                     const tbody = document.getElementById('detalleProductos');
//                     tbody.innerHTML = '';
//                     detalles.forEach(item => {
//                         const row = document.createElement('tr');
//                         row.innerHTML = `
//                             <td>${item.PRD_ID}</td>
//                             <td>${item.PRD_NOMBRE}</td>
//                             <td>$${item.DF_PRECIO.toFixed(2)}</td>
//                             <td>${item.DF_CANTIDAD}</td>
//                             <td>$${item.DF_TOTAL.toFixed(2)}</td>
//                         `;
//                         tbody.appendChild(row);
//                     });
//                 })
//                 .catch(err => {
//                     console.error('Error al cargar detalles:', err);
//                     alert('Error al cargar detalle de la factura');
//                 });
//         }

//         cargarFactura(facturaId);

//         document.getElementById('estadoForm').addEventListener('submit', e => {
//             e.preventDefault();
//             const nuevoEstado = document.getElementById('nuevoEstado').value;
//             fetch(`http://localhost:3000/api/facturas/${facturaId}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ FAC_ESTADO: nuevoEstado })
//             })
//                 .then(res => {
//                     if (!res.ok) throw new Error('Error al actualizar estado');
//                     alert('Estado actualizado correctamente');
//                 })
//                 .catch(err => {
//                     console.error('Error al actualizar estado:', err);
//                     alert('Error al actualizar estado');
//                 });
//         });

function actualizarFactura(id, estado) {

    $.ajax({
        url: `${API_BASE_URL}/${id}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ FAC_ESTADO: estado }),
        success: function (response) {
            alert("Factura actualizada con éxito");
            window.location.href = "Facturas.html";
        },
        error: function (xhr, status, error) {
            console.error("Error al actualizar la factura:", error);
        }
    });
}

