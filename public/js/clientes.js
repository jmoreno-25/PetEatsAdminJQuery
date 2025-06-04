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
  const contenedor = document.getElementById("clientesBody");
  contenedor.innerHTML = "";

  lista.forEach(c => {
    const row = document.createElement("div");
    row.className = "card shadow-sm border-0 p-3 d-flex flex-md-row align-items-center gap-3 mb-3";
    row.style.backgroundColor = "#fdfdfd";

    let estadoBadge = c.CLI_ESTADO === "ACT"
      ? '<span class="badge bg-success">Activo</span>'
      : '<span class="badge bg-secondary">Inactivo</span>';

    row.innerHTML = `
      <div class="flex-grow-1">
        <h5 class="mb-2 text-success fw-bold">${c.CLI_NOMBRE} ${c.CLI_APELLIDO}</h5>
        <div class="row">
          <div class="col-md-4"><strong>Cédula:</strong> ${c.CLI_CEDULA_RUC}</div>
          <div class="col-md-4"><strong>Teléfono:</strong> ${c.CLI_TELEFONO}</div>
          <div class="col-md-4">${estadoBadge}</div>
        </div>
      </div>

      <div class="d-flex flex-column gap-2 justify-content-center align-items-end">
        <a href="Detalles.html?id=${c.CLI_CEDULA_RUC}" title="Ver detalles">
          <i class="bi bi-eye fs-5 text-secondary"></i>
        </a>
        <a href="Editar.html?id=${c.CLI_CEDULA_RUC}" class="btn btn-sm btn-pastel-green d-flex align-items-center gap-1">
          <i class="bi bi-pencil"></i>
        </a>
        <button onclick="eliminarCliente('${c.CLI_CEDULA_RUC}')" class="btn btn-sm d-flex align-items-center gap-1" style="background-color:#f8d7da; color:#721c24; border:none;">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
    contenedor.appendChild(row);
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


