# 🔧 **Vercel Login Fix - Guía de Debugging**

## 🚨 **Problema Identificado**
El login no funciona en Vercel porque falta la configuración correcta de API endpoints.

## ✅ **Solución Implementada**

### 1. **Estructura de API para Vercel**
```
api/
├── ping.ts                    # Test endpoint
├── auth/
│   ├── login.ts              # POST /api/auth/login
│   └── verify.ts             # GET /api/auth/verify
```

### 2. **Archivos Creados**
- `api/auth/login.ts` - Endpoint de autenticación
- `api/auth/verify.ts` - Verificación de tokens
- `api/ping.ts` - Endpoint de test
- `vercel.json` - Configuración de Vercel

### 3. **Endpoints Disponibles**
- `GET /api/ping` - Test de conectividad
- `POST /api/auth/login` - Login de usuarios
- `GET /api/auth/verify` - Verificación de token

## 🧪 **Cómo Testear en Vercel**

### **Paso 1: Verificar API**
```bash
# Test ping
curl https://tu-domain.vercel.app/api/ping

# Respuesta esperada:
{"message":"pong from Vercel!"}
```

### **Paso 2: Test Login**
```bash
curl -X POST https://tu-domain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@iglesia360.com","password":"admin123"}'
```

### **Paso 3: Test Verify**
```bash
curl https://tu-domain.vercel.app/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔍 **Debugging en el Browser**

### **1. Abrir DevTools (F12)**
```javascript
// Test ping
fetch('/api/ping').then(r => r.json()).then(console.log)

// Test login
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@iglesia360.com',
    password: 'admin123'
  })
}).then(r => r.json()).then(console.log)
```

### **2. Network Tab**
- Verifica que las requests vayan a `/api/auth/login`
- Revisa el status code (debe ser 200)
- Checa la respuesta JSON

## 🎯 **Usuarios Demo**
| Email | Password | Rol |
|-------|----------|-----|
| admin@iglesia360.com | admin123 | admin |
| pastor@iglesia360.com | pastor123 | pastor |
| demo@iglesia360.com | demo123 | user |

## ⚡ **Despliegue Automático**

### **Comandos para Re-deployar**
```bash
# Si usas Vercel CLI
vercel --prod

# O push to git (si está conectado)
git add .
git commit -m "Fix: Vercel API endpoints"
git push origin main
```

## 🔧 **Posibles Errores y Soluciones**

### **Error 404 en /api/auth/login**
- ✅ Verifica que `api/auth/login.ts` existe
- ✅ Checa que `vercel.json` esté configurado
- ✅ Re-deploya la aplicación

### **Error CORS**
- ✅ Los headers CORS están incluidos en cada endpoint
- ✅ Verifica que las requests sean del mismo dominio

### **Error 500**
- ✅ Revisa los logs en Vercel dashboard
- ✅ Checa la sintaxis de los archivos API

### **Token Issues**
- ✅ Los tokens se almacenan en memoria (se resetean con cada deploy)
- ✅ En producción considera usar Redis o database

## 📝 **Logs para Debugging**

### **En Vercel Dashboard**
1. Ve a tu proyecto en vercel.com
2. Clicks en "Functions" tab
3. Ve los logs en tiempo real
4. Busca errores en `/api/auth/login`

### **En Browser DevTools**
```javascript
// Enable verbose logging
localStorage.debug = 'auth:*'

// Check auth context
console.log('Auth Context:', useAuth())
```

## 🚀 **Próximos Pasos**

1. **Confirma que `/api/ping` funciona**
2. **Testa el login desde el formulario**
3. **Verifica que el token se guarde correctamente**
4. **Confirma que el dashboard carga después del login**

## 📞 **Si Sigue Sin Funcionar**

Comparte estos datos para debugging:
- URL de tu Vercel app
- Mensaje de error exacto
- Screenshot del Network tab
- Logs del Vercel dashboard

---

**¡Los endpoints están configurados correctamente para Vercel!** 🎉