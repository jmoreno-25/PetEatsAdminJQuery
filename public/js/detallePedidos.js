// Archivo para manejar los detalles de pedidos
// Replica la funcionalidad de detalleFacturas.js pero para pedidos

let pedido = null;
const API_BASE_URL = "https://backendestatus.runasp.net/api/pedidos";
const API_BASE_DETALLE_URL = "https://backendestatus.runasp.net/api/detallepedidos";

function cargarPedido(id) {
    // Buscar en datos quemados
    const datosQuemados = [
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

    pedido = datosQuemados.find(p => p.id == id);
    
    if (pedido) {
        const fecha = new Date(pedido.fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        document.getElementById('pedidoId').innerText = pedido.id;
        document.getElementById('clienteRUC').innerText = `${pedido.clienteCedula} - ${pedido.clienteNombre}`;
        document.getElementById('pedidoFecha').innerText = fecha;
        document.getElementById('pedidoSubtotal').innerText = `$${pedido.subtotal.toFixed(2)}`;
        document.getElementById('pedidoIVA').innerText = `$${pedido.iva.toFixed(2)}`;
        document.getElementById('pedidoTotal').innerText = `$${pedido.total.toFixed(2)}`;
        document.getElementById('nuevoEstado').value = pedido.estado;
        
        // Cargar el detalle del pedido
        cargarDetallePedido(id);
    } else {
        alert('Pedido no encontrado');
    }
}

function cargarDetallePedido(id) {
    if (pedido && pedido.detalles) {
        const tbody = document.getElementById('detalleProductos');
        tbody.innerHTML = '';
        
        pedido.detalles.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.prdId}</td>
                <td>${item.producto}</td>
                <td>$${item.precio.toFixed(2)}</td>
                <td>${item.cantidad}</td>
                <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        });
    }
}

function actualizarPedido(id, estado) {
    // Simular actualización exitosa
    if (pedido) {
        pedido.estado = estado;
        alert("Estado del pedido actualizado con éxito");
        // Recargar la página para mostrar el estado actualizado
        location.reload();
    } else {
        alert('Error: No se puede actualizar el estado del pedido');
    }
}