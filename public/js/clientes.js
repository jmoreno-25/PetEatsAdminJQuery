let clientes = [];

API_BASE_URL = "https://backendestatus.runasp.net/api/clientes";

// Datos quemados para clientes
const datosQuemadosClientes = [
    {
        CLI_CEDULA_RUC: "1234567890",
        CLI_NOMBRE: "Juan Carlos",
        CLI_APELLIDO: "Pérez González",
        CLI_TELEFONO: "0998877665",
        CLI_EMAIL: "juan.perez@email.com",
        CLI_DIRECCION: "Av. Principal 123, Quito",
        CLI_ESTADO: "ACT"
    },
    {
        CLI_CEDULA_RUC: "0987654321",
        CLI_NOMBRE: "María Elena",
        CLI_APELLIDO: "García Rodríguez",
        CLI_TELEFONO: "0987654321",
        CLI_EMAIL: "maria.garcia@email.com",
        CLI_DIRECCION: "Calle Secundaria 456, Guayaquil",
        CLI_ESTADO: "ACT"
    },
    {
        CLI_CEDULA_RUC: "1122334455",
        CLI_NOMBRE: "Carlos Alberto",
        CLI_APELLIDO: "López Martínez",
        CLI_TELEFONO: "0976543210",
        CLI_EMAIL: "carlos.lopez@email.com",
        CLI_DIRECCION: "Barrio La Floresta, Cuenca",
        CLI_ESTADO: "ACT"
    },
    {
        CLI_CEDULA_RUC: "9988776655",
        CLI_NOMBRE: "Ana Lucía",
        CLI_APELLIDO: "Martínez Silva",
        CLI_TELEFONO: "0965432109",
        CLI_EMAIL: "ana.martinez@email.com",
        CLI_DIRECCION: "Sector Norte, Ambato",
        CLI_ESTADO: "INA"
    },
    {
        CLI_CEDULA_RUC: "5544332211",
        CLI_NOMBRE: "Luis Fernando",
        CLI_APELLIDO: "Rodríguez Herrera",
        CLI_TELEFONO: "0954321098",
        CLI_EMAIL: "luis.rodriguez@email.com",
        CLI_DIRECCION: "Centro Histórico, Loja",
        CLI_ESTADO: "ACT"
    },
    {
        CLI_CEDULA_RUC: "1357924680",
        CLI_NOMBRE: "Patricia Isabel",
        CLI_APELLIDO: "Moreno Castro",
        CLI_TELEFONO: "0943210987",
        CLI_EMAIL: "patricia.moreno@email.com",
        CLI_DIRECCION: "Vía a la Costa km 15, Machala",
        CLI_ESTADO: "ACT"
    },
    {
        CLI_CEDULA_RUC: "2468013579",
        CLI_NOMBRE: "Roberto José",
        CLI_APELLIDO: "Vásquez Delgado",
        CLI_TELEFONO: "0932109876",
        CLI_EMAIL: "roberto.vasquez@email.com",
        CLI_DIRECCION: "Malecón 2000, Esmeraldas",
        CLI_ESTADO: "INA"
    }
];

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
    // Usar datos quemados en lugar de la API
    clientes = datosQuemadosClientes;
    renderClientes(clientes);
    configurarBuscador();
    
    /*
    // Código original para usar API real
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
    */
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
        <h5 class="mb-2 fw-bold" style="color: var(--kMorado);">${c.CLI_NOMBRE} ${c.CLI_APELLIDO}</h5>
        <div class="row">
          <div class="col-md-4"><strong>Cédula:</strong> ${c.CLI_CEDULA_RUC}</div>
          <div class="col-md-4"><strong>Teléfono:</strong> ${c.CLI_TELEFONO}</div>
          <div class="col-md-4">${estadoBadge}</div>
        </div>
      </div>

      <div class="d-flex flex-column gap-2 justify-content-center align-items-end">
        <button onclick="abrirModalDetalles('${c.CLI_CEDULA_RUC}')" title="Ver detalles" class="btn btn-sm p-1 border-0" style="background: none;">
          <i class="bi bi-eye fs-5" style="color: var(--kFucsia);"></i>
        </button>
        <button onclick="abrirModalEditar('${c.CLI_CEDULA_RUC}')" class="btn btn-sm d-flex align-items-center gap-1" style="background-color: var(--kMoradoClaro); color: white; border: none;">
          <i class="bi bi-pencil"></i>
        </button>
        <button onclick="eliminarCliente('${c.CLI_CEDULA_RUC}')" class="btn btn-sm d-flex align-items-center gap-1" style="background-color: var(--kFucsia); color: white; border: none;">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
    contenedor.appendChild(row);
  });
}

function crearCliente(cliente) {
    // Simular creación exitosa
    alert("Cliente creado correctamente");
    window.location.href = "Index.html";
};

function editarCliente(id, cliente) {
    // Simular actualización exitosa
    alert("Cliente actualizado correctamente");
    window.location.href = "Index.html";
};

