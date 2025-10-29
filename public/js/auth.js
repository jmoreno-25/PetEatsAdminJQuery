// Servicio de autenticación
class AuthService {
    static getToken() {
        return localStorage.getItem('authToken');
    }

    static isAuthenticated() {
        return !!this.getToken();
    }

    static logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    }

    static checkAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    static getAuthHeaders() {
        const token = this.getToken();
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }

    static async makeAuthenticatedRequest(url, options = {}) {
        if (!this.isAuthenticated()) {
            this.logout();
            return null;
        }

        const headers = {
            ...this.getAuthHeaders(),
            ...options.headers
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (response.status === 401) {
                // Token expirado o inválido
                this.logout();
                return null;
            }

            return response;
        } catch (error) {
            console.error('Error en petición autenticada:', error);
            throw error;
        }
    }
}

// Funciones de tema
function setTheme(theme) {
    localStorage.setItem('theme', theme);
    applyTheme();
    updateThemeButtons();
}

function applyTheme() {
    const theme = localStorage.getItem('theme') || 'system';
    let actualTheme = theme;

    if (theme === 'system') {
        actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    console.log('🎨 Aplicando tema:', actualTheme);
    
    // Remover atributos anteriores
    document.documentElement.removeAttribute('data-theme');
    document.body.removeAttribute('data-theme');
    
    // Remover CSS de tema oscuro si existe
    const existingDarkTheme = document.getElementById('dark-theme-css');
    if (existingDarkTheme) {
        existingDarkTheme.remove();
        console.log('🗑️ CSS de tema oscuro anterior removido');
    }
    
    // Aplicar el nuevo tema
    document.documentElement.setAttribute('data-theme', actualTheme);
    document.body.setAttribute('data-theme', actualTheme);
    
    // REMOVER CLASES DE BOOTSTRAP QUE INTERFIEREN CON EL TEMA
    document.body.classList.remove('bg-light', 'bg-white');
    
    if (actualTheme === 'dark') {
        // Cargar CSS de tema oscuro dinámicamente
        const darkThemeLink = document.createElement('link');
        darkThemeLink.id = 'dark-theme-css';
        darkThemeLink.rel = 'stylesheet';
        darkThemeLink.href = '/public/css/dark-theme.css';
        darkThemeLink.onload = function() {
            console.log('✅ CSS de tema oscuro cargado exitosamente');
            
            // Remover clases problemáticas de otros elementos también
            const elementsWithBgLight = document.querySelectorAll('.bg-light, .bg-white');
            elementsWithBgLight.forEach(el => {
                if (el !== document.body) { // Ya removimos del body arriba
                    el.classList.add('dark-theme-override');
                }
            });
        };
        darkThemeLink.onerror = function() {
            console.error('❌ Error cargando CSS de tema oscuro');
        };
        document.head.appendChild(darkThemeLink);
        console.log('🌙 Cargando CSS de tema oscuro...');
    } else {
        console.log('☀️ Tema claro aplicado (sin CSS adicional)');
        // En tema claro, restaurar las clases originales si es necesario
        const elementsWithOverride = document.querySelectorAll('.dark-theme-override');
        elementsWithOverride.forEach(el => {
            el.classList.remove('dark-theme-override');
        });
    }
    
    console.log('✅ Tema aplicado:', actualTheme);
}

function updateThemeButtons() {
    const currentTheme = localStorage.getItem('theme') || 'system';
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const lightBtn = document.querySelector('[onclick="setTheme(\'light\')"]');
    const darkBtn = document.querySelector('[onclick="setTheme(\'dark\')"]');
    const systemBtn = document.querySelector('[onclick="setTheme(\'system\')"]');

    if (currentTheme === 'light' && lightBtn) {
        lightBtn.classList.add('active');
    } else if (currentTheme === 'dark' && darkBtn) {
        darkBtn.classList.add('active');
    } else if (systemBtn) {
        systemBtn.classList.add('active');
    }
}

// Verificar autenticación en todas las páginas (excepto login)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tema en todas las páginas
    applyTheme();
    updateThemeButtons();

    // Escuchar cambios en el tema del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
        if (localStorage.getItem('theme') === 'system') {
            applyTheme();
        }
    });

    // No verificar autenticación en la página de login
    if (window.location.pathname.includes('login.html')) {
        return;
    }

    // Verificar si está autenticado
    if (!AuthService.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    // Los botones de tema y logout ahora están en el HTML, solo actualizar el tema
    setTimeout(updateThemeButtons, 100);
});