let productos = [];
const API_BASE_URL = "https://delirio.runasp.net/api/producto"; // Para POST, PUT, DELETE
const API_LIST_URL = "https://delirio.runasp.net/api/productos"; // Para GET (listar)

$(document).ready(async function () {
  await cargarProductos();
});

async function cargarProductos() {
  try {
    const response = await AuthService.makeAuthenticatedRequest(API_LIST_URL);
    if (response && response.ok) {
      productos = await response.json();
      renderProductos(productos);
    } else {
      console.error("Error al cargar productos");
      mostrarError("Error al cargar productos");
    }
  } catch (error) {
    console.error("Error:", error);
    mostrarError("Error de conexión");
  }
}

function renderProductos(lista) {
  const contenedor = document.getElementById("productosBody");
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const row = document.createElement("div");
    row.className = "card shadow-sm border-0 p-3 d-flex flex-md-row align-items-center gap-3";
    row.style.backgroundColor = "#fdfdfd";

    let estadoBadge = '';

    if (p.estado === 'ACT') {
      estadoBadge = '<span class="badge bg-success">Activo</span>';
    } else if (p.estado === 'INA') {
      estadoBadge = '<span class="badge bg-secondary">Inactivo</span>';
    }

    // Usar primera imagen del array o placeholder
    const imagenPrincipal = (p.imagenes && p.imagenes.length > 0) ? p.imagenes[0] : 'https://via.placeholder.com/110x110?text=Sin+Imagen';

    row.innerHTML = `
      <div class="text-center">
        <img src="${imagenPrincipal}" alt="${p.nombre}" style="width: 110px; height: 110px; object-fit: cover; border-radius: 8px;" onerror="this.src='https://via.placeholder.com/110x110?text=Sin+Imagen'" />
      </div>

      <div class="flex-grow-1">
        <h5 class="mb-2 fw-bold" style="color: var(--kMorado);">${p.nombre}</h5>
        <div class="row">
          <div class="col-md-6"><strong>ID:</strong> ${p.id}</div>
          <div class="col-md-6"><strong>Stock:</strong> ${p.stock}</div>
          <div class="col-md-6"><strong>Precio:</strong> $${parseFloat(p.precio).toFixed(2)}</div>
          <div class="col-md-6"><strong>Categoría:</strong> ${p.categoria}</div>
          <div class="col-md-12"><strong>Descripción:</strong> ${p.descripcion}</div>
          <div class="col-md-12 mt-2">${estadoBadge}</div>
        </div>
      </div>

      <div class="d-flex flex-column gap-2 justify-content-center align-items-end">
        <button onclick="abrirModalEditar(${p.id})" class="btn btn-sm d-flex align-items-center gap-1" style="background-color: var(--kMoradoClaro); color: white; border: none;" title="Editar producto">
          <i class="bi bi-pencil"></i>
        </button>
        <button onclick="eliminarProducto(${p.id})" class="btn btn-sm d-flex align-items-center gap-1" style="background-color: var(--kFucsia); color: white; border: none;">
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
      p.nombre.toLowerCase().includes(query) ||
      p.descripcion.toLowerCase().includes(query) ||
      p.categoria.toLowerCase().includes(query) ||
      p.id.toString().includes(query)
    );
    renderProductos(resultados);
  }
});

// CRUD Helpers (las funciones están al final del archivo)

async function eliminarProducto(id) {
  if (confirm(`¿Estás seguro de eliminar el producto #${id}?`)) {
    try {
      const response = await AuthService.makeAuthenticatedRequest(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });

      if (response && response.ok) {
        alert('Producto eliminado correctamente.');
        await cargarProductos(); // Recargar lista
      } else {
        alert('Error al eliminar el producto.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el producto.');
    }
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
      form.querySelector('[name="PRD_IMAGEN2"]').value = producto.PRD_IMAGEN2 || '';
      form.querySelector('[name="PRD_IMAGEN3"]').value = producto.PRD_IMAGEN3 || '';
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

// Eventos y funciones para el modal
$(document).ready(function() {
  // Evento para abrir modal de crear
  $('#btnCrearProducto').click(function() {
    abrirModalCrear();
  });
  
  // Evento para guardar producto
  $('#btnGuardar').click(function() {
    guardarProducto();
  });
  
  // Evento para preview de imágenes
  $('#imagenesArchivos').change(function() {
    mostrarPreviewImagenes(this.files);
  });
});

function abrirModalCrear() {
  console.log('Abriendo modal crear');
  $('#productoModalLabel').text('Crear Producto');
  $('#btnTexto').text('Crear Producto');
  $('#productoId').val('');
  $('#productoForm')[0].reset();
  $('#previewImagenes').empty();
  $('#productoModal').modal('show');
}

function abrirModalEditar(id) {
  console.log('Abriendo modal editar para ID:', id);
  $('#productoModalLabel').text('Editar Producto');
  $('#btnTexto').text('Actualizar Producto');
  $('#productoId').val(id);
  
  // Buscar el producto en la lista
  const producto = productos.find(p => p.id === id);
  console.log('Producto encontrado:', producto);
  if (producto) {
    $('#nombre').val(producto.nombre);
    $('#precio').val(producto.precio);
    $('#stock').val(producto.stock);
    $('#categoria').val(producto.categoria);
    $('#descripcion').val(producto.descripcion || '');
    $('#estado').val(producto.estado);
    
    // Construir URLs de imágenes del array
    const imagenesUrls = producto.imagenes ? producto.imagenes.join(', ') : '';
    $('#imagenesUrls').val(imagenesUrls);
    
    // Limpiar preview y archivo
    $('#previewImagenes').empty();
    $('#imagenesArchivos').val('');
  }
  
  $('#productoModal').modal('show');
}

async function guardarProducto() {
  console.log('Guardando producto...');
  const form = $('#productoForm')[0];
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const id = $('#productoId').val();
  let imagen1 = '';
  let imagen2 = '';

  // Verificar qué tab está activo
  const tabArchivos = $('#archivos').hasClass('active');
  
  if (tabArchivos) {
    // Usar archivos subidos (convertir a URL si es necesario)
    const files = document.getElementById('imagenesArchivos').files;
    if (files.length > 0) {
      // Por ahora usar placeholder - en producción se subiría a un servicio
      imagen1 = 'https://via.placeholder.com/400x400?text=Imagen+Subida';
      if (files.length > 1) {
        imagen2 = 'https://via.placeholder.com/400x400?text=Imagen+2+Subida';
      }
    }
  } else {
    // Usar URLs
    const imagenesTexto = $('#imagenesUrls').val().trim();
    if (imagenesTexto) {
      const urls = imagenesTexto.split(',').map(url => url.trim());
      imagen1 = urls[0] || '';
      imagen2 = urls[1] || '';
    }
  }

  const producto = {
    CAT_ID: parseInt($('#categoria').val()),
    PRD_NOMBRE: $('#nombre').val(),
    PRD_DESCRIPCION: $('#descripcion').val(),
    PRD_PRECIO: parseFloat($('#precio').val()),
    PRD_STOCK: parseInt($('#stock').val()),
    PRD_IMAGEN: imagen1,
    PRD_IMAGEN2: imagen2,
    PRD_ESTADO: $('#estado').val()
  };

  console.log('Datos del producto:', producto);

  try {
    $('#btnGuardar').prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Guardando...');

    let response;
    if (id) {
      // Actualizar producto existente
      response = await AuthService.makeAuthenticatedRequest(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(producto)
      });
    } else {
      // Crear nuevo producto
      response = await AuthService.makeAuthenticatedRequest(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(producto)
      });
    }

    if (response && response.ok) {
      alert(id ? 'Producto actualizado correctamente' : 'Producto creado correctamente');
      $('#productoModal').modal('hide');
      await cargarProductos(); // Recargar lista
    } else {
      const errorData = await response.json().catch(() => ({}));
      alert('Error al guardar el producto: ' + (errorData.message || 'Error desconocido'));
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al guardar el producto');
  } finally {
    $('#btnGuardar').prop('disabled', false).html(id ? 'Actualizar Producto' : 'Crear Producto');
  }
}

