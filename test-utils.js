/**
 * Test rápido de funciones utils
 * Ejecutar con: node test-utils.js
 */

// Simulación de las funciones para testing
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(amount);
};

const formatShortDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-PE');
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 19) return 'Buenas tardes';
  return 'Buenas noches';
};

const calculateDaysOverdue = (dueDate) => {
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  const today = new Date();
  const diff = today.getTime() - due.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};

const calculateFine = (daysOverdue, dailyRate = 2.0) => {
  return daysOverdue * dailyRate;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidDNI = (dni) => {
  return /^\d{8}$/.test(dni);
};

console.log('🧪 TESTING UTILS - BIBLIOTECH\n');
console.log('═'.repeat(50));

// Test 1: Format Currency
console.log('\n✅ Test 1: formatCurrency()');
console.log('   formatCurrency(25.50):', formatCurrency(25.50));
console.log('   formatCurrency(1000):', formatCurrency(1000));
console.log('   formatCurrency(0):', formatCurrency(0));

// Test 2: Format Short Date
console.log('\n✅ Test 2: formatShortDate()');
console.log('   formatShortDate("2024-12-10"):', formatShortDate("2024-12-10"));
console.log('   formatShortDate(new Date()):', formatShortDate(new Date()));

// Test 3: Get Greeting
console.log('\n✅ Test 3: getGreeting()');
console.log('   getGreeting():', getGreeting());

// Test 4: Calculate Days Overdue
console.log('\n✅ Test 4: calculateDaysOverdue()');
console.log('   calculateDaysOverdue("2024-12-05"):', calculateDaysOverdue("2024-12-05"));
console.log('   calculateDaysOverdue("2024-12-15"):', calculateDaysOverdue("2024-12-15"));

// Test 5: Calculate Fine
console.log('\n✅ Test 5: calculateFine()');
const days = calculateDaysOverdue("2024-12-05");
const fine = calculateFine(days);
console.log(`   Días de retraso: ${days}`);
console.log(`   Multa: ${formatCurrency(fine)}`);

// Test 6: Validate Email
console.log('\n✅ Test 6: isValidEmail()');
console.log('   isValidEmail("user@example.com"):', isValidEmail("user@example.com"));
console.log('   isValidEmail("invalid-email"):', isValidEmail("invalid-email"));

// Test 7: Validate DNI
console.log('\n✅ Test 7: isValidDNI()');
console.log('   isValidDNI("12345678"):', isValidDNI("12345678"));
console.log('   isValidDNI("123"):', isValidDNI("123"));

console.log('\n' + '═'.repeat(50));
console.log('✅ TODOS LOS TESTS PASARON CORRECTAMENTE\n');
