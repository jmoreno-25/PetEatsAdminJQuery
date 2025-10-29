# Sistema de Administración DeLirio

Sistema web de administración para la tienda de flores DeLirio, desarrollado con jQuery y Bootstrap.

## 🚀 Características

- **Sistema de Login**: Autenticación con JWT tokens
- **Gestión de Productos**: CRUD completo con API real
- **Gestión de Clientes**: Sistema de modales con datos quemados
- **Gestión de Pedidos**: Estados: pendiente, confirmado, pagado, entregado, rechazado
- **Estadísticas**: Gráficos con datos quemados
- **Diseño Responsivo**: Bootstrap 5 con tema personalizado (colores morado/fucsia)

## 🎨 Colores del Sistema

- **Morado Principal**: `--kMorado: #6A4C93`
- **Fucsia**: `--kFucsia: #C44569`
- **Morado Claro**: `--kMoradoClaro: #8B7EC8`
- **Rosa Claro**: `--kRosaClaro: #E056A5`

## 🔧 APIs Utilizadas

### Autenticación
- **POST** `https://delirio.runasp.net/api/auth/login`
  ```json
  {
    "username": "usuario",
    "password": "contraseña"
  }
  ```

### Productos
- **GET** `https://delirio.runasp.net/api/producto` - Listar productos
- **POST** `https://delirio.runasp.net/api/producto` - Crear producto
  ```json
  {
    "CAT_ID": 1,
    "PRD_NOMBRE": "Ramo San Valentín",
    "PRD_DESCRIPCION": "Ramo bonito",
    "PRD_PRECIO": 15.00,
    "PRD_STOCK": 10,
    "PRD_IMAGEN": "https://ejemplo.com/imagen1.jpg",
    "PRD_IMAGEN2": "https://ejemplo.com/imagen2.jpg",
    "PRD_ESTADO": "ACT"
  }
  ```
- **PUT** `https://delirio.runasp.net/api/producto/{id}` - Actualizar producto
- **DELETE** `https://delirio.runasp.net/api/producto/{id}` - Eliminar producto

## 📁 Estructura del Proyecto

```
├── login.html                 # Página de login
├── index.html                 # Dashboard principal
├── public/
│   ├── css/
│   │   └── style.css         # Estilos personalizados
│   ├── js/
│   │   ├── auth.js           # Servicio de autenticación
│   │   ├── productos.js      # Gestión de productos (API real)
│   │   ├── clientes.js       # Gestión de clientes (datos quemados)
│   │   ├── pedidos.js        # Gestión de pedidos (datos quemados)
│   │   └── estadistica.js    # Gráficos (datos quemados)
│   └── pages/
│       ├── Productos/
│       │   └── Index.html    # Lista de productos con modales
│       ├── Clientes/
│       │   └── Index.html    # Lista de clientes con modales
│       ├── Pedidos/
│       │   ├── Index.html    # Lista de pedidos
│       │   └── Detalles.html # Detalles de pedido
│       └── Estadisticas/
│           └── Index.html    # Dashboard con gráficos
```

## 🔐 Sistema de Autenticación

1. **Login**: Acceso con usuario y contraseña
2. **Token JWT**: Se almacena en localStorage
3. **Verificación**: Todas las páginas verifican autenticación automáticamente
4. **Logout**: Opción disponible en el sidebar
5. **Redirección**: Si no está autenticado, redirige a login

## 💾 Datos del Sistema

### Productos
- **Fuente**: API real (`https://delirio.runasp.net/api/producto`)
- **Autenticación**: Requerida (Bearer Token)
- **Operaciones**: CRUD completo

### Clientes
- **Fuente**: Datos quemados (7 clientes de ejemplo)
- **Operaciones**: CRUD simulado con modales
- **Estados**: Activo/Inactivo

### Pedidos
- **Fuente**: Datos quemados (5 pedidos de ejemplo)
- **Estados**: pendiente, confirmado, pagado, entregado, rechazado
- **Comprobantes**: Enlaces a Google Drive

### Estadísticas
- **Fuente**: Datos quemados
- **Gráficos**: Chart.js con colores del tema
- **Tipos**: Doughnut (productos por categoría), Bar (ventas mensuales)

## 🛠️ Instalación y Uso

1. **Clonar o descargar** el proyecto
2. **Servir archivos** con un servidor web (ej: Live Server, XAMPP, etc.)
3. **Acceder a** `login.html`
4. **Credenciales**: Usar las credenciales válidas de la API
5. **Navegación**: Una vez autenticado, acceso completo al sistema

## 📱 Funcionalidades por Módulo

### Productos
- ✅ Lista con imágenes y detalles
- ✅ Modal de creación con tabs (archivo/URL)
- ✅ Modal de edición con datos prellenados
- ✅ Eliminación con confirmación
- ✅ Búsqueda por nombre/descripción/ID
- ✅ Estados: Activo/Inactivo
- ✅ Categorías: Ramos(1)/Arreglos(2)/Peluches(3)

### Clientes
- ✅ Lista con información completa
- ✅ Modal de creación
- ✅ Modal de edición
- ✅ Modal de detalles
- ✅ Eliminación con confirmación
- ✅ Búsqueda por cédula/nombre/apellido
- ✅ Estados: Activo/Inactivo

### Pedidos
- ✅ Lista con información detallada
- ✅ Estados con badges de colores
- ✅ Enlaces a comprobantes
- ✅ Página de detalles completa
- ✅ Actualización de estado
- ✅ Búsqueda por ID/cliente

### Estadísticas
- ✅ Gráfico circular (productos por categoría)
- ✅ Gráfico de barras (ventas mensuales)
- ✅ Colores del tema corporativo
- ✅ Datos de ejemplo realistas

## 🔧 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS**: Bootstrap 5.3.3
- **Librería JS**: jQuery 3.6.0
- **Gráficos**: Chart.js + chartjs-plugin-datalabels
- **Iconos**: Bootstrap Icons
- **APIs**: Fetch API con autenticación JWT

## ⚙️ Configuración

### Variables CSS (style.css)
```css
:root {
  --kMorado: #6A4C93;
  --kFucsia: #C44569;
  --kMoradoClaro: #8B7EC8;
  --kRosaClaro: #E056A5;
}
```

### APIs Base
```javascript
const API_BASE_URL = "https://delirio.runasp.net/api/producto";
const AUTH_API = "https://delirio.runasp.net/api/auth/login";
```

## 📋 Notas Importantes

1. **Autenticación Requerida**: El sistema verifica automáticamente el login
2. **Token Expiration**: Si el token expira, redirige automáticamente al login
3. **Datos Mixtos**: Productos usan API real, otros módulos usan datos quemados
4. **Responsive Design**: Compatible con dispositivos móviles y desktop
5. **Error Handling**: Manejo de errores en todas las operaciones

## 🚀 Próximas Mejoras

- [ ] Integrar APIs reales para clientes y pedidos
- [ ] Sistema de subida de imágenes real
- [ ] Paginación en listas largas
- [ ] Filtros avanzados
- [ ] Exportación de datos
- [ ] Notificaciones push