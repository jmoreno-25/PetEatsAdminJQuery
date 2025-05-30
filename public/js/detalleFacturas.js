API_BASE_URL = "http://backendpeteats.runasp.net/api/detallefacturas";
API_BASE_FAC_URL = "http://backendpeteats.runasp.net/api/facturas";

function actualizarFactura(id, estado) {

    $.ajax({
        url: `${API_BASE_FAC_URL}/${id}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ FAC_ESTADO: estado }),
        success: function (response) {
            alert("Factura actualizada con éxito");
            window.location.href = "Index.html";
        },
        error: function (xhr, status, error) {
            console.error("Error al actualizar la factura:", error);
        }
    });
}
function cargarDetalleFactura(id){
    $.ajax({
        url: `${API_BASE_URL}/${id}`,
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
function cargarFactura(id) {
    fetch(`${API_BASE_FAC_URL}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar la factura');
            }
            return response.json();
        })
        .then(data => {
            const factura = data;
            document.getElementById('facturaId').innerText = factura.FAC_ID;
            document.getElementById('clienteRUC').innerText = factura.CLI_NOMBRE + " " + factura.CLI_APELLIDO;
            document.getElementById('facturaFecha').innerText = factura.FAC_FECHA;
            document.getElementById('facturaTotal').innerText = factura.FAC_TOTAL.toFixed(2);
            document.getElementById('nuevoEstado').value = factura.FAC_ESTADO;
            renderDetalles(factura.detalle);
        })
        .catch(error => {
            console.error("Error al cargar la factura:", error);
        });
    
}


