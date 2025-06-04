document.addEventListener('DOMContentLoaded', () => {
  fetch('/public/components/header.html')
    .then(res => res.ok ? res.text() : '')
    .then(html => {
      const header = document.getElementById('header-placeholder');
      if (header) header.innerHTML = html;
    });

  fetch('/public/components/footer.html')
    .then(res => res.ok ? res.text() : '')
    .then(html => {
      const footer = document.getElementById('footer-placeholder');
      if (footer) footer.innerHTML = html;
    });
});
document.addEventListener("DOMContentLoaded", () => {
  fetch('/public/components/header.html')
    .then(res => res.ok ? res.text() : '')
    .then(html => {
      const header = document.getElementById('header-placeholder');
      if (header) {
        header.innerHTML = html;

        // Manejo de búsqueda global según la página actual
        const form = document.getElementById("buscarForm");
        if (form) {
          form.addEventListener("submit", function (e) {
            e.preventDefault();
            const query = document.getElementById("buscarInput").value.trim().toLowerCase();

            if (!query) return;

            const currentPage = window.location.pathname;

            if (currentPage.includes("Productos/Index.html")) {
              filtrarProductos(query);
            } else if (currentPage.includes("Clientes/Index.html")) {
              filtrarClientes(query);
            } else if (currentPage.includes("Facturas/Index.html")) {
              filtrarFacturas(query);
            }
          });
        }
      }
    });

  fetch('/public/components/footer.html')
    .then(res => res.ok ? res.text() : '')
    .then(html => {
      const footer = document.getElementById('footer-placeholder');
      if (footer) footer.innerHTML = html;
    });
});
