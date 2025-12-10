# 📚 BiblioTech - Sistema de Gestión de Biblioteca UTP

![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple)
![Vite](https://img.shields.io/badge/Vite-5.0.8-yellow)
![json-server](https://img.shields.io/badge/json--server-0.17.4-green)

Sistema integral de gestión bibliotecaria desarrollado con **React 18**, **TypeScript** y **Bootstrap 5**, implementando arquitectura modular por features, 12 clases de dominio, sistema de roles y permisos, y operaciones CRUD completas.

---

## 📋 Descripción del Sistema

**BiblioTech** es una aplicación web profesional para la gestión integral de bibliotecas universitarias. Permite administrar el ciclo completo de operaciones bibliotecarias: catálogo de libros, gestión de usuarios, préstamos, reservas, multas, inventario físico, proveedores y más. 

El sistema está diseñado con arquitectura modular por features, siguiendo las mejores prácticas de desarrollo con React 18 y TypeScript, implementando un robusto sistema de roles y permisos, y garantizando código limpio, escalable y mantenible.

### ✨ Características Principales

#### 🔐 Sistema de Autenticación y Roles
- Login seguro con validación de credenciales
- **3 roles diferenciados**: Administrador, Bibliotecario y Miembro
- Sistema de permisos granular por rol
- Rutas protegidas con validación de acceso
- Dashboards personalizados según rol
- Creación automática de credenciales para empleados y miembros

#### 📊 Módulos de Gestión Completos (CRUD)
- **📚 Gestión de Libros**: Catálogo completo con información detallada (título, ISBN, autor, editorial, categoría, copias)
- **✍️ Gestión de Autores**: Registro de autores con biografía y nacionalidad
- **🏢 Gestión de Editoriales**: Control de casas editoriales con datos de contacto
- **🏷️ Gestión de Categorías**: Organización del catálogo por categorías activas/inactivas
- **👥 Gestión de Miembros**: Registro de usuarios con tipos de membresía (básica, premium, estudiante)
- **👔 Gestión de Empleados**: Control de personal con departamentos, cargos y salarios
- **📖 Gestión de Préstamos**: Sistema completo de préstamos con fechas, renovaciones y devoluciones
- **📝 Gestión de Reservas**: Reservas con confirmación, cancelación y conversión a préstamo
- **💰 Gestión de Multas**: Cálculo automático de multas por retraso con procesamiento de pagos
- **📦 Gestión de Inventario**: Control físico de cada ejemplar (ubicación, condición, estado)
- **🚚 Gestión de Proveedores**: Registro de proveedores con evaluación y contactos
- **🔍 Operaciones Avanzadas**: Búsqueda, filtrado, cambio de estados, eliminación con confirmación

#### 🎨 Interfaz de Usuario
- Diseño responsive adaptado a móviles, tablets y desktop
- Componentes modernos de React-Bootstrap
- Iconos de Bootstrap Icons 1.11.3
- Modales interactivos para operaciones CRUD
- Badges de estado con colores intuitivos
- Tablas interactivas con acciones rápidas
- Notificaciones visuales de operaciones

#### 🗄️ Persistencia y API
- Backend simulado con **json-server** en puerto 3001
- Base de datos JSON con 12 entidades
- Operaciones CRUD en tiempo real
- Context API para estado global
- Hooks personalizados (useAuth, useData, usePermissions)

---

## 🏗️ Arquitectura y Estructura del Proyecto

### 📐 Patrón de Arquitectura

El proyecto implementa una **arquitectura modular por features**, separando la lógica de negocio en módulos independientes y autocontenidos. Cada feature contiene sus propias páginas, componentes (modales) y lógica específica.

**Estructura Modular:**
```
src/app/
├── features/          # Módulos por dominio (cada uno es independiente)
│   ├── auth/         # Autenticación y login
│   ├── books/        # Gestión de libros
│   ├── authors/      # Gestión de autores
│   ├── publishers/   # Gestión de editoriales
│   ├── categories/   # Gestión de categorías
│   ├── members/      # Gestión de miembros
│   ├── employees/    # Gestión de empleados
│   ├── loans/        # Gestión de préstamos
│   ├── reservations/ # Gestión de reservas
│   ├── fines/        # Gestión de multas
│   ├── inventory/    # Gestión de inventario
│   ├── suppliers/    # Gestión de proveedores
│   └── dashboard/    # Dashboard principal
└── shared/           # Recursos compartidos entre módulos
    ├── components/   # Componentes reutilizables
    ├── context/      # Context API (AuthContext, DataContext)
    ├── hooks/        # Custom hooks (useAuth, useData, usePermissions)
    ├── services/     # Servicios API (api.ts con axios)
    └── types/        # Modelos TypeScript (12 clases de dominio)
```

### 📁 Estructura Completa del Proyecto

```
BIBLIOTECH-UTP/
├── public/
│   └── vite.svg
├── src/
│   ├── app/
│   │   ├── features/                    # 13 Módulos de Features
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx           # Página de login
│   │   │   │   └── context/
│   │   │   │       └── AuthContext.tsx # No usado (migrado a shared)
│   │   │   ├── books/
│   │   │   │   ├── BooksPage.tsx       # CRUD de libros
│   │   │   │   └── BookModal.tsx       # Modal de libro
│   │   │   ├── authors/
│   │   │   │   ├── AuthorsPage.tsx     # CRUD de autores
│   │   │   │   └── AuthorModal.tsx     # Modal de autor
│   │   │   ├── publishers/
│   │   │   │   ├── PublishersPage.tsx  # CRUD de editoriales
│   │   │   │   └── PublisherModal.tsx  # Modal de editorial
│   │   │   ├── categories/
│   │   │   │   ├── CategoriesPage.tsx  # CRUD de categorías
│   │   │   │   └── CategoryModal.tsx   # Modal de categoría
│   │   │   ├── members/
│   │   │   │   ├── MembersPage.tsx     # CRUD de miembros
│   │   │   │   └── MemberModal.tsx     # Modal de miembro
│   │   │   ├── employees/
│   │   │   │   ├── EmployeesPage.tsx   # CRUD de empleados
│   │   │   │   └── EmployeeModal.tsx   # Modal de empleado
│   │   │   ├── loans/
│   │   │   │   ├── LoansPage.tsx       # CRUD de préstamos
│   │   │   │   └── LoanModal.tsx       # Modal de préstamo
│   │   │   ├── reservations/
│   │   │   │   ├── ReservationsPage.tsx # CRUD de reservas
│   │   │   │   └── ReservationModal.tsx # Modal de reserva
│   │   │   ├── fines/
│   │   │   │   ├── FinesPage.tsx       # CRUD de multas
│   │   │   │   └── FineModal.tsx       # Modal de multa
│   │   │   ├── inventory/
│   │   │   │   ├── InventoryPage.tsx   # CRUD de inventario
│   │   │   │   └── InventoryModal.tsx  # Modal de inventario
│   │   │   ├── suppliers/
│   │   │   │   ├── SuppliersPage.tsx   # CRUD de proveedores
│   │   │   │   └── SupplierModal.tsx   # Modal de proveedor
│   │   │   └── dashboard/
│   │   │       ├── Dashboard.tsx       # Dashboard principal
│   │   │       └── MemberDashboard.tsx # Dashboard de miembro
│   │   └── shared/                     # Recursos Compartidos
│   │       ├── components/
│   │       │   ├── Layout.tsx          # Layout con navbar y sidebar
│   │       │   ├── Loading.tsx         # Componente de carga
│   │       │   ├── PrivateRoute.tsx    # Protección de rutas
│   │       │   └── ProtectedRoute.tsx  # Rutas por rol
│   │       ├── context/
│   │       │   ├── AuthContext.tsx     # Estado global de autenticación
│   │       │   └── DataContext.tsx     # Estado global de datos (CRUD)
│   │       ├── hooks/
│   │       │   └── usePermissions.ts   # Hook de permisos por rol
│   │       ├── services/
│   │       │   └── api.ts              # Configuración de axios y endpoints
│   │       └── types/                  # 12 Clases de Dominio (TypeScript)
│   │           ├── User.ts
│   │           ├── Book.ts
│   │           ├── Author.ts
│   │           ├── Publisher.ts
│   │           ├── Category.ts
│   │           ├── Member.ts
│   │           ├── Employee.ts
│   │           ├── Loan.ts
│   │           ├── Reservation.ts
│   │           ├── Fine.ts
│   │           ├── Inventory.ts
│   │           ├── Supplier.ts
│   │           └── index.ts            # Exportación centralizada
│   ├── styles/
│   │   └── App.css                     # Estilos globales
│   ├── App.tsx                         # Componente raíz con rutas
│   └── main.tsx                        # Punto de entrada
├── db.json                             # Base de datos JSON (json-server)
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md                           # Este archivo
└── docs/                               # Documentación adicional
    ├── INSTALACION.md
    ├── SISTEMA_COMPLETO.md
    ├── SISTEMA_PERMISOS.md
    └── uml/                            # Diagramas UML
```

### 🎯 Separación de Responsabilidades

| Carpeta | Propósito | Contenido |
|---------|-----------|-----------|
| `features/` | Módulos de negocio | Páginas y modales por dominio |
| `shared/components/` | Componentes UI | Layout, Loading, Rutas protegidas |
| `shared/context/` | Estado global | AuthContext, DataContext |
| `shared/hooks/` | Lógica reutilizable | useAuth, useData, usePermissions |
| `shared/services/` | Comunicación API | Configuración axios, endpoints |
| `shared/types/` | Modelos de datos | 12 clases de dominio TypeScript |

---

## 🎯 12 Clases de Dominio Implementadas

Todas las clases están implementadas con **TypeScript** siguiendo principios de **POO**, con propiedades fuertemente tipadas, métodos útiles, constructores bien definidos y validaciones.

| # | Clase | Ubicación | Descripción | Propiedades Clave |
|---|-------|-----------|-------------|-------------------|
| 1 | **User** | `shared/types/User.ts` | Usuarios del sistema con roles | id, username, password, email, role (admin/librarian/member), active |
| 2 | **Book** | `shared/types/Book.ts` | Catálogo de libros | id, title, isbn, authorId, publisherId, categoryId, totalCopies, availableCopies |
| 3 | **Author** | `shared/types/Author.ts` | Autores de libros | id, firstName, lastName, birthDate, nationality, biography |
| 4 | **Publisher** | `shared/types/Publisher.ts` | Casas editoriales | id, name, country, website, email, phone, active |
| 5 | **Category** | `shared/types/Category.ts` | Categorías de libros | id, name, description, active |
| 6 | **Member** | `shared/types/Member.ts` | Miembros de la biblioteca | id, firstName, lastName, email, idNumber, membershipType (basic/premium/student), active |
| 7 | **Employee** | `shared/types/Employee.ts` | Personal de la biblioteca | id, firstName, lastName, position, department, hireDate, salary, active |
| 8 | **Loan** | `shared/types/Loan.ts` | Préstamos de libros | id, bookId, memberId, loanDate, dueDate, returnDate, status (active/returned/overdue) |
| 9 | **Reservation** | `shared/types/Reservation.ts` | Reservas de libros | id, bookId, memberId, reservationDate, expiryDate, status (pending/confirmed/cancelled/completed) |
| 10 | **Fine** | `shared/types/Fine.ts` | Multas por retraso | id, loanId, memberId, amount, issueDate, paymentDate, status (pending/paid/cancelled) |
| 11 | **Inventory** | `shared/types/Inventory.ts` | Control físico de ejemplares | id, bookId, barcode, location, condition (excellent/good/fair/poor/damaged), status |
| 12 | **Supplier** | `shared/types/Supplier.ts` | Proveedores de libros | id, name, contactPerson, email, phone, address, active |

### 🔧 Características de las Clases

Cada clase de dominio incluye:
- ✅ **Constructor completo** con parámetros tipados
- ✅ **Propiedades privadas** con getters/setters cuando aplica
- ✅ **Métodos utilitarios** (ej: `fullName`, `isOverdue()`, `calculateFine()`)
- ✅ **Validaciones de negocio** incorporadas
- ✅ **Tipado estricto de TypeScript** sin uso de `any`
- ✅ **Exportación centralizada** en `index.ts`

---

## 🪟 Sistema de Modales (12 Modales Implementados)

El sistema implementa **12 modales interactivos** con React-Bootstrap, uno por cada entidad del dominio. Cada modal soporta operaciones de **crear** y **editar**, con validaciones en tiempo real y manejo de errores.

### Modales Principales

| Modal | Funcionalidad | Validaciones | Características Especiales |
|-------|---------------|--------------|----------------------------|
| **BookModal** | Crear/Editar libros | ISBN único, campos requeridos | Selección de autor, editorial y categoría; control de copias |
| **AuthorModal** | Crear/Editar autores | Nombre completo, fechas válidas | Biografía y nacionalidad opcionales |
| **PublisherModal** | Crear/Editar editoriales | Email válido, país requerido | Switch de estado activo/inactivo |
| **CategoryModal** | Crear/Editar categorías | Nombre único | Control de categorías activas/inactivas |
| **MemberModal** | Crear/Editar miembros | Email único, documento válido | **Creación automática de usuario** con credenciales |
| **EmployeeModal** | Crear/Editar empleados | Email único, salario válido | **Creación automática de usuario bibliotecario** |
| **LoanModal** | Crear/Editar préstamos | Disponibilidad, miembro activo | Selección de días, cálculo de fecha de vencimiento, control de estado |
| **ReservationModal** | Crear/Editar reservas | Libro no disponible | Estados: pending, confirmed, cancelled, completed |
| **FineModal** | Crear/Ver/Pagar multas | Monto válido | Procesamiento de pago, cálculo automático por días de retraso |
| **InventoryModal** | Crear/Editar inventario | Código de barras único | Control de ubicación, condición física y estado |
| **SupplierModal** | Crear/Editar proveedores | Email y teléfono válidos | Calificación con estrellas, switch activo/inactivo |
| **CategoryModal** | Crear/Editar categorías | Nombre requerido | Descripción opcional, estado activo |

### 🎨 Características de los Modales

- ✅ **Diseño responsive** adaptado a todos los dispositivos
- ✅ **Validación en tiempo real** de formularios
- ✅ **Mensajes de error** descriptivos
- ✅ **Estados de carga** con spinners
- ✅ **Confirmación de cierre** si hay cambios sin guardar
- ✅ **Animaciones suaves** de apertura/cierre
- ✅ **Accesibilidad** con labels y ARIA
- ✅ **Modo dual**: Crear (entity = null) y Editar (entity con datos)

### 🔗 Flujos Especiales

#### Creación de Usuario Automática
**MemberModal** y **EmployeeModal** implementan creación automática de credenciales:
- Al crear un **nuevo miembro**: Se genera un usuario con rol `member`
- Al crear un **nuevo empleado**: Se genera un usuario con rol `librarian`
- Se solicitan username y password en el formulario
- La cuenta queda vinculada automáticamente al miembro/empleado

---

## 📦 Stack Tecnológico

### 🎯 Core Framework
- **React 18.2.0** - Framework de UI con Hooks y Context API
- **TypeScript 5.2.2** - Tipado estático fuerte en todo el proyecto
- **Vite 5.0.8** - Build tool de última generación (Hot Module Replacement ultrarrápido)

### 🎨 UI/UX
- **React-Bootstrap 2.9.1** - Componentes de UI React-friendly
- **Bootstrap 5.3.2** - Framework CSS responsive
- **Bootstrap Icons 1.11.3** - Librería de iconos (2000+ iconos)

### 🧭 Routing & State Management
- **React Router DOM 6.20.1** - Enrutamiento declarativo con rutas protegidas
- **Context API (React)** - Gestión de estado global sin Redux
  - `AuthContext` - Autenticación y sesión
  - `DataContext` - Datos de 12 entidades con CRUD

### 🔌 Backend & API
- **json-server 0.17.4** - API REST simulada en puerto 3001
- **axios 1.6.2** - Cliente HTTP para comunicación con API
- **db.json** - Base de datos JSON con datos de ejemplo

### 🛠️ Development Tools
- **ESLint 8.55.0** - Linting de código JavaScript/TypeScript
- **@typescript-eslint** - Reglas específicas de TypeScript
- **@vitejs/plugin-react 4.2.1** - Plugin de React para Vite

### 📊 Dependencias Completas

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "react-bootstrap": "^2.9.1",
    "bootstrap": "^5.3.2",
    "bootstrap-icons": "^1.11.3",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "json-server": "^0.17.4"
  }
}
```

---

## 🚀 Manual de Instalación y Configuración

### 📋 Prerrequisitos del Sistema

Antes de comenzar, asegúrate de tener instalado:

| Software | Versión Mínima | Verificar Instalación |
|----------|----------------|----------------------|
| **Node.js** | 18.0.0 o superior | `node --version` |
| **npm** | 9.0.0 o superior | `npm --version` |
| **Git** | 2.x o superior | `git --version` |

### 📥 Instalación Paso a Paso

#### 1️⃣ Clonar el Repositorio

```bash
# Clonar el proyecto
git clone <url-del-repositorio>

