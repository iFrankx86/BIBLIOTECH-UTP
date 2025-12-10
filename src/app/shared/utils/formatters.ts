/**
 * Utilidades para formateo de datos
 */

/**
 * Formatea un número como moneda peruana (PEN)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(amount);
};

/**
 * Formatea una fecha ISO a formato legible largo
 */
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formatea una fecha ISO a formato corto (dd/mm/yyyy)
 */
export const formatShortDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-PE');
};

/**
 * Formatea nombre completo desde nombres y apellidos
 */
export const formatFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

/**
 * Formatea número de teléfono peruano
 */
export const formatPhone = (phone: string): string => {
  // Si empieza con +51, mantenerlo
  if (phone.startsWith('+51')) return phone;
  // Si tiene 9 dígitos, agregar +51
  if (phone.length === 9) return `+51 ${phone}`;
  return phone;
};

/**
 * Formatea ISBN con guiones para legibilidad
 */
export const formatISBN = (isbn: string): string => {
  if (isbn.length === 13) {
    // ISBN-13: 978-0-123-45678-9
    return `${isbn.slice(0, 3)}-${isbn.slice(3, 4)}-${isbn.slice(4, 7)}-${isbn.slice(7, 12)}-${isbn.slice(12)}`;
  } else if (isbn.length === 10) {
    // ISBN-10: 0-123-45678-9
    return `${isbn.slice(0, 1)}-${isbn.slice(1, 4)}-${isbn.slice(4, 9)}-${isbn.slice(9)}`;
  }
  return isbn;
};

/**
 * Trunca un texto largo con puntos suspensivos
 */
export const truncateText = (text: string, maxLength: number = 50): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Capitaliza la primera letra de cada palabra
 */
export const capitalizeWords = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
