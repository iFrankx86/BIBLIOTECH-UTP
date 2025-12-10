# 🛠️ Utilidades (Utils) - Guía de Uso

## 📁 Ubicación
`/workspaces/BIBLIOTECH-UTP/src/app/shared/utils/`

## 📚 Archivos Creados

1. **formatters.ts** - Funciones de formateo de datos
2. **validators.ts** - Funciones de validación
3. **helpers.ts** - Funciones auxiliares generales
4. **index.ts** - Barrel export (punto de entrada único)

---

## 🎨 Formatters (formatters.ts)

### Funciones Disponibles

#### 1. `formatCurrency(amount: number): string`
Formatea un número como moneda peruana (PEN).

```typescript
import { formatCurrency } from '@/app/shared/utils';

formatCurrency(25.50);     // "S/ 25.50"
formatCurrency(1000);      // "S/ 1,000.00"
formatCurrency(0);         // "S/ 0.00"
```

**Uso en el proyecto:**
```typescript
// En FinesPage.tsx
<td><strong className="text-danger">{formatCurrency(fine.amount || 0)}</strong></td>
```

#### 2. `formatShortDate(date: string | Date): string`
Formatea fecha en formato corto (dd/mm/yyyy).

```typescript
import { formatShortDate } from '@/app/shared/utils';

formatShortDate("2024-12-10");           // "10/12/2024"
formatShortDate(new Date());             // "10/12/2024"
```

**Uso en el proyecto:**
```typescript
// En MembersPage.tsx
<td>{formatShortDate(member.membershipDate)}</td>

// En FinesPage.tsx
<td>{formatShortDate(fine.issueDate)}</td>
```

#### 3. `formatDate(date: string | Date): string`
Formatea fecha en formato largo.

```typescript
formatDate("2024-12-10");     // "10 de diciembre de 2024"
```

#### 4. `formatFullName(firstName: string, lastName: string): string`
Combina nombre y apellido.

```typescript
formatFullName("Juan", "Pérez");     // "Juan Pérez"
```

#### 5. `formatPhone(phone: string): string`
Formatea número de teléfono peruano.

```typescript
formatPhone("987654321");        // "+51 987654321"
formatPhone("+51987654321");     // "+51987654321"
```

#### 6. `formatISBN(isbn: string): string`
Formatea ISBN con guiones.

```typescript
formatISBN("9780123456789");     // "978-0-123-45678-9"
formatISBN("0123456789");        // "0-123-45678-9"
```

#### 7. `truncateText(text: string, maxLength: number): string`
Trunca texto largo.

```typescript
truncateText("Este es un texto muy largo...", 15);  // "Este es un text..."
```

#### 8. `capitalizeWords(text: string): string`
Capitaliza cada palabra.

```typescript
capitalizeWords("juan pérez garcía");     // "Juan Pérez García"
```

---

## ✅ Validators (validators.ts)

### Funciones Disponibles

#### 1. `isValidEmail(email: string): boolean`
Valida formato de email.

```typescript
import { isValidEmail } from '@/app/shared/utils';

isValidEmail("user@example.com");     // true
isValidEmail("invalid-email");        // false
```

#### 2. `isValidISBN(isbn: string): boolean`
Valida formato de ISBN (10 o 13 dígitos).

```typescript
isValidISBN("9780123456789");         // true
isValidISBN("0123456789");            // true
isValidISBN("123");                   // false
```

#### 3. `isValidPhone(phone: string): boolean`
Valida teléfono peruano.

```typescript
isValidPhone("987654321");            // true
isValidPhone("51987654321");          // true
isValidPhone("123");                  // false
```

#### 4. `isValidDNI(dni: string): boolean`
Valida DNI peruano (8 dígitos).

```typescript
isValidDNI("12345678");               // true
isValidDNI("123");                    // false
```

#### 5. `isNotEmpty(text: string): boolean`
Valida que texto no esté vacío.

```typescript
isNotEmpty("Hola");                   // true
isNotEmpty("   ");                    // false
isNotEmpty("");                       // false
```

#### 6. `isValidLength(text: string, min: number, max: number): boolean`
Valida longitud de texto.

```typescript
isValidLength("Hola", 3, 10);         // true
isValidLength("Hi", 3, 10);           // false
```