# Navegar al directorio
cd BIBLIOTECH-UTP
```

#### 2️⃣ Instalar Dependencias

```bash
# Instalar todas las dependencias (React, TypeScript, Bootstrap, etc.)
npm install
```

Este comando instalará:
- Dependencias de producción (React, React Router, Bootstrap, axios)
- Dependencias de desarrollo (TypeScript, Vite, ESLint, json-server)

#### 3️⃣ Configurar la Base de Datos JSON

El sistema utiliza **json-server** para simular una API REST completa.

```bash
# Verificar que el archivo db.json existe
ls -la db.json

# El archivo ya contiene datos de ejemplo:
# - 3 usuarios (admin, librarian, member)
# - Libros, autores, categorías, miembros, empleados
# - Préstamos, reservas, multas, inventario, proveedores
```

**⚠️ IMPORTANTE:** El puerto **3001** debe estar disponible para json-server.

```bash
# Verificar si el puerto 3001 está ocupado (Linux/Mac)
lsof -i :3001

# Verificar si el puerto 3001 está ocupado (Windows)
netstat -ano | findstr :3001
```

#### 4️⃣ Iniciar el Servidor JSON (Backend)

```bash
# Terminal 1 - Iniciar json-server en puerto 3001
npm run server
```

**Salida esperada:**
```
\{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:3001/users
http://localhost:3001/books
http://localhost:3001/authors
http://localhost:3001/categories
http://localhost:3001/members
http://localhost:3001/employees
http://localhost:3001/loans
http://localhost:3001/reservations
http://localhost:3001/fines
http://localhost:3001/inventory
http://localhost:3001/suppliers
http://localhost:3001/publishers

Home
http://localhost:3001

Type s + enter at any time to create a snapshot of the database
```

#### 5️⃣ Iniciar la Aplicación React (Frontend)

```bash
# Terminal 2 - Iniciar Vite dev server en puerto 5173
npm run dev
```

**Salida esperada:**
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

### ✅ Verificación de la Instalación

1. **Verificar Backend (json-server)**
   ```bash
   curl http://localhost:3001/users
   # Debe retornar array de usuarios
   ```

2. **Verificar Frontend (React)**
   - Abrir navegador en `http://localhost:5173`
   - Debe aparecer la página de Login de BIBLIOTECH

3. **Probar Login**
   - Usuario: `admin`
   - Contraseña: `admin123`
   - Debe redirigir al Dashboard principal

### 🐛 Solución de Problemas Comunes

#### Error: "Puerto 3001 ya está en uso"
```bash
# Linux/Mac - Liberar puerto 3001
lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows - Liberar puerto 3001
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

#### Error: "Cannot find module 'react'"
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

#### Error: "Failed to fetch" al hacer login
```bash
# Verificar que json-server esté corriendo
curl http://localhost:3001/users

# Si no responde, reiniciar json-server
npm run server
```

#### Puerto 5173 ocupado
```bash
# Modificar vite.config.ts para usar otro puerto
# O liberar el puerto actual
lsof -i :5173 | awk 'NR!=1 {print $2}' | xargs kill -9
```

### 📁 Estructura de Archivos Importantes

```
BIBLIOTECH-UTP/
├── db.json                    # Base de datos JSON (backend)
├── package.json               # Dependencias y scripts
├── vite.config.ts            # Configuración de Vite
├── tsconfig.json             # Configuración de TypeScript
├── src/
│   ├── main.tsx              # Punto de entrada de React
│   ├── App.tsx               # Componente raíz con rutas
│   └── app/
│       ├── features/         # 13 módulos CRUD
│       └── shared/           # Recursos compartidos
└── public/                   # Archivos estáticos
```

### 🌐 URLs del Sistema

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend (React)** | http://localhost:5173 | Aplicación principal |
| **Backend (json-server)** | http://localhost:3001 | API REST simulada |
| **API Endpoints** | http://localhost:3001/{resource} | books, users, loans, etc. |

### 📝 Notas Adicionales

- **Hot Module Replacement (HMR)**: Los cambios en el código se reflejan automáticamente sin recargar la página
- **TypeScript**: Todos los archivos usan `.ts` y `.tsx` con tipado estricto
- **Persistencia**: Los datos se guardan automáticamente en `db.json` gracias a json-server
- **CORS**: json-server tiene CORS habilitado por defecto para desarrollo local

---

## 👤 Usuarios de Prueba

El sistema viene con **3 usuarios predefinidos** en `db.json` para testing inmediato:

| Usuario | Contraseña | Rol | Email | Permisos | Dashboard |
|---------|------------|-----|-------|----------|-----------|
| `admin` | `admin123` | Administrador | admin@bibliotech.com | **Acceso completo** a todos los módulos | Dashboard con estadísticas completas |
| `librarian` | `lib123` | Bibliotecario | librarian@bibliotech.com | Gestión de libros, préstamos, reservas, multas | Dashboard operativo |
| `member` | `mem123` | Miembro | member@bibliotech.com | Vista de catálogo, consulta de préstamos propios | Dashboard personalizado |

### 🔐 Inicio de Sesión

1. Acceder a `http://localhost:5173`
2. Ingresar usuario y contraseña
3. El sistema valida contra `/users` en json-server
4. Redirección automática al dashboard según rol

---

## 🛠️ Comandos Disponibles

| Comando | Descripción | Puerto |
|---------|-------------|--------|
| `npm run dev` | Inicia el servidor de desarrollo Vite | 5173 |
| `npm run build` | Construye el proyecto para producción | - |
| `npm run preview` | Previsualiza el build de producción | 4173 |
| `npm run lint` | Ejecuta ESLint para verificar código | - |
| `npm run server` | Inicia json-server (backend simulado) | 3001 |

### 📝 Uso Típico

```bash
# Terminal 1: Backend (REQUERIDO)
npm run server

# Terminal 2: Frontend
npm run dev

# Producción
npm run build
npm run preview
```

---

## 📱 Funcionalidades Detalladas por Módulo

### 🏠 Dashboard Principal
- **Estadísticas en tiempo real**: Total de libros, miembros activos, préstamos activos, multas pendientes
- **Tarjetas interactivas** con indicadores visuales por color
- **Accesos rápidos** a los 12 módulos de gestión
- **Información del sistema**: Fecha/hora, versión, usuario logueado
- **Vista adaptativa** según rol del usuario

### 📚 Gestión de Libros (BooksPage)
- **Listado completo** con tabla interactiva (título, ISBN, autor, editorial, categoría, copias)
- **CRUD completo**: Crear, editar, eliminar con confirmación
- **BookModal** con validación de ISBN único
- **Selección de entidades** relacionadas (autor, editorial, categoría)
- **Control de copias**: Total y disponibles
- **Búsqueda y filtrado** en tiempo real
- **Acciones**: Editar (lápiz), Eliminar (papelera)

### ✍️ Gestión de Autores (AuthorsPage)
- **Tabla de autores** con nombre completo, fecha de nacimiento, nacionalidad
- **AuthorModal** con biografía extendida
- **Validación de fechas** (no nacimiento futuro)
- **Nacionalidad** con listado de países
- **Eliminación con verificación** de libros asociados

### 🏢 Gestión de Editoriales (PublishersPage)
- **Lista de editoriales** con país, contacto, sitio web
- **PublisherModal** con validación de email
- **Switch de estado** activo/inactivo
- **Información de contacto** completa (email, teléfono)
- **Filtro** por estado (activo/inactivo)

### 🏷️ Gestión de Categorías (CategoriesPage)
- **Tabla de categorías** con nombre y descripción
- **CategoryModal** simple y rápido
- **Toggle de estado** activo/inactivo
- **Badge visual** de estado con colores
- **Validación** de nombre único

### 👥 Gestión de Miembros (MembersPage)
- **Listado de miembros** con documento, email, tipo de membresía
- **MemberModal** con **creación automática de usuario**
- **Tipos de membresía**: Básica, Premium, Estudiante
- **Estados visuales**: Activo (verde), Inactivo (rojo)
- **Campos requeridos**: Nombre, apellido, email, documento
- **Generación de credenciales** (username, password) al crear

### 👔 Gestión de Empleados (EmployeesPage)
- **Tabla de empleados** con cargo, departamento, fecha de contratación, salario
- **EmployeeModal** con **creación automática de usuario bibliotecario**
- **Validación de salario** (número positivo)
- **Fecha de contratación** con DatePicker
- **Toggle de estado** activo/inactivo
- **Generación automática** de cuenta con rol librarian

### 📖 Gestión de Préstamos (LoansPage)
- **Lista de préstamos** con libro, miembro, fechas, estado
- **LoanModal** con cálculo automático de fecha de vencimiento
- **Estados**: Activo, Devuelto, Vencido (con colores)
- **Validación de disponibilidad** del libro
- **Selección de días** de préstamo (7, 14, 21, 30 días)
- **Control de devolución** con botón "Devolver"
- **Actualización automática** de copias disponibles

### 📝 Gestión de Reservas (ReservationsPage)
- **Tabla de reservas** con libro, miembro, fechas, estado
- **ReservationModal** para libros no disponibles
- **4 estados**: Pendiente, Confirmado, Cancelado, Completado
- **Fechas automáticas**: Creación + 7 días de expiración
- **Botones de acción**: Confirmar, Cancelar
- **Conversión a préstamo** cuando el libro está disponible

### 💰 Gestión de Multas (FinesPage)
- **Lista de multas** con préstamo, miembro, monto, estado
- **FineModal** para ver detalles y procesar pago
- **Cálculo automático** por días de retraso ($5 por día)
- **Estados**: Pendiente, Pagado, Cancelado
- **Procesamiento de pago** con fecha de pago
- **Vinculación** con préstamo vencido

### 📦 Gestión de Inventario (InventoryPage)
- **Control físico** de ejemplares con código de barras
- **InventoryModal** con ubicación y condición
- **Condiciones físicas**: Excelente, Bueno, Regular, Pobre, Dañado
- **Estados**: Disponible, Prestado, Reservado, Reparación, Perdido
- **Código de barras** único por ejemplar
- **Ubicación** detallada (estante, pasillo)

### 🚚 Gestión de Proveedores (SuppliersPage)
- **Tabla de proveedores** con contacto, email, teléfono
- **SupplierModal** con datos de contacto completos
- **Validación de email** y teléfono
- **Persona de contacto** designada
- **Toggle activo/inactivo**
- **Dirección completa** del proveedor

---

## 🎨 Características de Diseño

### 💎 Interfaz de Usuario
- **Framework**: Bootstrap 5.3.2 + React-Bootstrap 2.9.1
- **Responsive Design**: Adaptado a móviles, tablets y desktop
- **Dark Mode**: Navbar oscuro con fondo degradado
- **Iconos**: Bootstrap Icons 1.11.3 (2000+ iconos)
- **Colores intuitivos**: Verde (activo), Rojo (inactivo), Amarillo (pendiente), Azul (información)

### 🧩 Componentes Reutilizables
- **Layout.tsx**: Estructura con navbar, sidebar y contenido principal
- **PrivateRoute.tsx**: Protección de rutas por autenticación
- **ProtectedRoute.tsx**: Protección avanzada por roles
- **Loading.tsx**: Indicador de carga con spinner
- **12 Modales**: Uno por entidad con validación completa

### 🎯 UX/Usabilidad
- **Feedback visual** inmediato en todas las operaciones
- **Confirmaciones** antes de eliminar datos
- **Mensajes de error** descriptivos y amigables
- **Validación en tiempo real** en formularios
- **Estados de carga** con spinners durante operaciones asíncronas
- **Navegación intuitiva** con sidebar colapsable
- **Breadcrumbs** para ubicación en el sistema

---

## 🔒 Seguridad y Control de Acceso

### 🛡️ Sistema de Autenticación
- **Login seguro** con validación de credenciales contra `db.json`
- **Context API** para gestión de sesión global (`AuthContext`)
- **LocalStorage** para persistencia de sesión (no en producción real)
- **Logout** con limpieza completa de sesión

### 🔐 Sistema de Roles y Permisos

#### 3 Roles Definidos

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **admin** | Administrador del sistema | ✅ Acceso completo a todos los módulos y operaciones |
| **librarian** | Bibliotecario | ✅ Gestión de libros, préstamos, reservas, multas<br>❌ No puede gestionar empleados ni proveedores |
| **member** | Miembro/Usuario | ✅ Solo lectura de catálogo y consulta de préstamos propios<br>❌ No puede crear/editar/eliminar |

#### 🔧 Hook de Permisos (`usePermissions.ts`)

```typescript
export const usePermissions = () => {
  const { user } = useAuth();
  
  return {
    canManageBooks: ['admin', 'librarian'].includes(user?.role),
    canManageLoans: ['admin', 'librarian'].includes(user?.role),
    canManageMembers: ['admin'].includes(user?.role),
    canManageEmployees: ['admin'].includes(user?.role),
    // ... más permisos
  };
};
```

### 🚧 Protección de Rutas

#### PrivateRoute (Autenticación)
```typescript
// Ruta accesible solo si el usuario está autenticado
<Route path="/dashboard" element={
  <PrivateRoute>
    <Dashboard />
  </PrivateRoute>
} />
```

#### ProtectedRoute (Roles)
```typescript
// Ruta accesible solo para admin y librarian
<Route path="/employees" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <EmployeesPage />
  </ProtectedRoute>
} />
```

### 🔍 Validaciones Implementadas

- ✅ **Validación de sesión** en cada renderizado de ruta protegida
- ✅ **Validación de roles** antes de mostrar componentes sensibles
- ✅ **Redirección automática** al login si no hay sesión
- ✅ **Redirección a /unauthorized** si no tiene permisos
- ✅ **Validación de formularios** con TypeScript y restricciones HTML5
- ✅ **Validación de datos** antes de enviar a la API
- ✅ **Sanitización** de entradas de usuario

### 🛑 Limitaciones de Seguridad (Desarrollo)

**⚠️ IMPORTANTE - SOLO PARA DESARROLLO:**

Este sistema utiliza `json-server` y **NO ES SEGURO PARA PRODUCCIÓN**:

- ❌ **No hay encriptación** de contraseñas (están en texto plano en `db.json`)
- ❌ **No hay JWT** ni tokens de autenticación
- ❌ **No hay rate limiting** en las peticiones
- ❌ **LocalStorage** no es seguro para tokens reales
- ❌ **CORS** abierto para desarrollo local
- ❌ **No hay HTTPS** (solo HTTP en desarrollo)

**Para producción se requiere:**
- 🔒 Backend real con Node.js/Express o similar
- 🔒 Encriptación de contraseñas con bcrypt
- 🔒 JWT para tokens de sesión
- 🔒 Base de datos real (PostgreSQL, MySQL, MongoDB)
- 🔒 HTTPS con certificado SSL
- 🔒 Middleware de autenticación y autorización
- 🔒 Rate limiting y protección contra ataques

---

## 📊 Estado del Proyecto

### ✅ Completado (100%)

#### Módulos CRUD (12/12)
- ✅ Gestión de Libros
- ✅ Gestión de Autores  
- ✅ Gestión de Editoriales
- ✅ Gestión de Categorías
- ✅ Gestión de Miembros (con creación de usuario)
- ✅ Gestión de Empleados (con creación de usuario)
- ✅ Gestión de Préstamos
- ✅ Gestión de Reservas
- ✅ Gestión de Multas
- ✅ Gestión de Inventario
- ✅ Gestión de Proveedores
- ✅ Gestión de Editoriales (Publishers)

#### Funcionalidades Core
- ✅ Sistema de autenticación con roles
- ✅ Rutas protegidas por autenticación y roles
- ✅ Context API (AuthContext + DataContext)
- ✅ Hook de permisos (`usePermissions`)
- ✅ 12 modales completos con validación
- ✅ Operaciones CRUD completas en todos los módulos
- ✅ Toggle de estados (activo/inactivo)
- ✅ Eliminación con confirmación
- ✅ Dashboards diferenciados por rol
- ✅ Arquitectura modular por features

#### UI/UX
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Componentes de React-Bootstrap
- ✅ Iconos de Bootstrap Icons
- ✅ Feedback visual en operaciones
- ✅ Estados de carga con spinners
- ✅ Badges de estado con colores
- ✅ Navegación con sidebar y navbar

#### Infraestructura
- ✅ TypeScript configurado con tipado estricto
- ✅ Vite para build rápido con HMR
- ✅ ESLint para linting de código
- ✅ json-server como backend simulado
- ✅ Estructura modular escalable
- ✅ Documentación completa en README

### 🚀 Posibles Mejoras Futuras

#### Backend Real
- 🔄 Migrar a Node.js + Express
- 🔄 Base de datos real (PostgreSQL/MongoDB)
- 🔄 Autenticación JWT
- 🔄 Encriptación de contraseñas
- 🔄 API RESTful completa

#### Funcionalidades Avanzadas
- 🔄 Reportes y estadísticas avanzadas
- 🔄 Exportación a PDF/Excel
- 🔄 Sistema de notificaciones (email/push)
- 🔄 Búsqueda avanzada con filtros múltiples
- 🔄 Historial de operaciones (logs)
- 🔄 Dashboard con gráficos (Chart.js)
- 🔄 Paginación en tablas grandes
- 🔄 Ordenamiento de columnas

#### UI/UX
- 🔄 Modo oscuro/claro (dark mode)
- 🔄 Internacionalización (i18n)
- 🔄 Animaciones más elaboradas
- 🔄 Drag & Drop para reorganización
- 🔄 Preview de imágenes de libros

#### Testing
- 🔄 Tests unitarios con Jest
- 🔄 Tests de integración
- 🔄 Tests E2E con Cypress
- 🔄 Cobertura de código

---

## 📞 Soporte y Contacto

### 📚 Documentación Adicional

- **GUIA_INICIO_DB.md**: Guía de la base de datos JSON
- **INICIO_RAPIDO.md**: Inicio rápido del proyecto
- **INSTALACION.md**: Manual de instalación detallado
- **SISTEMA_COMPLETO.md**: Documentación técnica completa
- **SISTEMA_PERMISOS.md**: Sistema de roles y permisos
- **PROMPT_PROYECTO.md**: Especificaciones del proyecto
- **RESUMEN_EJECUTIVO.md**: Resumen ejecutivo para stakeholders

### 🐛 Reportar Problemas

Si encuentras algún bug o problema:

1. Verificar que `json-server` esté corriendo en puerto 3001
2. Verificar que la aplicación esté corriendo en puerto 5173
3. Revisar la consola del navegador para errores
4. Verificar la consola de la terminal para errores del servidor
5. Consultar la sección de "Solución de Problemas Comunes"

### 💡 Sugerencias de Mejora

Para sugerir mejoras o nuevas funcionalidades, considera:

- Funcionalidades más solicitadas por bibliotecas reales
- Mejoras en la experiencia de usuario
- Optimizaciones de rendimiento
- Nuevos módulos de gestión

---

## 📄 Licencia

Este proyecto fue desarrollado como sistema de gestión bibliotecaria educativo para la **UTP (Universidad Tecnológica de Panamá)**.

---

## 🙏 Agradecimientos

- **React Team**: Por el excelente framework
- **TypeScript Team**: Por el tipado estático robusto
- **Bootstrap Team**: Por los componentes de UI
- **Vite Team**: Por la herramienta de build ultrarrápida
- **json-server**: Por la API simulada simple y efectiva

---

**Desarrollado con ❤️ para la gestión eficiente de bibliotecas universitarias**

🚀 **BiblioTech v1.0.0** | Sistema de Gestión de Biblioteca UTP | 2024
- Roles de usuario diferenciados
- Sesión persistente en localStorage

---

## 📊 Estado del Proyecto

✅ **Completado:**
- Estructura completa del proyecto
- 12 clases de dominio implementadas
- Sistema de autenticación funcional
- Dashboard interactivo
- Formularios CRUD principales
- Sistema multiventana (3+ modales)
- Navegación completa
- Diseño responsive
- TypeScript en todo el proyecto
- Bootstrap 5 integrado

🚧 **En desarrollo:**
- Páginas de Autores, Editoriales y Empleados (placeholders creados)
- Funcionalidades avanzadas de búsqueda
- Reportes y estadísticas detalladas
- Integración con backend (actualmente usa datos mock)

---

## 🤝 Contribuciones

Este proyecto fue desarrollado como sistema académico de gestión de biblioteca, siguiendo los requisitos de:

- ✅ Framework: React con TypeScript
- ✅ UI Framework: Bootstrap 5
- ✅ 12 Clases de dominio mínimo
- ✅ Login de acceso
- ✅ Menú de opciones
- ✅ Dashboard de bienvenida
- ✅ Formularios CRUD
- ✅ Sistema multiventana (3+ modales)
- ✅ Estructura de carpetas profesional
- ✅ Versiones actualizadas de frameworks

---

## 📝 Notas Adicionales

### Datos de Ejemplo
El sistema viene con datos de ejemplo precargados:
- 2 libros de ejemplo
- 2 autores
- 2 editoriales
- 4 categorías
- 2 miembros
- 1 empleado

### Persistencia
Actualmente, los datos se almacenan en memoria durante la sesión. Para persistencia real, se puede integrar con:
- API REST backend
- Firebase
- LocalStorage extendido
- Base de datos SQL/NoSQL

### Extensiones Futuras
- Backend con Node.js/Express
- Base de datos MongoDB/PostgreSQL
- Autenticación JWT
- Sistema de notificaciones
- Reportes PDF
- Búsqueda avanzada
- Integración con APIs externas (ISBN)

---

## 📞 Soporte

Para problemas o consultas sobre el sistema BiblioTech, revisa:

1. La documentación en este README
2. Los comentarios en el código fuente
3. La consola del navegador para errores de ejecución

---

## 📄 Licencia

Este proyecto es de uso académico y demostrativo.

---

## 🎓 Desarrollado con

- ❤️ Pasión por el código limpio
- 🧠 Conocimientos de React y TypeScript
- 🎨 Diseño centrado en el usuario
- 📚 Mejores prácticas de desarrollo

---

**BiblioTech v1.0.0** - Sistema Completo de Gestión de Biblioteca

*Desarrollado con React 18 + TypeScript + Bootstrap 5*
