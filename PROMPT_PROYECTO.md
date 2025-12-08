# 📝 PROMPT UTILIZADO PARA CREAR BIBLIOTECH

## 🎯 PROMPT COMPLETO

**Objetivo:** Crear una aplicación web de gestión de biblioteca llamada "BiblioTech" con React, TypeScript y Bootstrap.

---

## 📋 REQUISITOS TÉCNICOS

### Framework y Tecnologías
- **Framework Principal:** React 18+ con TypeScript
- **UI Framework:** Bootstrap 5+ y React-Bootstrap
- **Build Tool:** Vite (última versión)
- **Enrutamiento:** React Router DOM 6+
- **Estado Global:** Context API

---

## 🏗️ ARQUITECTURA

### Estructura Modular
```
src/
├── components/     # Componentes reutilizables
│   ├── Layout.tsx
│   ├── PrivateRoute.tsx
│   └── modals/    # Sistema multiventana
├── context/       # Context API
│   ├── AuthContext.tsx
│   └── DataContext.tsx
├── models/        # 12 clases de dominio
├── pages/         # Páginas principales
├── services/      # Lógica de negocio
├── hooks/         # Custom hooks
├── utils/         # Utilidades
└── styles/        # Estilos globales
```

---

## 📚 12 CLASES DE DOMINIO REQUERIDAS

1. **User (Usuario)**
   - Propiedades: id, username, password, email, role, fullName, active, createdAt
   - Roles: admin, librarian, member

2. **Book (Libro)**
   - Propiedades: id, title, isbn, authorId, publisherId, categoryId, publicationYear, totalCopies, availableCopies, description, language, pages

3. **Author (Autor)**
   - Propiedades: id, firstName, lastName, birthDate, nationality, biography
   - Método: fullName getter

4. **Publisher (Editorial)**
   - Propiedades: id, name, country, website, email, phone, address, foundedYear

5. **Category (Categoría)**
   - Propiedades: id, name, description, parentCategoryId, active

6. **Loan (Préstamo)**
   - Propiedades: id, bookId, memberId, loanDate, dueDate, returnDate, status, employeeId
   - Estados: active, returned, overdue
   - Método: isOverdue()

7. **Reservation (Reserva)**
   - Propiedades: id, bookId, memberId, reservationDate, expirationDate, status, notified
   - Estados: pending, ready, completed, cancelled

8. **Member (Miembro)**
   - Propiedades: id, firstName, lastName, email, phone, address, membershipDate, membershipType, active, idNumber
   - Tipos: basic, premium, vip

9. **Fine (Multa)**
   - Propiedades: id, loanId, memberId, amount, reason, issueDate, paymentDate, status
   - Estados: pending, paid, waived

10. **Inventory (Inventario)**
    - Propiedades: id, bookId, barcode, location, condition, acquisitionDate, acquisitionPrice, status
    - Condiciones: excellent, good, fair, poor, damaged
    - Estados: available, loaned, reserved, maintenance, lost

11. **Supplier (Proveedor)**
    - Propiedades: id, name, contactPerson, email, phone, address, taxId, active, rating

12. **Employee (Empleado)**
    - Propiedades: id, firstName, lastName, email, phone, position, department, hireDate, salary, active
    - Departamentos: administration, circulation, cataloging, reference, maintenance

---

## 🎨 FUNCIONALIDADES REQUERIDAS

### 1. Sistema de Login
- Página de login con validación
- Autenticación con Context API
- Persistencia de sesión con localStorage
- Múltiples roles (admin, librarian, member)
- Usuarios de prueba predefinidos

### 2. Menú de Navegación
- Navbar responsive con Bootstrap
- Menú principal con secciones:
  - Dashboard
  - Libros (Books, Authors, Publishers, Categories)
  - Miembros (Members, Employees)
  - Operaciones (Loans, Reservations, Fines)
  - Gestión (Inventory, Suppliers)
- Dropdown de usuario con logout

### 3. Dashboard de Bienvenida
- Saludo personalizado según hora del día
- Tarjetas con estadísticas:
  - Total de libros y disponibles
  - Miembros activos
  - Préstamos activos y vencidos
  - Multas pendientes
- Acciones rápidas con botones
- Información del sistema

### 4. Formularios CRUD
Formularios completos para:
- **Libros:** Título, ISBN, autor, editorial, categoría, año, copias, idioma, páginas, descripción
- **Miembros:** Nombre, apellido, email, teléfono, dirección, tipo de membresía, ID
- **Préstamos:** Selección de libro, miembro, días de préstamo

### 5. Sistema Multiventana (Mínimo 3)
Implementar modales de React-Bootstrap:
- **BookModal:** Agregar/editar libros
- **LoanModal:** Registrar préstamos
- **MemberModal:** Agregar miembros

---

## 💎 CARACTERÍSTICAS DE CALIDAD

### TypeScript
- Tipado estricto en todo el código
- Interfaces para props de componentes
- Tipos para estado y contexto
- Enums para estados

### Bootstrap 5
- Diseño responsive
- Componentes React-Bootstrap
- Grid system
- Utilities classes
- Bootstrap Icons