#### 7. `isInRange(value: number, min: number, max: number): boolean`
Valida rango numérico.

```typescript
isInRange(5, 1, 10);                  // true
isInRange(15, 1, 10);                 // false
```

#### 8. `isValidURL(url: string): boolean`
Valida URL.

```typescript
isValidURL("https://example.com");    // true
isValidURL("not-a-url");              // false
```

#### 9. `isValidYear(year: number): boolean`
Valida año (1900 - año actual + 1).

```typescript
isValidYear(2024);                    // true
isValidYear(1800);                    // false
```

#### 10. `isNotFutureDate(date: string | Date): boolean`
Valida que fecha no sea futura.

```typescript
isNotFutureDate("2024-12-10");        // true
isNotFutureDate("2030-01-01");        // false
```

#### 11. `isValidAmount(amount: number): boolean`
Valida monto de dinero (positivo, máx 2 decimales).

```typescript
isValidAmount(25.50);                 // true
isValidAmount(25.555);                // false
isValidAmount(-10);                   // false
```

---

## 🔧 Helpers (helpers.ts)

### Funciones Disponibles

#### 1. `calculateDaysOverdue(dueDate: string | Date): number`
Calcula días de retraso desde fecha de vencimiento.

```typescript
import { calculateDaysOverdue } from '@/app/shared/utils';

calculateDaysOverdue("2024-12-05");   // 5 (si hoy es 10/dic)
calculateDaysOverdue("2024-12-15");   // 0 (aún no vence)
```

#### 2. `isExpired(date: string | Date): boolean`
Verifica si fecha ha expirado.

```typescript
isExpired("2024-12-01");              // true
isExpired("2024-12-31");              // false
```

#### 3. `addDays(date: Date, days: number): Date`
Suma días a una fecha.

```typescript
const today = new Date();
const futureDate = addDays(today, 7); // Fecha 7 días adelante
```

#### 4. `generateId(): string`
Genera ID único basado en timestamp.

```typescript
generateId();  // "1733851234567-a2b3c4d5e"
```

#### 5. `generateReservationCode(): string`
Genera código de reserva único.

```typescript
generateReservationCode();  // "RES-20241210-A2B3"
```

#### 6. `generateLoanCode(): string`
Genera código de préstamo único.

```typescript
generateLoanCode();  // "LOAN-20241210-X5Y6"
```

#### 7. `calculateFine(daysOverdue: number, dailyRate?: number): number`
Calcula multa por días de retraso (rate por defecto: S/2.00).

```typescript
calculateFine(5);        // 10.00 (5 días × S/2.00)
calculateFine(3, 3.50);  // 10.50 (3 días × S/3.50)
```

#### 8. `getGreeting(): string`
Obtiene saludo según hora del día.

```typescript
getGreeting();  // "Buenos días" (antes de 12pm)
                // "Buenas tardes" (12pm-7pm)
                // "Buenas noches" (después de 7pm)
```

**Uso en el proyecto:**
```typescript
// En Dashboard.tsx
const greeting = getGreeting();
<h2>{greeting}, {user?.fullName}!</h2>
```

#### 9. `calculateAge(birthDate: string | Date): number`
Calcula edad desde fecha de nacimiento.

```typescript
calculateAge("1990-05-15");  // 34
```

#### 10. `sortBy<T>(array: T[], key: keyof T, ascending?: boolean): T[]`
Ordena array por propiedad.

```typescript
const users = [
  { name: "Juan", age: 30 },
  { name: "Ana", age: 25 }
];

sortBy(users, 'age');           // Ordenado por edad ascendente
sortBy(users, 'name', false);   // Ordenado por nombre descendente
```

#### 11. `groupBy<T>(array: T[], key: keyof T): Record<string, T[]>`
Agrupa array por propiedad.

```typescript
const books = [
  { title: "Book 1", category: "Fiction" },
  { title: "Book 2", category: "Science" },
  { title: "Book 3", category: "Fiction" }
];

groupBy(books, 'category');
// {
//   "Fiction": [book1, book3],
//   "Science": [book2]
// }
```

#### 12. `daysBetween(date1: Date | string, date2: Date | string): number`
Calcula días entre dos fechas.

