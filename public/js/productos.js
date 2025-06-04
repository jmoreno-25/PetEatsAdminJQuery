let productos = [];
const API_BASE_URL = "https://backendpeteats.runasp.net/api/productos";

$(document).ready(function () {
  $.ajax({
    url: API_BASE_URL,
    method: 'GET',
    success: function (data) {
      productos = data;
      renderProductos(productos);
    },
    error: function (xhr, status, error) {
      console.error("Error al cargar productos:", error);
    }
  });
});

function renderProductos(lista) {
  const contenedor = document.getElementById("productosBody");
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const row = document.createElement("div");
    row.className = "card shadow-sm border-0 p-3 d-flex flex-md-row align-items-center gap-3";
    row.style.backgroundColor = "#fdfdfd";

    let estadoBadge = '';
let destacadoBadge = '';

if (p.PRD_ESTADO === 'ACT') {
  estadoBadge = '<span class="badge bg-success">Activo</span>';
} else if (p.PRD_ESTADO === 'INA') {
  estadoBadge = '<span class="badge bg-secondary">Inactivo</span>';
} else if (p.PRD_ESTADO === 'DES') {
  destacadoBadge = '<span class="badge text-bg-warning">Destacado</span>';
}

    row.innerHTML = `
      <div class="text-center">
        <img src="${p.PRD_IMAGEN}" alt="${p.PRD_NOMBRE}" style="width: 110px; height: 110px; object-fit: contain;" />
      </div>

      <div class="flex-grow-1">
        <h5 class="mb-2 text-success fw-bold">${p.PRD_NOMBRE}</h5>
        <div class="row">
          <div class="col-md-6"><strong>ID:</strong> ${p.PRD_ID}</div>
          <div class="col-md-6"><strong>Stock:</strong> ${p.PRD_STOCK}</div>
          <div class="col-md-6"><strong>Precio:</strong> $${p.PRD_PRECIO.toFixed(2)}</div>
          <div class="col-md-6"><strong>Categoría:</strong> ${p.CAT_DESCRIPCION}</div>
          <div class="col-md-6"><strong>Tipo Animal:</strong> ${p.T_ANIMAL_DES}</div>
          <div class="col-md-12">${estadoBadge} ${destacadoBadge}</div>
        </div>
      </div>

        <div class="d-flex flex-column gap-2 justify-content-center align-items-end">
      
        <a href="Editar.html?id=${p.PRD_ID}" class="btn btn-sm btn-pastel-green d-flex align-items-center gap-1">
          <i class="bi bi-pencil"></i>
        </a>
        <button onclick="eliminarProducto(${p.PRD_ID})" class="btn btn-sm d-flex align-items-center gap-1" style="background-color:#f8d7da; color:#721c24; border:none;">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
    contenedor.appendChild(row);
  });
}

// BUSCAR
$(document).on("submit", "#buscarProductoForm", function (e) {
  e.preventDefault();
  const query = $("#buscarInput").val().trim().toLowerCase();
  if (!query) {
    renderProductos(productos);
  } else {
    const resultados = productos.filter(p =>
      p.PRD_NOMBRE.toLowerCase().includes(query)
    );
    renderProductos(resultados);
  }
});

// CRUD Helpers

function crearProducto(producto) {
  $.ajax({
    url: API_BASE_URL,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(producto),
    success: function () {
      alert("Producto creado correctamente");
      window.location.href = "Index.html";
    },
    error: function (xhr, status, error) {
      console.error("Error al crear producto:", error);
    }
  });
}

function actualizarProducto(id, producto) {
  $.ajax({
    url: `${API_BASE_URL}/${id}`,
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(producto),
    success: function () {
      alert("Producto actualizado correctamente");
      window.location.href = "Index.html";
    },
    error: function (xhr, status, error) {
      console.error("Error al actualizar producto:", error);
    }
  });
}

function eliminarProducto(id) {
  if (confirm(`¿Estás seguro de eliminar el producto #${id}?`)) {
    $.ajax({
      url: `${API_BASE_URL}/${id}`,
      method: 'DELETE',
      success: function () {
        alert('Producto eliminado correctamente.');
        location.reload();
      },
      error: function () {
        alert('Error al eliminar el producto.');
      }
    });
  }
}

async function cargarCategoriasYAnimales() {
  try {
    const [categoriasRes, animalesRes] = await Promise.all([
      fetch(`${API_BASE_URL}/categorias`),
      fetch(`${API_BASE_URL}/tipos-animal`)
    ]);
    const categorias = await categoriasRes.json();
    const animales = await animalesRes.json();

    const catSelect = document.getElementById('categoriasSelect');
    const aniSelect = document.getElementById('animalesSelect');

    categorias.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.CAT_ID;
      option.textContent = cat.CAT_DESCRIPCION;
      catSelect.appendChild(option);
    });

    animales.forEach(animal => {
      const option = document.createElement('option');
      option.value = animal.T_ANIMAL_ID;
      option.textContent = animal.T_ANIMAL_DES;
      aniSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error cargando categorías y animales:', error);
  }
}

function cargarProductoPorId(id) {
  fetch(`${API_BASE_URL}/${id}`)
    .then(res => res.json())
    .then(producto => {
      const form = document.getElementById('editarProductoForm');
      if (!form) return;

      form.querySelector('[name="PRD_NOMBRE"]').value = producto.PRD_NOMBRE || '';
      form.querySelector('[name="PRD_PRECIO"]').value = producto.PRD_PRECIO || '';
      form.querySelector('[name="PRD_DESCRIPCION"]').value = producto.PRD_DESCRIPCION || '';
      form.querySelector('[name="PRD_STOCK"]').value = producto.PRD_STOCK || '';
      form.querySelector('[name="PRD_IMAGEN"]').value = producto.PRD_IMAGEN || '';
      form.querySelector('[name="PRD_ESTADO"]').value = producto.PRD_ESTADO || 'ACT';

      setTimeout(() => {
        form.querySelector('[name="CAT_ID"]').value = producto.CAT_ID || '';
        form.querySelector('[name="T_ANIMAL_ID"]').value = producto.T_ANIMAL_ID || '';
      }, 300);
    })
    .catch(err => {
      console.error('Error al cargar producto:', err);
      alert('Error al cargar datos del producto');
    });
}
