# 🔐 Sistema de Permisos por Roles - BiblioTech

## Descripción General

El sistema BiblioTech implementa un **sistema completo de control de acceso basado en roles (RBAC)** que define tres niveles de usuario con diferentes privilegios y capacidades.

---

## 👥 Roles y Permisos

### 1. 👑 **Administrador (Admin)**
**Control absoluto del sistema**

#### Permisos Completos:
- ✅ **Gestión de Libros**: Crear, editar, eliminar libros del catálogo
- ✅ **Gestión de Miembros**: Agregar, editar miembros
- ✅ **Gestión de Préstamos**: Registrar y gestionar todos los préstamos
- ✅ **Gestión de Reservas**: Control total sobre reservas
- ✅ **Gestión de Multas**: Crear, modificar, cancelar multas
- ✅ **Gestión de Categorías**: Crear y editar categorías de libros
- ✅ **Gestión de Autores**: Agregar y editar autores
- ✅ **Gestión de Editoriales**: Gestionar editoriales
- ✅ **Gestión de Usuarios**: Control sobre usuarios del sistema
- ✅ **Gestión de Empleados**: Administrar empleados de la biblioteca
- ✅ **Inventario**: Control del inventario de la biblioteca
- ✅ **Proveedores**: Gestionar proveedores
- ✅ **Reportes**: Acceso a todos los reportes
- ✅ **Configuración del Sistema**: Modificar configuración general

#### Credenciales de Acceso:
```
Usuario: admin
Contraseña: admin123
```

---

### 2. 📚 **Bibliotecario (Librarian)**
**Gestión operativa diaria de la biblioteca**

#### Permisos Otorgados:
- ✅ **Gestión de Libros**: Registrar nuevos libros al catálogo
- ✅ **Gestión de Miembros**: Agregar nuevos miembros al sistema
- ✅ **Gestión de Préstamos**: Realizar préstamos a miembros
- ✅ **Gestión de Reservas**: Procesar reservas de los miembros
- ✅ **Gestión de Multas**: Registrar y gestionar multas
- ✅ **Gestión de Categorías**: Crear categorías de libros
- ✅ **Gestión de Autores**: Agregar autores
- ✅ **Gestión de Editoriales**: Agregar editoriales
- ✅ **Reportes**: Ver reportes operativos

#### Restricciones:
- ❌ **NO** puede gestionar usuarios del sistema
- ❌ **NO** puede gestionar empleados
- ❌ **NO** puede modificar configuración del sistema
- ❌ **NO** puede acceder al inventario
- ❌ **NO** puede gestionar proveedores

#### Credenciales de Acceso:
```
Usuario: librarian
Contraseña: lib123
```

---

### 3. 👤 **Miembro (Member)**
**Usuario cliente con vista personalizada**

#### Permisos Otorgados:
- ✅ **Ver Catálogo**: Explorar el catálogo completo de libros
- ✅ **Hacer Reservas**: Reservar libros disponibles
- ✅ **Ver Historial de Préstamos**: Consultar su historial personal
- ✅ **Ver Multas Propias**: Consultar sus multas pendientes
- ✅ **Ver Perfil**: Acceder a su información personal

#### Restricciones:
- ❌ **NO** puede gestionar libros
- ❌ **NO** puede gestionar otros miembros
- ❌ **NO** puede gestionar préstamos
- ❌ **NO** puede ver/gestionar multas de otros
- ❌ **NO** puede acceder a módulos administrativos

#### Dashboard Personalizado:
Los miembros tienen un **dashboard especial** que muestra:
- 📖 Préstamos activos
- ⚠️ Préstamos vencidos
- 🔖 Reservas pendientes
- 💰 Multas por pagar
- 📚 Historial de préstamos
- 🎯 Acciones rápidas (hacer reservas, explorar catálogo)

#### Credenciales de Acceso:
```
Usuario: member
Contraseña: mem123
```

---

## 🛠️ Implementación Técnica

### Hook de Permisos: `usePermissions`
```typescript
const { hasPermission, canAccess, role } = usePermissions();

// Verificar permiso específico
if (hasPermission('canManageBooks')) {
  // Mostrar botón de gestión
}

// Verificar acceso a recurso
if (canAccess('members')) {
  // Permitir acceso
}
```

### Componente de Protección: `ProtectedRoute`
```typescript
<ProtectedRoute allowedRoles={['admin', 'librarian']}>
  <MembersPage />
</ProtectedRoute>
```

---

## 📋 Matriz de Permisos

