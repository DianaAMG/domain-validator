// Dominios comunes y sus variaciones incorrectas
const domainSuggestions = {
    'gmail.com': ['gmial.com', 'gmail.co', 'gmail.coom', 'gmai.com', 'gmail.cm', 'gmail.coom', 'gmial.co', 'gmaill.com', 'gmail.co', 'gmail.mx', 'gmail.es'],
    'hotmail.com': ['hotmial.com', 'hotmail.co', 'hotmail.coom', 'hotmai.com', 'hotmail.cm', 'hotmial.co', 'hotmaill.com', 'hotmail.co', 'hotmail.mx', 'hotmail.es'],
    'outlook.com': ['outlok.com', 'outlook.co', 'outlook.coom', 'outloo.com', 'outlook.cm', 'outlok.co', 'outlookk.com', 'outlook.co', 'outlook.mx', 'outlook.es'],
    'yahoo.com': ['yaho.com', 'yahoo.co', 'yahoo.coom', 'yahooo.com', 'yahoo.cm', 'yaho.co', 'yahoo.comm', 'yahoo.co', 'yahoo.mx', 'yahoo.es'],
    'gmail.co': ['gmial.co', 'gmail.com', 'gmail.coom', 'gmai.co', 'gmail.cm', 'gmaill.co'],
    'hotmail.co': ['hotmial.co', 'hotmail.com', 'hotmail.coom', 'hotmai.co', 'hotmail.cm', 'hotmaill.co'],
    'gmail.mx': ['gmial.mx', 'gmail.com', 'gmail.co', 'gmai.mx', 'gmail.cm', 'gmaill.mx'],
    'hotmail.mx': ['hotmial.mx', 'hotmail.com', 'hotmail.co', 'hotmai.mx', 'hotmail.cm', 'hotmaill.mx']
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
