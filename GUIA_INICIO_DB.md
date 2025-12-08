# 🚀 Guía de Inicio Rápido - BiblioTech con Base de Datos

## 📋 Requisitos Previos
- Node.js (versión 16 o superior)
- npm (viene con Node.js)

## ⚙️ Instalación

1. **Instalar dependencias:**
```bash
npm install
```

## 🎯 Iniciar la Aplicación

### Opción 1: Iniciar Todo (Recomendado)
Ejecuta el servidor backend y frontend simultáneamente:
```bash
npm start
```

Esto iniciará:
- **json-server** en http://localhost:3001 (Backend/API)
- **Vite** en http://localhost:5173 (Frontend)

### Opción 2: Iniciar Manualmente

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 🔐 Usuarios de Prueba

La aplicación incluye 3 roles con diferentes permisos:

### 👑 Administrador
```
Usuario: admin
Contraseña: admin123
```
**Permisos**: Control total del sistema

### 📚 Bibliotecario
```
Usuario: librarian
Contraseña: lib123
```
**Permisos**: Gestión de libros, miembros, préstamos y reservas

### 👤 Miembro
```
Usuario: member
Contraseña: mem123
```
**Permisos**: Ver catálogo, hacer reservas, consultar préstamos y multas propias

## 📊 Base de Datos

Los datos se almacenan en `db.json` que incluye:

- ✅ **3 usuarios** (admin, bibliotecario, miembro)
- ✅ **5 categorías** de libros
- ✅ **4 autores**
- ✅ **3 editoriales**
- ✅ **4 libros** en el catálogo
- ✅ **3 miembros** registrados
- ✅ **2 empleados**
- ✅ **3 préstamos** (activos y vencidos)
- ✅ **2 reservas** pendientes
- ✅ **2 multas** pendientes
- ✅ **2 registros** de inventario
- ✅ **2 proveedores**

## 🛠️ Funcionalidades Implementadas

### ✅ Sistema Completo de CRUD
Todas las entidades soportan operaciones completas:
- **Crear** nuevos registros
- **Leer** todos los datos
- **Actualizar** información existente
- **Eliminar** registros (donde aplique)

### ✅ Persistencia de Datos
- Los datos se guardan automáticamente en `db.json`
- Los cambios persisten entre sesiones
- Operaciones en tiempo real

### ✅ Control de Acceso por Roles
- Dashboard diferenciado según el rol
- Menú de navegación dinámico
- Permisos granulares por funcionalidad

### ✅ Gestión de Inventario
- Control de copias disponibles
- Actualización automática al prestar/devolver
- Validaciones de disponibilidad

## 🎨 Características Destacadas

1. **Interfaz Responsive**: Diseño adaptable a todos los dispositivos
2. **Carga Asíncrona**: Indicadores de carga durante operaciones
3. **Manejo de Errores**: Mensajes claros cuando algo falla
4. **Validaciones**: Formularios con validación en tiempo real
5. **Sistema Multiventana**: Modales para operaciones rápidas

## 🔄 Operaciones Principales

### Como Administrador:
1. Gestionar todo el sistema
2. Crear y editar usuarios
3. Supervisar inventario y proveedores
4. Ver reportes completos

### Como Bibliotecario:
1. Registrar nuevos libros
2. Agregar miembros
3. Realizar préstamos
4. Gestionar reservas y multas

### Como Miembro:
1. Explorar el catálogo
2. Hacer reservas de libros
3. Ver historial de préstamos
4. Consultar multas pendientes

## 📁 Estructura del Proyecto

```
BIBLIOTECH/
├── db.json                      # Base de datos JSON
├── src/
│   ├── components/             # Componentes reutilizables
│   │   ├── modals/            # Modales para CRUD
│   │   ├── Layout.tsx         # Layout principal
│   │   ├── Loading.tsx        # Indicador de carga
│   │   ├── PrivateRoute.tsx   # Protección de rutas
│   │   └── ProtectedRoute.tsx # Control de permisos
│   ├── context/               # Contextos de React
│   │   ├── AuthContext.tsx    # Autenticación
│   │   └── DataContext.tsx    # Manejo de datos
│   ├── hooks/                 # Hooks personalizados
│   │   └── usePermissions.ts  # Sistema de permisos
│   ├── models/                # Modelos de datos
│   ├── pages/                 # Páginas principales
│   │   ├── Dashboard.tsx      # Dashboard admin/bibliotecario
│   │   ├── MemberDashboard.tsx # Dashboard miembros
│   │   ├── BooksPage.tsx      # Gestión de libros
│   │   ├── MembersPage.tsx    # Gestión de miembros
│   │   ├── LoansPage.tsx      # Gestión de préstamos
│   │   └── Login.tsx          # Página de login
│   ├── services/              # Servicios de API
│   │   └── api.ts             # Cliente de API REST
│   └── App.tsx                # Componente principal
└── package.json               # Dependencias y scripts
```

## 🐛 Solución de Problemas

### Error: "Cannot connect to server"
**Solución**: Asegúrate de que json-server esté corriendo:
```bash
npm run server
```

### Error: "Port 3001 already in use"
**Solución**: Cambia el puerto en `package.json` o detén el proceso que usa el puerto 3001.

### Los datos no se guardan
**Solución**: Verifica que `db.json` tenga permisos de escritura y que json-server esté corriendo.

## 📝 Scripts Disponibles

```bash
npm start          # Inicia backend y frontend juntos
npm run dev        # Solo frontend (Vite)
npm run server     # Solo backend (json-server)
npm run build      # Compilar para producción
npm run lint       # Verificar código
npm run preview    # Vista previa de producción
```

## 🔧 Configuración de API

El frontend se comunica con el backend en:
```
http://localhost:3001
```

Para cambiar el puerto o URL, edita `src/services/api.ts`:
```typescript
const API_URL = 'http://localhost:3001';
```

## 🎯 Próximos Pasos

1. Inicia sesión con cualquier usuario de prueba
2. Explora el catálogo de libros
3. Crea nuevos registros (libros, miembros, etc.)
4. Realiza préstamos y reservas
5. Observa cómo los datos persisten en `db.json`

## ✅ Estado del Proyecto

- ✅ Backend REST API con json-server
- ✅ Frontend React con TypeScript
- ✅ Sistema de autenticación
- ✅ CRUD completo para todas las entidades
- ✅ Control de acceso por roles
- ✅ Persistencia de datos
- ✅ Interfaz responsive
- ✅ Manejo de errores
- ✅ Validaciones de formularios

---

**¡Listo para usar!** 🚀

Si encuentras algún problema, revisa la sección de solución de problemas o verifica que todas las dependencias estén instaladas correctamente.