// Función para mostrar errores
function mostrarError(mensaje) {
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-danger alert-dismissible fade show mt-3';
  alertDiv.innerHTML = `
    <i class="bi bi-exclamation-triangle me-2"></i>
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  const container = document.querySelector('.main-content .card');
  if (container) {
    container.insertBefore(alertDiv, container.firstChild);
  }
}

// Funciones CRUD para el modal
function crearProducto(producto) {
  $.ajax({
    url: API_BASE_URL,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(producto),
    success: function () {
      alert("Producto creado correctamente");
      $('#productoModal').modal('hide');
      // Recargar la lista de productos
      cargarProductos();
    },
    error: function (xhr, status, error) {
      console.error("Error al crear producto:", error);
      alert("Error al crear el producto");
    },
    complete: function() {
      // Restaurar botón
      $('#btnGuardar').prop('disabled', false).html('<span id="btnTexto">Crear Producto</span>');
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
      $('#productoModal').modal('hide');
      // Recargar la lista de productos
      cargarProductos();
    },
    error: function (xhr, status, error) {
      console.error("Error al actualizar producto:", error);
      alert("Error al actualizar el producto");
    },
    complete: function() {
      // Restaurar botón
      $('#btnGuardar').prop('disabled', false).html('<span id="btnTexto">Actualizar Producto</span>');
    }
  });
}

// Función para recargar productos
function cargarProductos() {
  $.ajax({
    url: API_LIST_URL,
    method: 'GET',
    success: function (data) {
      productos = data;
      renderProductos(productos);
    },
    error: function (xhr, status, error) {
      console.error("Error al cargar productos:", error);
    }
  });
}

// Función para mostrar preview de imágenes
function mostrarPreviewImagenes(files) {
  const preview = $('#previewImagenes');
  preview.empty();
  
  if (files.length === 0) return;
  
  Array.from(files).forEach((file, index) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = $(`
          <div class="position-relative">
            <img src="${e.target.result}" class="img-thumbnail" style="width: 80px; height: 80px; object-fit: cover;">
            <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle" 
                    style="width: 20px; height: 20px; padding: 0; font-size: 10px;" 
                    onclick="eliminarImagenPreview(${index})">×</button>
          </div>
        `);
        preview.append(img);
      };
      reader.readAsDataURL(file);
    }
  });
}

// Función para eliminar imagen del preview
function eliminarImagenPreview(index) {
  const input = document.getElementById('imagenesArchivos');
  const dt = new DataTransfer();
  const files = input.files;
  
  for (let i = 0; i < files.length; i++) {
    if (i !== index) {
      dt.items.add(files[i]);
    }
  }
  
  input.files = dt.files;
  mostrarPreviewImagenes(input.files);
}

// Función para convertir archivos a base64
function convertirArchivosABase64(files) {
  return Promise.all(
    Array.from(files).map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    })
  );
}

// Función para subir imágenes a un servicio (simulada)
async function subirImagenes(files) {
  try {
    // Aquí podrías integrar con un servicio real como Cloudinary, AWS S3, etc.
    // Por ahora, simularemos URLs
    const urls = [];
    
    for (let i = 0; i < files.length; i++) {
      // Simulamos una URL (en producción esto vendría del servicio de subida)
      const timestamp = Date.now();
      const fileName = files[i].name.replace(/[^a-zA-Z0-9.-]/g, '_');
      urls.push(`https://ejemplo.com/uploads/${timestamp}_${fileName}`);
    }
    
    return urls;
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    throw error;
  }
}