```typescript
daysBetween("2024-12-01", "2024-12-10");  // 9
```

#### 13. `generateColor(text: string): string`
Genera color consistente basado en texto (útil para avatares).

```typescript
generateColor("Juan Pérez");   // "#4ECDC4"
generateColor("Ana García");   // "#F7DC6F"
```

#### 14. `debounce<T>(func: T, delay: number)`
Debounce para optimizar búsquedas.

```typescript
const handleSearch = debounce((term: string) => {
  console.log("Buscando:", term);
}, 300);

// Se ejecuta solo después de 300ms sin cambios
handleSearch("libro");
```

---

## 💡 Ejemplos de Uso en el Proyecto

### Ejemplo 1: Formatear Multas (FinesPage.tsx)

```typescript
import { formatCurrency, formatShortDate } from '@/app/shared/utils';

// Antes:
<td>${fine.amount?.toFixed(2) || '0.00'}</td>
<td>{new Date(fine.issueDate).toLocaleDateString()}</td>

// Después:
<td>{formatCurrency(fine.amount || 0)}</td>
<td>{formatShortDate(fine.issueDate)}</td>
```

### Ejemplo 2: Saludo Dinámico (Dashboard.tsx)

```typescript
import { getGreeting } from '@/app/shared/utils';

// Antes:
const currentHour = new Date().getHours();
let greeting = 'Buenos días';
if (currentHour >= 12 && currentHour < 19) greeting = 'Buenas tardes';
if (currentHour >= 19) greeting = 'Buenas noches';

// Después:
const greeting = getGreeting();
```

### Ejemplo 3: Validar Formularios

```typescript
import { isValidEmail, isValidPhone, isNotEmpty } from '@/app/shared/utils';

const handleSubmit = (data: any) => {
  if (!isNotEmpty(data.name)) {
    alert("El nombre es requerido");
    return;
  }
  
  if (!isValidEmail(data.email)) {
    alert("Email inválido");
    return;
  }
  
  if (!isValidPhone(data.phone)) {
    alert("Teléfono inválido (debe tener 9 dígitos)");
    return;
  }
  
  // Procesar formulario...
};
```

### Ejemplo 4: Calcular Multas por Retraso

```typescript
import { calculateDaysOverdue, calculateFine, formatCurrency } from '@/app/shared/utils';

const loan = { dueDate: "2024-12-05" };
const daysLate = calculateDaysOverdue(loan.dueDate);  // 5 días

if (daysLate > 0) {
  const fineAmount = calculateFine(daysLate);  // S/ 10.00
  console.log(`Multa: ${formatCurrency(fineAmount)}`);
}
```

---

## 📦 Importación

### Importar múltiples funciones:
```typescript
import { formatCurrency, formatShortDate, isValidEmail } from '@/app/shared/utils';
```

### Importar todo el módulo:
```typescript
import * as utils from '@/app/shared/utils';

utils.formatCurrency(100);
utils.getGreeting();
```

---

## ✅ Beneficios

1. ✅ **Código más limpio**: Evita duplicación de lógica
2. ✅ **Mantenibilidad**: Cambios en un solo lugar
3. ✅ **Consistencia**: Mismo formato en toda la app
4. ✅ **Testeable**: Funciones puras fáciles de probar
5. ✅ **Reutilizable**: Disponible en cualquier componente
6. ✅ **TypeScript**: Completamente tipado

---

## 🎯 Estado Actual

**Archivos creados:** 4
**Funciones totales:** 40+
**Integrado en:**
- ✅ Dashboard.tsx (getGreeting)
- ✅ FinesPage.tsx (formatCurrency, formatShortDate)
- ✅ MembersPage.tsx (formatShortDate)

**Próximas integraciones sugeridas:**
- [ ] Validación de formularios en Modales
- [ ] Formateo de fechas en todas las páginas
- [ ] Cálculo de multas automático en LoansPage
- [ ] Generación de códigos únicos en Reservations

---

## 📝 Notas

- Todas las funciones son **puras** (sin efectos secundarios)
- Compatible con **TypeScript** 5.2+
- Optimizadas para el contexto peruano (PEN, formato de fecha es-PE)
- Funciones de formateo **no mutan** los datos originales
