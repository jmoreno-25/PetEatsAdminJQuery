let clientes = [];

API_BASE_URL = "http://backendpeteats.runasp.net/api/clientes";

document.getElementById("buscarClienteForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document.getElementById("buscarInput").value.toLowerCase();
    const filtrados = clientes.filter(c =>
            c.CLI_CEDULA_RUC.includes(query) ||
            c.CLI_NOMBRE.toLowerCase().includes(query) ||
            c.CLI_APELLIDO.toLowerCase().includes(query)
        );
        renderClientes(filtrados);
});

$(document).ready(function(){
    $.ajax({
        url: API_BASE_URL,
        method:'GET',
        success: function(data){
            clientes = data;
            renderClientes(clientes);
            configurarBuscador();
        }, 
        error:function(xhr, status, error){
            console.error("Error al cargar clientes:", error);
        }
    });
});

function configurarBuscador() {
    $("buscarClienteForm").on("submit", function (e) {
        e.preventDefault();
        const query = $("#buscarInput").val().toLowerCase();
        const filtrados = clientes.filter(c =>
            c.CLI_CEDULA_RUC.includes(query) ||
            c.CLI_NOMBRE.toLowerCase().includes(query) ||
            c.CLI_APELLIDO.toLowerCase().includes(query)
        );
        renderClientes(filtrados);
    });
}   



function renderClientes(lista) {
    const tbody = document.getElementById("clientesBody");
    tbody.innerHTML = "";
    lista.forEach(c => {
        const row = document.createElement("tr");
       row.innerHTML = `
            <td>${c.CLI_CEDULA_RUC}</td>
            <td>${c.CLI_NOMBRE}</td>
            <td>${c.CLI_APELLIDO}</td>
            <td>${c.CLI_TELEFONO}</td>
            <td>${c.CLI_ESTADO === "ACT" ? "Activo" : "Inactivo"}</td>
            <td>
                <div class="acciones-botones">
                    <a href="Crear.html">➕</a> |
                    <a href="Editar.html?id=${c.CLI_CEDULA_RUC}">✏️</a>
                </div>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function crearCliente(cliente) {
    $.ajax({
        url: API_BASE_URL,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(cliente),
        success: function (data) {
            alert("Cliente creado correctamente");
            window.location.href = "Index.html";
        },
        error:function(xhr, status, error){
            alert("Error al crear cliente");
            console.error("Error al crear cliente:", error);
        }
    });
};

function editarCliente(id, cliente) {
    $.ajax({
        url: `${API_BASE_URL}/${id}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(cliente),
        success: function (data) {
            alert("Cliente actualizado correctamente");
            window.location.href = "Index.html";
        },
        error:function(xhr,status, error){
            alert("Error al actualizar cliente");
            console.error("Error al actualizar cliente:", error);
        }
    });
};

function eliminarCliente(id) {
    if (confirm(`¿Estás seguro de eliminar el cliente #${id}?`)) {
        $.ajax({
            url: `${API_BASE_URL}/${id}`,
            method: 'DELETE',
            success: function () {
                alert('Cliente eliminado correctamente.');
                location.reload();
            },
            error: function () {
                alert('Error al eliminar el cliente.');
            }
        });
    }
};

function cargarClientePorId(id) {
    fetch(`${API_BASE_URL}/${id}`)
        .then(res => res.json())
        .then(cliente => {
            if (!cliente) {
                alert('Cliente no encontrado');
                return;
            }
            console.log("Valor T_ANIMAL_ID:", cliente.CLI_ESTADO);
            // Para Editar.html
            if (document.getElementById('editarClienteForm')) {
                const form = document.getElementById('editarClienteForm');
                form.CLI_NOMBRE.value = cliente.CLI_NOMBRE;
                form.CLI_APELLIDO.value = cliente.CLI_APELLIDO;
                form.CLI_TELEFONO.value = cliente.CLI_TELEFONO;
                form.CLI_ESTADO.value = cliente.CLI_ESTADO;
            }
        })
        .catch(error => {
            console.error("Error al cargar cliente:", error);
        });
}


