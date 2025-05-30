let productos = [];
const API_BASE_URL = "http://backendpeteats.runasp.net/api/productos";

document.getElementById("buscarProductoForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const query = document.getElementById("buscarInput").value.toLowerCase();
        const resultados = productos.filter(p => p.PRD_NOMBRE.toLowerCase().includes(query));
        renderProductos(resultados);
});

$(document).ready(function () {
  $.ajax({
    url: API_BASE_URL,
    method: 'GET',
    success: function (data) {
      productos = data;
      renderProductos(productos);
      configurarBuscador();
    },
    error: function (xhr, status, error) {
      console.error("Error al cargar productos:", error);
    }
  });
});

function configurarBuscador() {
  $("#buscarProductoForm").on("submit", function (e) {
    e.preventDefault();
    const query = $("#buscarInput").val().toLowerCase();
    const resultados = productos.filter(p =>
      p.PRD_NOMBRE.toLowerCase().includes(query)
    );
    renderProductos(resultados);
  });
}

function renderProductos(lista) {
  const tbody = $("#productosBody");
  tbody.empty();

  lista.forEach(p => {
    const row = $(`
      <tr>
        <td>${p.PRD_ID}</td>
        <td>${p.PRD_NOMBRE}</td>
        <td>${p.PRD_DESCRIPCION}</td>
        <td><img src="${p.PRD_IMAGEN}" alt="${p.PRD_NOMBRE}" style="width:150px;height:145px;"></td>
        <td>${p.PRD_STOCK}</td>
        <td>$${p.PRD_PRECIO.toFixed(2)}</td>
        <td>${p.CAT_DESCRIPCION}</td>
        <td>${p.T_ANIMAL_DES}</td>
        <td>${p.PRD_ESTADO === "ACT" ? "Activo" : "Inactivo"}</td>
        <td>
          <div class="acciones-botones">
            <a href="Crear.html">➕</a> |
            <a href="Editar.html?id=${p.PRD_ID}">✏️</a> |
            <button onclick="eliminarProducto(${p.PRD_ID})" style="background:none; border:none; color:red; cursor:pointer;">🗑️</button>
          </div>
        </td>
      </tr>
    `);
    tbody.append(row);
  });
}

function crearProducto(producto) {
  $.ajax({
    url: API_BASE_URL,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(producto),
    success: function (data) {
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
    success: function (data) {
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


