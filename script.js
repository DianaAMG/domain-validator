// Dominios comunes y sus variaciones incorrectas
const domainSuggestions = {
    // Gmail
    'gmail.com': ['gimail.com','jimail.com','gnail.com','gmial.com','gmial.com', 'gmail.co', 'gmail.coom', 'gmai.com', 'gmail.cm', 'gmial.co', 'gmaill.com', 'gmail.mx', 'gmail.es', 'gmail.org', 'gmail.net', 'gmaiil.com', 'gmaill.co', 'gmial.mx', 'gmail.co.uk', 'gmail.fr', 'gmail.de','yimail.com','yimial.com', 'yimail.co', 'yimail.coom', 'yimai.com', 'yimail.cm', 'yimial.co', 'yimaill.com', 'yimail.mx', 'yimail.es', 'yimail.org', 'yimail.net', 'yimaiil.com', 'yimaill.co', 'yimial.mx', 'yimail.co.uk', 'yimail.fr', 'yimail.de'],
    
    // Hotmail
    'hotmail.com': ['hotmial.com', 'hotmail.co', 'hotmail.coom', 'hotmai.com', 'hotmail.cm', 'hotmial.co', 'hotmaill.com', 'hotmail.mx', 'hotmail.es', 'hotmail.org', 'hotmail.net', 'hotmaiil.com', 'hotmaill.co', 'hotmial.mx', 'hotmail.co.uk', 'hotmail.fr', 'hotmail.de'],
    
    // Outlook
    'outlook.com': ['outlok.com', 'outlook.co', 'outlook.coom', 'outloo.com', 'outlook.cm', 'outlok.co', 'outlookk.com', 'outlook.mx', 'outlook.es', 'outlook.org', 'outlook.net', 'outloook.com', 'outlook.co.uk', 'outlook.fr', 'outlook.de'],
    
    // Yahoo
    'yahoo.com': ['yaho.com', 'yahoo.co', 'yahoo.coom', 'yahooo.com', 'yahoo.cm', 'yaho.co', 'yahoo.comm', 'yahoo.mx', 'yahoo.es', 'yahoo.org', 'yahoo.net', 'yahooo.co', 'yahoo.co.uk', 'yahoo.fr', 'yahoo.de'],

   
    // Dominios .co
    'gmail.co': ['gmial.co', 'gmail.com', 'gmail.coom', 'gmai.co', 'gmail.cm', 'gmaill.co', 'gmail.mx', 'gmail.es'],
    'hotmail.co': ['hotmial.co', 'hotmail.com', 'hotmail.coom', 'hotmai.co', 'hotmail.cm', 'hotmaill.co', 'hotmail.mx', 'hotmail.es'],
    'outlook.co': ['outlok.co', 'outlook.com', 'outlook.coom', 'outloo.co', 'outlook.cm', 'outlookk.co', 'outlook.mx', 'outlook.es'],
    'yahoo.co': ['yaho.co', 'yahoo.com', 'yahoo.coom', 'yahooo.co', 'yahoo.cm', 'yahoo.comm', 'yahoo.mx', 'yahoo.es'],
    
    // Dominios .mx
    'gmail.mx': ['gmial.mx', 'gmail.com', 'gmail.co', 'gmai.mx', 'gmail.cm', 'gmaill.mx', 'gmail.es'],
    'hotmail.mx': ['hotmial.mx', 'hotmail.com', 'hotmail.co', 'hotmai.mx', 'hotmail.cm', 'hotmaill.mx', 'hotmail.es'],
    'outlook.mx': ['outlok.mx', 'outlook.com', 'outlook.co', 'outloo.mx', 'outlook.cm', 'outlookk.mx', 'outlook.es'],
    'yahoo.mx': ['yaho.mx', 'yahoo.com', 'yahoo.co', 'yahooo.mx', 'yahoo.cm', 'yahoo.comm', 'yahoo.es'],
    
    // Dominios .es
    'gmail.es': ['gmial.es', 'gmail.com', 'gmail.co', 'gmai.es', 'gmail.cm', 'gmaill.es', 'gmail.mx'],
    'hotmail.es': ['hotmial.es', 'hotmail.com', 'hotmail.co', 'hotmai.es', 'hotmail.cm', 'hotmaill.es', 'hotmail.mx'],
    'outlook.es': ['outlok.es', 'outlook.com', 'outlook.co', 'outloo.es', 'outlook.cm', 'outlookk.es', 'outlook.mx'],
    'yahoo.es': ['yaho.es', 'yahoo.com', 'yahoo.co', 'yahooo.es', 'yahoo.cm', 'yahoo.comm', 'yahoo.mx'],
    
    
    // Otros dominios populares
    'icloud.com': ['icloud.co', 'icloud.coom', 'icloud.cm', 'icloud.mx', 'icloud.es', 'icloud.org', 'icloud.net', 'icloud.co.uk', 'icloud.fr', 'icloud.de', 'icloudd.com', 'icloudd.co'],
    'protonmail.com': ['protonmail.co', 'protonmail.coom', 'protonmail.cm', 'protonmail.mx', 'protonmail.es', 'protonmail.org', 'protonmail.net', 'protonmaiil.com', 'protonmaill.com'],
    'live.com': ['live.co', 'live.coom', 'live.cm', 'live.mx', 'live.es', 'live.org', 'live.net', 'live.co.uk', 'live.fr', 'live.de', 'livee.com', 'livee.co'],
    'aol.com': ['aol.co', 'aol.coom', 'aol.cm', 'aol.mx', 'aol.es', 'aol.org', 'aol.net', 'aol.co.uk', 'aol.fr', 'aol.de', 'aoll.com', 'aoll.co'],
    'zoho.com': ['zoho.co', 'zoho.coom', 'zoho.cm', 'zoho.mx', 'zoho.es', 'zoho.org', 'zoho.net', 'zoho.co.uk', 'zoho.fr', 'zoho.de', 'zohoo.com', 'zohoo.co']
};

