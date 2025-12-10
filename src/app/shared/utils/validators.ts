/**
 * Utilidades para validación de datos
 */

/**
 * Valida formato de email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida formato de ISBN (10 o 13 dígitos)
 */
export const isValidISBN = (isbn: string): boolean => {
  const cleanISBN = isbn.replace(/[-\s]/g, '');
  const isbn10Regex = /^\d{9}[\dX]$/;
  const isbn13Regex = /^(97(8|9))?\d{9}(\d|X)$/;
  return isbn10Regex.test(cleanISBN) || isbn13Regex.test(cleanISBN);
};

/**
 * Valida teléfono: acepta 9 dígitos (cualquier prefijo) o con código de país 51 + 9 dígitos
 */
export const isValidPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const isNineDigits = cleanPhone.length === 9;
  const isWithCountryCode = cleanPhone.startsWith('51') && cleanPhone.length === 11;
  return isNineDigits || isWithCountryCode;
};

/**
 * Valida DNI peruano (8 dígitos)
 */
export const isValidDNI = (dni: string): boolean => {
  return /^\d{8}$/.test(dni);
};

/**
 * Valida que un texto no esté vacío
 */
export const isNotEmpty = (text: string): boolean => {
  return text.trim().length > 0;
};

/**
 * Valida rango de longitud de texto
 */
export const isValidLength = (text: string, min: number, max: number): boolean => {
  const length = text.trim().length;
  return length >= min && length <= max;
};

/**
 * Valida que un número esté en un rango
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Valida URL
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida año (entre 1900 y año actual + 1)
 */
export const isValidYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 1;
};

/**
 * Valida que una fecha no sea futura
 */
export const isNotFutureDate = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj <= new Date();
};

/**
 * Valida monto de dinero (positivo y con máximo 2 decimales)
 */
export const isValidAmount = (amount: number): boolean => {
  return amount >= 0 && /^\d+(\.\d{1,2})?$/.test(amount.toString());
};