function eliminarCliente(id) {
    if (confirm(`¿Estás seguro de eliminar el cliente #${id}?`)) {
        // Simular eliminación exitosa
        alert('Cliente eliminado correctamente.');
        location.reload();
    }
};

function cargarClientePorId(id) {
    // Buscar cliente en datos quemados
    const cliente = datosQuemadosClientes.find(c => c.CLI_CEDULA_RUC === id);
    
    if (!cliente) {
        alert('Cliente no encontrado');
        return;
    }
    
    // Para Detalles.html
    if (document.getElementById('clienteNombre')) {
        document.getElementById('clienteNombre').textContent = `${cliente.CLI_NOMBRE} ${cliente.CLI_APELLIDO}`;
        document.getElementById('clienteCedula').textContent = cliente.CLI_CEDULA_RUC;
        document.getElementById('clienteTelefono').textContent = cliente.CLI_TELEFONO;
        document.getElementById('clienteEmail').textContent = cliente.CLI_EMAIL;
        document.getElementById('clienteDireccion').textContent = cliente.CLI_DIRECCION;
        
        const estadoBadge = cliente.CLI_ESTADO === "ACT" 
            ? '<span class="badge bg-success">Activo</span>'
            : '<span class="badge bg-secondary">Inactivo</span>';
        document.getElementById('clienteEstado').innerHTML = estadoBadge;
    }
    
    // Para Editar.html
    if (document.getElementById('editarClienteForm')) {
        const form = document.getElementById('editarClienteForm');
        form.CLI_NOMBRE.value = cliente.CLI_NOMBRE;
        form.CLI_APELLIDO.value = cliente.CLI_APELLIDO;
        form.CLI_TELEFONO.value = cliente.CLI_TELEFONO;
        form.CLI_EMAIL.value = cliente.CLI_EMAIL;
        form.CLI_DIRECCION.value = cliente.CLI_DIRECCION;
        form.CLI_ESTADO.value = cliente.CLI_ESTADO;
    }
}

// Funciones para manejar modales
function abrirModalCrear() {
    const modal = new bootstrap.Modal(document.getElementById('modalCrearCliente'));
    // Limpiar formulario
    document.getElementById('formCrearCliente').reset();
    modal.show();
}

function abrirModalEditar(clienteId) {
    const cliente = datosQuemadosClientes.find(c => c.CLI_CEDULA_RUC === clienteId);
    
    if (!cliente) {
        alert('Cliente no encontrado');
        return;
    }

    // Llenar campos del modal de edición
    document.getElementById('editClienteId').value = clienteId;
    document.getElementById('editCedula').value = cliente.CLI_CEDULA_RUC;
    document.getElementById('editNombre').value = cliente.CLI_NOMBRE;
    document.getElementById('editApellido').value = cliente.CLI_APELLIDO;
    document.getElementById('editTelefono').value = cliente.CLI_TELEFONO;
    document.getElementById('editEmail').value = cliente.CLI_EMAIL;
    document.getElementById('editDireccion').value = cliente.CLI_DIRECCION;
    document.getElementById('editEstado').value = cliente.CLI_ESTADO;

    const modal = new bootstrap.Modal(document.getElementById('modalEditarCliente'));
    modal.show();
}

function abrirModalDetalles(clienteId) {
    const cliente = datosQuemadosClientes.find(c => c.CLI_CEDULA_RUC === clienteId);
    
    if (!cliente) {
        alert('Cliente no encontrado');
        return;
    }

    // Llenar campos del modal de detalles
    document.getElementById('detalleNombre').textContent = `${cliente.CLI_NOMBRE} ${cliente.CLI_APELLIDO}`;
    document.getElementById('detalleCedula').textContent = cliente.CLI_CEDULA_RUC;
    document.getElementById('detalleTelefono').textContent = cliente.CLI_TELEFONO;
    document.getElementById('detalleEmail').textContent = cliente.CLI_EMAIL;
    document.getElementById('detalleDireccion').textContent = cliente.CLI_DIRECCION;
    
    const estadoBadge = cliente.CLI_ESTADO === "ACT" 
        ? '<span class="badge bg-success">Activo</span>'
        : '<span class="badge bg-secondary">Inactivo</span>';
    document.getElementById('detalleEstado').innerHTML = estadoBadge;

    const modal = new bootstrap.Modal(document.getElementById('modalDetallesCliente'));
    modal.show();
}

function guardarCliente() {
    const form = document.getElementById('formCrearCliente');
    const formData = new FormData(form);
    
    // Validar campos requeridos
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Simular guardado exitoso
    alert('Cliente creado correctamente');
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalCrearCliente'));
    modal.hide();
    
    // Recargar lista (en una implementación real, agregarías el cliente a la lista)
    location.reload();
}

function actualizarCliente() {
    const form = document.getElementById('formEditarCliente');
    
    // Validar campos requeridos
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Simular actualización exitosa
    alert('Cliente actualizado correctamente');
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarCliente'));
    modal.hide();
    
    // Recargar lista
    location.reload();
}


