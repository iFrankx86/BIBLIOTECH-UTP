# 📚 BiblioTech - Sistema de Gestión de Biblioteca

![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple)
![Vite](https://img.shields.io/badge/Vite-5.0.8-yellow)

Sistema completo de gestión de biblioteca desarrollado con **React 18**, **TypeScript** y **Bootstrap 5**, implementando arquitectura moderna, 12 clases de dominio y funcionalidad multiventana.

---

## 📋 Descripción del Sistema

**BiblioTech** es una aplicación web integral para la gestión de bibliotecas que permite administrar libros, miembros, préstamos, reservas, multas, inventario y más. El sistema está diseñado con las mejores prácticas de desarrollo, utilizando tecnologías modernas y siguiendo los principios de código limpio y arquitectura escalable.

### ✨ Características Principales

- 🔐 **Sistema de Autenticación**: Login seguro con múltiples roles (Admin, Bibliotecario, Miembro)
- 📊 **Dashboard Interactivo**: Panel de control con estadísticas en tiempo real
- 📚 **Gestión Completa de Libros**: CRUD completo con búsqueda y filtrado
- 👥 **Administración de Miembros**: Registro y seguimiento de usuarios
- 🔄 **Sistema de Préstamos**: Control de préstamos con fechas de vencimiento
- 📝 **Reservas de Libros**: Sistema de reservas para libros no disponibles
- 💰 **Gestión de Multas**: Seguimiento de multas y pagos
- 📦 **Control de Inventario**: Gestión de copias y estado de libros
- 🪟 **Sistema Multiventana**: Implementación de 3+ modales interactivos
- 🎨 **Interfaz Moderna**: Diseño responsive con Bootstrap 5

---

## 🏗️ Arquitectura y Estructura

### 📁 Estructura de Carpetas

```
BIBLIOTECH/
├── public/
│   └── vite.svg
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Layout.tsx       # Layout principal con navbar
│   │   ├── PrivateRoute.tsx # Protección de rutas
│   │   └── modals/          # Modales multiventana
│   │       ├── BookModal.tsx
│   │       ├── LoanModal.tsx
│   │       └── MemberModal.tsx
│   ├── context/             # Context API para estado global
│   │   ├── AuthContext.tsx  # Contexto de autenticación
│   │   └── DataContext.tsx  # Contexto de datos
│   ├── models/              # 12 Clases de Dominio
│   │   ├── User.ts          # Modelo de usuario
│   │   ├── Book.ts          # Modelo de libro
│   │   ├── Author.ts        # Modelo de autor
│   │   ├── Publisher.ts     # Modelo de editorial
│   │   ├── Category.ts      # Modelo de categoría
│   │   ├── Loan.ts          # Modelo de préstamo
│   │   ├── Reservation.ts   # Modelo de reserva
│   │   ├── Member.ts        # Modelo de miembro
│   │   ├── Fine.ts          # Modelo de multa
│   │   ├── Inventory.ts     # Modelo de inventario
│   │   ├── Supplier.ts      # Modelo de proveedor
│   │   ├── Employee.ts      # Modelo de empleado
│   │   └── index.ts         # Exportaciones centralizadas
│   ├── pages/               # Páginas principales
│   │   ├── Login.tsx        # Página de login
│   │   ├── Dashboard.tsx    # Dashboard principal
│   │   ├── BooksPage.tsx    # Gestión de libros
│   │   ├── MembersPage.tsx  # Gestión de miembros
│   │   ├── LoansPage.tsx    # Gestión de préstamos
│   │   └── CategoriesPage.tsx # Gestión de categorías
│   ├── styles/              # Estilos personalizados
│   │   └── App.css
│   ├── App.tsx              # Componente principal
│   └── main.tsx             # Punto de entrada
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎯 12 Clases de Dominio Implementadas

1. **User** - Usuarios del sistema con roles
2. **Book** - Libros del catálogo
3. **Author** - Autores de los libros
4. **Publisher** - Editoriales
5. **Category** - Categorías de libros
6. **Loan** - Préstamos realizados
7. **Reservation** - Reservas de libros
8. **Member** - Miembros de la biblioteca
9. **Fine** - Multas por retrasos
10. **Inventory** - Control de inventario
11. **Supplier** - Proveedores de libros
12. **Employee** - Empleados de la biblioteca

Cada clase está implementada con TypeScript siguiendo principios de POO, con propiedades tipadas, métodos útiles y constructores bien definidos.

---

## 🪟 Sistema Multiventana (3+ Modales)

El sistema implementa funcionalidad multiventana mediante modales de React-Bootstrap:

1. **BookModal** - Modal para agregar/editar libros
   - Formulario completo con validación
   - Selección de autor, editorial y categoría
   - Gestión de copias disponibles

2. **LoanModal** - Modal para registrar préstamos
   - Selección de libro y miembro
   - Configuración de días de préstamo
   - Validación de disponibilidad

3. **MemberModal** - Modal para agregar miembros
   - Formulario de registro completo
   - Tipos de membresía (Básica, Premium, VIP)
   - Validación de datos

Estos modales se pueden abrir simultáneamente, permitiendo flujos de trabajo más eficientes.

---

## 📦 Tecnologías Utilizadas

### Core
- **React 18.2.0** - Framework de UI
- **TypeScript 5.2.2** - Tipado estático
- **Vite 5.0.8** - Build tool de nueva generación

### UI/UX
- **React-Bootstrap 2.9.1** - Componentes de UI
- **Bootstrap 5.3.2** - Framework CSS
- **Bootstrap Icons 1.11.2** - Iconos

### Routing & State
- **React Router DOM 6.20.1** - Enrutamiento
- **Context API** - Gestión de estado global

### Development
- **ESLint** - Linting
- **TypeScript ESLint** - Linting para TypeScript

---

## 🚀 Manual de Instalación

### Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (viene con Node.js) o **yarn**
- Un editor de código (recomendado: VS Code)

### Pasos de Instalación

#### 1. Clonar o descargar el proyecto

Si tienes el proyecto en tu equipo, navega a la carpeta:

```bash
cd C:\Users\User\Desktop\BIBLIOTECH
```

#### 2. Instalar dependencias

Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
npm install
```

Este comando instalará:
- React y React-DOM
- TypeScript
- Vite
- Bootstrap y React-Bootstrap
- React Router DOM
- Bootstrap Icons
- Todas las dependencias de desarrollo

#### 3. Iniciar el servidor de desarrollo

Una vez instaladas las dependencias, ejecuta:

```bash
npm run dev
```

Verás un mensaje similar a:

```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### 4. Abrir en el navegador

Abre tu navegador y visita:

```
http://localhost:5173
```

¡El sistema BiblioTech estará funcionando! 🎉

---

## 👤 Usuarios de Prueba

El sistema viene con usuarios predefinidos para testing:

| Usuario | Contraseña | Rol | Descripción |
|---------|------------|-----|-------------|
| `admin` | `admin123` | Administrador | Acceso completo al sistema |
| `librarian` | `lib123` | Bibliotecario | Gestión de préstamos y libros |
| `member` | `mem123` | Miembro | Vista limitada, consultas |

---

## 🛠️ Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

---

## 📱 Funcionalidades por Página

### 🏠 Dashboard
- Estadísticas generales (libros, miembros, préstamos, multas)
- Accesos rápidos a funciones principales
- Información del sistema
- Tarjetas interactivas con indicadores visuales

### 📚 Gestión de Libros
- Listado completo de libros con información detallada
- Formulario modal para agregar/editar libros
- Búsqueda y filtrado
- Control de copias disponibles
- Integración con autores, editoriales y categorías

### 👥 Gestión de Miembros
- Listado de todos los miembros
- Información de contacto y membresía
- Estados activos/inactivos
- Tipos de membresía diferenciados

### 📖 Gestión de Préstamos
- Registro de préstamos activos
- Control de fechas de vencimiento
- Estados visuales (activo, vencido, devuelto)
- Asociación libro-miembro

### 🏷️ Categorías
- Visualización de categorías en tarjetas
- Descripción de cada categoría
- Estados activos/inactivos

---

## 🎨 Características de Diseño

### Responsive Design
- Totalmente responsive para móviles, tablets y desktop
- Grid system de Bootstrap
- Componentes adaptativos

### UX/UI
- Interfaz intuitiva y moderna
- Iconos de Bootstrap Icons
- Transiciones suaves
- Feedback visual en acciones
- Badges de estado coloridos
- Modales animados

### Accesibilidad
- Estructura semántica HTML5
- Labels en formularios
- Contraste de colores adecuado
- Navegación por teclado

---

## 🔒 Seguridad

- Rutas protegidas con PrivateRoute
- Autenticación basada en Context API
- Validación de formularios
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