// Función para detectar errores en el dominio
function detectDomainError(email) {
    if (!email || !email.includes('@')) return null;
    
    const domain = email.split('@')[1].toLowerCase();
    
    // Buscar coincidencias exactas primero
    for (const [correctDomain, variations] of Object.entries(domainSuggestions)) {
        if (variations.includes(domain)) {
            return {
                original: email,
                corrected: email.replace(domain, correctDomain),
                correctDomain: correctDomain
            };
        }
    }
    
    // Buscar coincidencias parciales (para casos más complejos)
    for (const [correctDomain, variations] of Object.entries(domainSuggestions)) {
        for (const variation of variations) {
            if (domain.includes(variation.replace('.com', '')) || 
                variation.replace('.com', '').includes(domain.replace('.com', ''))) {
                return {
                    original: email,
                    corrected: email.replace(domain, correctDomain),
                    correctDomain: correctDomain
                };
            }
        }
    }
    
    return null;
}

// Función para mostrar sugerencias
function showEmailSuggestions(email) {
    const suggestionsContainer = document.getElementById('emailSuggestions');
    const error = detectDomainError(email);
    
    // Limpiar sugerencias anteriores completamente
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
    
    if (error) {
        const suggestionHTML = `
            <div class="suggestion-card">
                <div class="suggestion-content">
                    <p class="suggestion-title">¿Quisiste decir?</p>
                    <p class="suggestion-email">${error.corrected}</p>
                </div>
                <div class="suggestion-actions">
                    <button type="button" class="suggestion-btn" onclick="applySuggestion('${error.corrected}')">
                        Sí
                    </button>
                    <button type="button" class="suggestion-btn secondary" onclick="dismissSuggestion()">
                        No
                    </button>
                </div>
            </div>
        `;
        suggestionsContainer.innerHTML = suggestionHTML;
        suggestionsContainer.style.display = 'block';
    }
}

// Función para aplicar la sugerencia
function applySuggestion(correctedEmail) {
    const emailInput = document.getElementById('email');
    emailInput.value = correctedEmail;
    
    // Ocultar sugerencias después de aplicar
    const suggestionsContainer = document.getElementById('emailSuggestions');
    suggestionsContainer.style.display = 'none';
    
    // Agregar efecto visual de confirmación
    emailInput.style.borderColor = '#00BFA5';
    emailInput.style.backgroundColor = '#F0FDFA';
    
    setTimeout(() => {
        emailInput.style.borderColor = '';
        emailInput.style.backgroundColor = '';
    }, 2000);
}

// Función para descartar la sugerencia
function dismissSuggestion() {
    const suggestionsContainer = document.getElementById('emailSuggestions');
    suggestionsContainer.style.display = 'none';
}

// Función para validar formato de email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar/ocultar contraseña
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const form = document.getElementById('contactForm');
    
    // Event listener para el campo de email - mostrar sugerencia al completar el dominio
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        
        // Siempre limpiar sugerencias anteriores primero
        document.getElementById('emailSuggestions').style.display = 'none';
        
        // Verificar si el email tiene @ y termina con un dominio válido
        // Acepta dominios como: .com, .co, .mx, .es, .org, .net, .edu, etc.
        if (email.includes('@') && /@[^@]*\.[a-zA-Z]{2,}$/.test(email)) {
            // Pequeño delay para evitar sugerencias mientras se escribe
            setTimeout(() => {
                // Verificar que el email no haya cambiado mientras esperábamos
                if (this.value.trim() === email) {
                    showEmailSuggestions(email);
                }
            }, 300);
        }
    });
    
    // Event listener para el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validaciones
        if (!validateEmail(data.email)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }
        
        if (data.password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        
        // Simular envío exitoso
        alert('¡Cuenta creada exitosamente!\n\nDatos:\n' + 
              `Email: ${data.email}\n` +
              `Contraseña: ${'*'.repeat(data.password.length)}`);
        
        // Limpiar formulario
        form.reset();
        document.getElementById('emailSuggestions').style.display = 'none';
    });
    
    // Event listener para ocultar sugerencias al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.email-group') && !e.target.closest('.suggestion-card')) {
            document.getElementById('emailSuggestions').style.display = 'none';
        }
    });
});
