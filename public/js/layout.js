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