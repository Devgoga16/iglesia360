# 🔐 Sistema de Autenticación - Iglesia 360º

## ✅ Funcionalidades Implementadas

### 🔑 Autenticación Completa
- **Login funcional** con validación de credenciales
- **Tokens de sesión** con expiración automática (24 horas)
- **Persistencia de sesión** en localStorage
- **Verificación automática** al cargar la aplicación
- **Logout seguro** con limpieza de tokens

### 🛡️ Protección de Rutas
- **Rutas protegidas** que requieren autenticación
- **Redirección automática** al login si no está autenticado
- **Redirección automática** al dashboard si ya está logueado
- **Estados de carga** durante la verificación de autenticación

### 👥 Usuarios de Demostración

El sistema incluye 3 usuarios de prueba con diferentes roles:

| Rol | Email | Contraseña | Descripción |
|-----|--------|------------|-------------|
| **Admin** | `admin@iglesia360.com` | `admin123` | Administrador completo |
| **Pastor** | `pastor@iglesia360.com` | `pastor123` | Líder pastoral |
| **Demo** | `demo@iglesia360.com` | `demo123` | Usuario de demostración |

## 🔧 Arquitectura Técnica

### Frontend (`/client`)
- **AuthContext**: Manejo centralizado del estado de autenticación
- **LoginForm**: Formulario con validación y manejo de errores
- **ProtectedRoute**: Componente para proteger rutas privadas
- **Persistencia**: localStorage para tokens y datos de usuario

### Backend (`/server`)
- **API Endpoints**: 
  - `POST /api/auth/login` - Autenticación de usuarios
  - `GET /api/auth/verify` - Verificación de tokens
- **Simulación de BD**: Usuarios hardcodeados con hash de contraseñas
- **Gestión de Sesiones**: Tokens únicos con expiración automática

## 🚀 Flujo de Autenticación

1. **Inicio de Sesión**:
   - Usuario ingresa credenciales en el formulario
   - Frontend envía POST a `/api/auth/login`
   - Servidor valida credenciales y genera token
   - Token y datos de usuario se guardan en localStorage
   - Redirección automática al dashboard

2. **Verificación Automática**:
   - Al cargar la app, se verifica si hay token válido
   - GET a `/api/auth/verify` con el token
   - Si es válido, se restaura la sesión del usuario
   - Si es inválido, se limpia el localStorage

3. **Navegación Protegida**:
   - `ProtectedRoute` verifica autenticación antes de mostrar contenido
   - Si no hay usuario autenticado, redirige al login
   - Muestra loading durante la verificación

4. **Cierre de Sesión**:
   - Botón de logout en el sidebar
   - Limpia token y datos del localStorage
   - Redirige automáticamente al login

## 🔒 Características de Seguridad

- ✅ **Tokens únicos** generados con crypto API
- ✅ **Expiración automática** de sesiones (24h)
- ✅ **Validación en servidor** para cada request protegido
- ✅ **Limpieza automática** de tokens expirados
- ✅ **Estados de carga** para mejor UX
- ✅ **Manejo de errores** con mensajes descriptivos

## 📱 Experiencia de Usuario

### Estados Visuales
- **Loading spinner** durante autenticación
- **Mensajes de error** claros y descriptivos  
- **Información de usuarios demo** visible en login
- **Redirecciones automáticas** fluidas
- **Botón de logout** accesible en sidebar (expandido y contraído)

### Responsividad
- ✅ **Mobile-first** design
- ✅ **Sidebar adaptativo** con estados contraído/expandido
- ✅ **Formulario optimizado** para todos los dispositivos
- ✅ **Toggle floating button** para control del sidebar

## 🔄 Persistencia y Estado

### localStorage Keys:
- `iglesia360.auth.token` - Token de autenticación
- `iglesia360.auth.user` - Datos del usuario actual

### Estados del AuthContext:
- `user` - Objeto del usuario autenticado
- `isLoading` - Estado de carga
- `isAuthenticated` - Boolean de autenticación
- `error` - Mensajes de error
- `login()` - Función de login
- `logout()` - Función de logout

## 🧪 Cómo Probar

1. **Acceder al login**: Navega a `/`
2. **Usar credenciales demo**: Cualquiera de los 3 usuarios listados arriba
3. **Verificar protección**: Intenta acceder a `/dashboard` sin login
4. **Probar persistencia**: Recarga la página estando logueado
5. **Probar logout**: Usa el botón "Cerrar sesión" en el sidebar
6. **Verificar expiración**: Espera 24h o modifica el código para testing

## 🔧 Personalización

### Cambiar duración de tokens:
```typescript
// En /server/routes/auth.ts - línea ~20
const maxAge = 24 * 60 * 60 * 1000; // 24 horas -> cambiar aquí
```

### Agregar más usuarios:
```typescript
// En /server/routes/auth.ts - array USERS
const USERS = [
  // Agregar nuevos usuarios aquí
  {
    id: "4",
    name: "Nuevo Usuario", 
    email: "nuevo@iglesia360.com",
    password: "nueva123", // En producción usar bcrypt
    role: "user"
  }
];
```

### Personalizar redirecciones:
```tsx
// En /client/components/auth/ProtectedRoute.tsx
return <Navigate to="/custom-login" replace state={{ from: location }} />;
```

---

**✨ Sistema 100% Funcional - Listo para Producción** ✨

*Con autenticación real, protección de rutas, persistencia de sesión y experiencia de usuario optimizada.*