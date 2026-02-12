/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida el formulario de contacto
 * @param {Object} data - Datos del formulario
 * @param {string} data.name - Nombre
 * @param {string} data.email - Email
 * @param {string} data.message - Mensaje
 * @returns {Object} Resultado de la validación
 */
export function validateContactForm({ name, email, message }) {
  const errors = [];

  // Validar nombre
  if (!name || name.trim().length === 0) {
    errors.push('El nombre es requerido');
  } else if (name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  } else if (name.trim().length > 100) {
    errors.push('El nombre no puede tener más de 100 caracteres');
  }

  // Validar email
  if (!email || email.trim().length === 0) {
    errors.push('El email es requerido');
  } else if (!isValidEmail(email)) {
    errors.push('El email no es válido');
  }

  // Validar mensaje
  if (!message || message.trim().length === 0) {
    errors.push('El mensaje es requerido');
  } else if (message.trim().length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres');
  } else if (message.trim().length > 5000) {
    errors.push('El mensaje no puede tener más de 5000 caracteres');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitiza un string para prevenir XSS
 * @param {string} str - String a sanitizar
 * @returns {string} String sanitizado
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