### Buenas Prácticas
- Separación de responsabilidades
- Componentes reutilizables
- Custom hooks cuando sea necesario
- Context API para estado global
- Rutas protegidas
- Código limpio y comentado

---

## 📖 DOCUMENTACIÓN REQUERIDA

### README.md debe incluir:
1. **Descripción del Sistema**
   - Características principales
   - Tecnologías utilizadas
   - Arquitectura

2. **Manual de Instalación**
   - Prerequisitos (Node.js, npm)
   - Pasos de instalación detallados
   - Comandos para ejecutar
   - Solución de problemas comunes

3. **Estructura del Proyecto**
   - Árbol de carpetas
   - Descripción de cada directorio
   - Explicación de archivos principales

4. **Guía de Uso**
   - Usuarios de prueba
   - Funcionalidades principales
   - Navegación del sistema

5. **Información Técnica**
   - Versiones de dependencias
   - Comandos disponibles
   - Configuración

---

## 🎯 CRITERIOS DE EXCELENCIA

Para obtener puntuación máxima:

1. **Creación del Proyecto (2 puntos)**
   - Presentación innovadora y creativa
   - Concepto claro y bien desarrollado
   - Alineado con objetivos

2. **Instalación y Configuración (2 puntos)**
   - Librerías instaladas correctamente
   - Configuración óptima
   - Funcionamiento perfecto

3. **Implementación de Módulos (3 puntos)**
   - Todos los módulos implementados
   - Funcionamiento eficiente
   - Rendimiento óptimo

4. **Construcción de Componentes (4 puntos)**
   - Componentes de manera óptima
   - Diseño elegante y funcional
   - Excelente experiencia de usuario

5. **Uso de TypeScript (2 puntos)**
   - TypeScript correcto en todo el proyecto
   - Buenas prácticas de codificación
   - Código de calidad

6. **Sustentación (3 puntos)**
   - Ideas con secuencia lógica
   - Desarrollo continuo
   - Dominio del tema

7. **Trabajo en Equipo (4 puntos)**
   - Colaboración excepcional
   - Roles bien definidos
   - Contribuciones claras

**TOTAL: 20 puntos**

---

## 🚀 INSTRUCCIONES DE IMPLEMENTACIÓN

1. **Configuración Inicial**
   - Crear proyecto con Vite + React + TypeScript
   - Instalar dependencias: react-bootstrap, bootstrap, react-router-dom
   - Configurar tsconfig.json
   - Configurar vite.config.ts

2. **Desarrollo de Modelos**
   - Crear las 12 clases en carpeta `models/`
   - Implementar con TypeScript usando clases
   - Agregar métodos útiles
   - Exportar centralizadamente

3. **Sistema de Autenticación**
   - Crear AuthContext con Context API
   - Implementar login/logout
   - Proteger rutas con PrivateRoute
   - Usuarios de prueba

4. **Contexto de Datos**
   - Crear DataContext para estado global
   - Datos de ejemplo para demostración
   - Funciones CRUD básicas
   - Exportar hooks personalizados

5. **Componentes Base**
   - Layout con Navbar
   - PrivateRoute para protección
   - Modales reutilizables

6. **Páginas Principales**
   - Login
   - Dashboard con estadísticas
   - Páginas CRUD (Books, Members, Loans, etc.)
   - Diseño responsive

7. **Sistema Multiventana**
   - Implementar 3+ modales
   - BookModal, LoanModal, MemberModal
   - Funcionalidad independiente
   - Integración con contexto

8. **Estilos**
   - Importar Bootstrap CSS
   - Bootstrap Icons
   - Estilos personalizados
   - Transiciones y animaciones

9. **Enrutamiento**
   - Configurar React Router
   - Rutas públicas y privadas
   - Navegación entre páginas
   - Redirect condicional

10. **Documentación**
    - README completo y detallado
    - Manual de instalación
    - Guía de inicio rápido
    - Comentarios en código

---

## ✅ CHECKLIST DE VERIFICACIÓN

- [x] React 18+ instalado
- [x] TypeScript configurado
- [x] Bootstrap 5+ integrado
- [x] React-Bootstrap instalado
- [x] 12 clases de dominio creadas
- [x] Sistema de login funcional
- [x] Menú de navegación completo
- [x] Dashboard con estadísticas
- [x] Formularios CRUD implementados
- [x] Sistema multiventana (3+ modales)
- [x] Rutas protegidas
- [x] Context API para estado
- [x] Diseño responsive
- [x] README completo
- [x] Manual de instalación
- [x] Usuarios de prueba
- [x] Código limpio y comentado
- [x] TypeScript en todo el proyecto
- [x] Estructura profesional
- [x] Versiones actualizadas

---

## 🎓 RESULTADO ESPERADO

Un sistema completo de gestión de biblioteca que:
- Sea funcional y eficiente
- Tenga una interfaz moderna y atractiva
- Esté bien documentado
- Siga mejores prácticas
- Cumpla todos los requisitos
- Sea fácil de instalar y usar
- Demuestre dominio de React, TypeScript y Bootstrap

---

**Fecha de Creación:** Diciembre 2025
**Proyecto:** BiblioTech v1.0.0
**Estado:** ✅ Completado y Funcional
