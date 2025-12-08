# 📦 INSTALACIÓN PASO A PASO - BiblioTech

## 🎯 Guía Visual de Instalación

### ✅ Prerequisitos

Antes de comenzar, verifica que tienes instalado:

```bash
# Verificar Node.js (debe ser versión 16 o superior)
node --version
# Debe mostrar: v16.x.x o superior

# Verificar npm
npm --version
# Debe mostrar: 8.x.x o superior
```

Si no tienes Node.js instalado:
1. Ve a https://nodejs.org/
2. Descarga la versión LTS (Long Term Support)
3. Instala siguiendo el wizard
4. Reinicia tu terminal

---

## 📥 PASO 1: Navegar al Proyecto

Abre tu terminal (PowerShell en Windows) y navega a la carpeta del proyecto:

```powershell
cd C:\Users\User\Desktop\BIBLIOTECH
```

Verifica que estás en la carpeta correcta:
```powershell
dir
```

Deberías ver archivos como: `package.json`, `README.md`, `vite.config.ts`, etc.

---

## 📦 PASO 2: Instalar Dependencias

Ejecuta el comando de instalación:

```powershell
npm install
```

**⏱️ Tiempo estimado:** 2-5 minutos

**📊 Progreso esperado:**
```
npm WARN deprecated [algunas advertencias normales]
added 312 packages, and audited 313 packages in 2m

53 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

**✅ Qué se instalará:**
- React 18.2.0
- React-DOM 18.2.0
- React-Bootstrap 2.9.1
- Bootstrap 5.3.2
- React Router DOM 6.20.1
- Bootstrap Icons 1.11.2
- TypeScript 5.2.2
- Vite 5.0.8
- ESLint y plugins
- Tipos de TypeScript (@types/*)

---

## 🚀 PASO 3: Iniciar el Servidor de Desarrollo

Una vez instaladas las dependencias, ejecuta:

```powershell
npm run dev
```

**📺 Salida esperada:**
```
VITE v5.0.8  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**✅ Indicadores de éxito:**
- No hay errores en rojo
- Muestra la URL local (http://localhost:5173/)
- El servidor está "ready"

---

## 🌐 PASO 4: Abrir en el Navegador

1. Abre tu navegador favorito (Chrome, Firefox, Edge)
2. Visita: `http://localhost:5173`
3. Deberías ver la página de login de BiblioTech

**🎨 Pantalla de Login:**
```
┌─────────────────────────────────────┐
│         📚 BiblioTech              │
│   Sistema de Gestión de Biblioteca │
│                                     │
│   Usuario:  [_______________]      │
│   Contraseña: [_______________]    │
│                                     │
│        [Iniciar Sesión]            │
│                                     │
│   Usuarios de prueba:               │
│   👤 Admin: admin / admin123       │
│   👤 Bibliotecario: librarian/lib123│
│   👤 Miembro: member / mem123      │
└─────────────────────────────────────┘
```

---

## 🔐 PASO 5: Iniciar Sesión

Usa cualquiera de estas credenciales:

**Opción 1 - Administrador (Recomendado):**
- Usuario: `admin`
- Contraseña: `admin123`

**Opción 2 - Bibliotecario:**
- Usuario: `librarian`
- Contraseña: `lib123`

**Opción 3 - Miembro:**
- Usuario: `member`
- Contraseña: `mem123`

---

## 🎉 PASO 6: Explorar el Sistema

Una vez logueado, verás el **Dashboard** con:

✅ **Estadísticas:**
- Total de libros
- Miembros registrados
- Préstamos activos
- Multas pendientes

✅ **Menú Principal:**
- Dashboard
- Libros (Books, Authors, Publishers, Categories)
- Miembros (Members, Employees)
- Operaciones (Loans, Reservations, Fines)
- Gestión (Inventory, Suppliers)

✅ **Acciones Rápidas:**
- Registrar Nuevo Libro
- Registrar Préstamo
- Agregar Miembro

---

## 🔧 Solución de Problemas

### ❌ Error: "npm no se reconoce como comando"
**Solución:** Node.js no está instalado o no está en PATH
```powershell
# Reinstalar Node.js desde nodejs.org
# Reiniciar terminal después de instalar
```

### ❌ Error: "Cannot find module"
**Solución:** Las dependencias no se instalaron correctamente
```powershell
# Eliminar node_modules y reinstalar
Remove-Item -Recurse -Force node_modules
npm install
```

### ❌ Error: "Port 5173 is already in use"
**Solución:** El puerto está ocupado
```powershell
# Vite automáticamente usará otro puerto
# O mata el proceso en el puerto 5173
```

### ❌ Error: Página en blanco
**Solución:** Revisar la consola del navegador
```
F12 -> Console -> Ver errores
```

### ❌ Error de TypeScript
**Solución:** Los errores de TypeScript antes de `npm install` son normales
```powershell
# Asegúrate de ejecutar npm install primero
npm install
```

---

## 📝 Comandos Útiles

```powershell
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint

# Detener el servidor
Ctrl + C (en la terminal)

# Ver ayuda de Vite
# Presiona 'h' cuando el servidor esté corriendo
```

---

## 🎨 Pruebas Recomendadas

Una vez que el sistema esté funcionando:

1. **Prueba el Login**
   - Intenta con credenciales incorrectas
   - Luego ingresa con credenciales válidas

2. **Explora el Dashboard**
   - Observa las estadísticas
   - Revisa las tarjetas informativas

3. **Prueba el Sistema Multiventana**
   - Click en "Registrar Nuevo Libro"
   - Click en "Registrar Préstamo"
   - Click en "Agregar Miembro"
   - Observa cómo se abren los modales

4. **Navega por las Secciones**
   - Ve a "Libros" -> Ver lista de libros
   - Ve a "Miembros" -> Ver miembros registrados
   - Ve a "Préstamos" -> Ver préstamos activos
   - Ve a "Categorías" -> Ver categorías disponibles

5. **Prueba Agregar un Libro**
   - Click en "Nuevo Libro"
   - Llena el formulario
   - Guarda y verifica que aparece en la lista

6. **Prueba el Logout**
   - Click en tu nombre de usuario (arriba derecha)
   - Click en "Cerrar Sesión"
   - Verifica que vuelves al login

---

## 📊 Verificación de Instalación Exitosa

✅ **Checklist:**
- [ ] npm install completado sin errores críticos
- [ ] npm run dev inicia correctamente
- [ ] Navegador abre http://localhost:5173
- [ ] Página de login se muestra correctamente
- [ ] Puedes iniciar sesión
- [ ] Dashboard se carga con estadísticas
- [ ] Menú de navegación funciona
- [ ] Modales se abren correctamente
- [ ] Puedes navegar entre páginas
- [ ] No hay errores en consola del navegador

---

## 🎓 Siguientes Pasos

Después de la instalación exitosa:

1. **Lee el README.md completo**
   - Entender la arquitectura
   - Conocer todas las funcionalidades
   - Revisar la documentación técnica

2. **Explora el Código**
   - Revisa las 12 clases de dominio en `src/models/`
   - Observa la estructura de componentes
   - Estudia el Context API en `src/context/`

3. **Prueba las Funcionalidades**
   - Crea libros, miembros y préstamos
   - Explora todas las páginas
   - Prueba el sistema multiventana

4. **Personaliza (Opcional)**
   - Modifica estilos en `src/styles/App.css`
   - Agrega más datos de ejemplo
   - Extiende funcionalidades

---

## 📞 ¿Necesitas Ayuda?

Si encuentras problemas:
1. Revisa esta guía paso a paso
2. Lee el README.md completo
3. Verifica la consola del navegador (F12)
4. Revisa la terminal donde corre npm run dev

---

## 🎉 ¡Felicidades!

Si llegaste hasta aquí y todo funciona:
- ✅ Has instalado exitosamente BiblioTech
- ✅ El sistema está corriendo localmente
- ✅ Puedes explorar todas las funcionalidades
- ✅ Estás listo para presentar o desarrollar

---

**BiblioTech v1.0.0**
Sistema de Gestión de Biblioteca
React 18 + TypeScript + Bootstrap 5