| Funcionalidad | Admin | Bibliotecario | Miembro |
|--------------|:-----:|:-------------:|:-------:|
| Dashboard | ✅ | ✅ | ✅* |
| Ver Libros | ✅ | ✅ | ✅ |
| Gestionar Libros | ✅ | ✅ | ❌ |
| Gestionar Miembros | ✅ | ✅ | ❌ |
| Gestionar Préstamos | ✅ | ✅ | ❌ |
| Ver Préstamos Propios | ✅ | ✅ | ✅ |
| Gestionar Reservas | ✅ | ✅ | ❌ |
| Hacer Reservas | ✅ | ✅ | ✅ |
| Gestionar Multas | ✅ | ✅ | ❌ |
| Ver Multas Propias | ✅ | ✅ | ✅ |
| Gestionar Categorías | ✅ | ✅ | ❌ |
| Gestionar Autores | ✅ | ✅ | ❌ |
| Gestionar Editoriales | ✅ | ✅ | ❌ |
| Gestionar Empleados | ✅ | ❌ | ❌ |
| Gestionar Usuarios | ✅ | ❌ | ❌ |
| Inventario | ✅ | ❌ | ❌ |
| Proveedores | ✅ | ❌ | ❌ |
| Reportes | ✅ | ✅ | ❌ |
| Configuración | ✅ | ❌ | ❌ |

*Dashboard personalizado para miembros

---

## 🎯 Funcionalidades Clave

### 1. **Navegación Dinámica**
El menú de navegación se adapta automáticamente según el rol:
- Los **miembros** solo ven: Catálogo, Mis Reservas, Mis Multas
- Los **bibliotecarios** ven: Gestión de libros, miembros, préstamos, reservas
- Los **admins** ven: Todo, incluido gestión de sistema e inventario

### 2. **Dashboard Diferenciado**
- **Admin/Bibliotecario**: Dashboard con estadísticas generales y acciones rápidas
- **Miembro**: Dashboard personalizado con su información específica

### 3. **Acciones Contextuales**
Los botones y acciones se muestran/ocultan según permisos:
```typescript
{hasPermission('canManageBooks') && (
  <Button>Nuevo Libro</Button>
)}
```

### 4. **Protección de Rutas**
Las rutas están protegidas a nivel de enrutador:
```typescript
<Route path="members" element={
  <ProtectedRoute allowedRoles={['admin', 'librarian']}>
    <MembersPage />
  </ProtectedRoute>
} />
```

### 5. **Mensajes de Acceso Denegado**
Cuando un usuario intenta acceder a una página sin permisos, ve un mensaje claro explicando la restricción.

---

## 🚀 Uso del Sistema

### Para Administradores:
1. Inicia sesión con credenciales de admin
2. Accede a cualquier módulo del sistema
3. Gestiona usuarios, empleados, y configuración
4. Supervisa todas las operaciones

### Para Bibliotecarios:
1. Inicia sesión con credenciales de bibliotecario
2. Registra nuevos libros y miembros
3. Procesa préstamos y reservas
4. Gestiona multas y devoluciones

### Para Miembros:
1. Inicia sesión con credenciales de miembro
2. Explora el catálogo de libros
3. Realiza reservas de libros disponibles
4. Consulta tu historial y multas

---

## 📝 Notas de Seguridad

- ✅ Todos los permisos se validan tanto en el **frontend** como deberían validarse en el **backend**
- ✅ Las rutas protegidas previenen accesos no autorizados
- ✅ Los componentes se ocultan dinámicamente según permisos
- ✅ Mensajes claros de denegación de acceso
- ✅ Sistema extensible para agregar nuevos roles o permisos

---

## 🔄 Extensibilidad

El sistema está diseñado para ser fácilmente extensible:

### Agregar Nuevo Rol:
1. Definir permisos en `usePermissions.ts`
2. Actualizar el modelo `User.ts`
3. Agregar credenciales en `AuthContext.tsx`

### Agregar Nuevo Permiso:
1. Definir en `PERMISSIONS` objeto
2. Usar `hasPermission('nuevoPermiso')` en componentes
3. Agregar a `ProtectedRoute` si aplica

---

## ✅ Estado de Implementación

- ✅ Sistema de roles implementado
- ✅ Hook de permisos funcional
- ✅ Componente de protección de rutas
- ✅ Dashboard diferenciado por rol
- ✅ Navegación dinámica
- ✅ Restricciones de acceso
- ✅ Mensajes de error personalizados
- ✅ Validación en todas las páginas
- ✅ Sistema compilado y funcional

---

**Fecha de Implementación**: Diciembre 2025  
**Versión**: 1.0.0  
**Estado**: ✅ Completamente Funcional
