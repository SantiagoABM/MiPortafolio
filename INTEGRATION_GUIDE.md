# 🔌 Guía de Integración: Frontend + Backend

## 📦 Tienes 2 Proyectos

1. **Frontend** (Next.js + Mantine) - Tu portfolio
2. **Backend** (Fastify + Nodemailer) - API de contacto

## 🚀 Setup Completo

### 1. Backend

```bash
cd portfolio-backend

# Instalar dependencias
npm install

# Configurar Gmail
cp .env.example .env
nano .env  # Agrega tus credenciales

# Ejecutar en desarrollo
npm run dev
```

El backend estará en: `http://localhost:3001`

### 2. Frontend

```bash
cd portfolio-nextjs

# Crear archivo de variables de entorno
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Ejecutar
npm run dev
```

El frontend estará en: `http://localhost:3000`

## ⚙️ Configuración de Variables

### Backend (`.env`)

```env
# Servidor
PORT=3001
HOST=0.0.0.0

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:3000

# Gmail
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-contraseña-de-aplicacion
```

### Frontend (`.env.local`)

```env
# URL del backend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📡 Flujo de Comunicación

```
Usuario rellena formulario (Frontend)
    ↓
POST http://localhost:3001/api/contact
    ↓
Backend valida datos
    ↓
Backend envía email con Nodemailer
    ↓
Gmail envía el email
    ↓
Recibes el email en tu Gmail
    ↓
Frontend muestra mensaje de éxito
```

## 🧪 Probar la Integración

### Opción 1: Desde el Frontend

1. Abre `http://localhost:3000`
2. Scroll hasta la sección de Contacto
3. Rellena el formulario
4. Click en "Enviar Mensaje"
5. Deberías ver un mensaje de éxito
6. Revisa tu Gmail (puede estar en SPAM)

### Opción 2: Con Postman/Thunder Client

```http
POST http://localhost:3001/api/contact
Content-Type: application/json

{
  "name": "Test",
  "email": "test@example.com",
  "message": "Mensaje de prueba"
}
```

## 🐛 Solución de Problemas

### Error: "Failed to fetch"

**Causa**: El backend no está corriendo

**Solución**:
```bash
cd portfolio-backend
npm run dev
```

### Error: CORS

**Causa**: `FRONTEND_URL` en backend no coincide con tu frontend

**Solución**: En `portfolio-backend/.env`:
```env
FRONTEND_URL=http://localhost:3000
```

### Error: "Invalid login" (Gmail)

**Causa**: Credenciales de Gmail incorrectas

**Solución**: Lee [GMAIL_SETUP.md](../portfolio-backend/GMAIL_SETUP.md)

### No recibo emails

**Revisa**:
1. Carpeta de SPAM en Gmail
2. Logs del backend (terminal)
3. Que `EMAIL_USER` sea correcto
4. Que la contraseña sea la de aplicación (no la normal)

## 🌐 Deployment (Producción)

### Backend (Railway/Render/Fly.io)

1. Sube el backend a GitHub
2. Conecta con Railway/Render
3. Configura variables de entorno:
   ```
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASSWORD=tu-contraseña
   FRONTEND_URL=https://tu-frontend.vercel.app
   PORT=3001
   ```
4. Deploy

### Frontend (Vercel)

1. Sube el frontend a GitHub
2. Conecta con Vercel
3. Agrega variable de entorno:
   ```
   NEXT_PUBLIC_API_URL=https://tu-backend.railway.app
   ```
4. Deploy

## 📝 Ejemplo Completo

### 1. Configurar Backend

```bash
# portfolio-backend/.env
PORT=3001
FRONTEND_URL=http://localhost:3000
EMAIL_USER=tuemail@gmail.com
EMAIL_PASSWORD=abcd-efgh-ijkl-mnop
```

### 2. Configurar Frontend

```bash
# portfolio-nextjs/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Ejecutar Ambos

Terminal 1 (Backend):
```bash
cd portfolio-backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd portfolio-nextjs
npm run dev
```

### 4. Probar

Abre `http://localhost:3000` y usa el formulario de contacto.

## 🔒 Seguridad

### Rate Limiting

El backend limita a **5 emails por hora** por IP para prevenir spam.

### Validación

El backend valida:
- Nombre: mínimo 2 caracteres, máximo 100
- Email: formato válido
- Mensaje: mínimo 10 caracteres, máximo 5000

### CORS

Solo permite solicitudes desde `FRONTEND_URL` configurado en `.env`

## 💡 Tips

### Desarrollo Local

Usa 2 terminales:
- Terminal 1: Backend en puerto 3001
- Terminal 2: Frontend en puerto 3000

### Producción

- Backend en Railway/Render (gratuito)
- Frontend en Vercel (gratuito)
- Actualiza las URLs en las variables de entorno

### Gmail Alternativo

Si no quieres usar Gmail, puedes usar:
- SendGrid (plan gratuito: 100 emails/día)
- Mailgun (plan gratuito: 5000 emails/mes)
- Resend (plan gratuito: 3000 emails/mes)

## ✅ Checklist

Antes de pasar a producción:

- [ ] Backend funciona localmente
- [ ] Frontend funciona localmente
- [ ] Email de prueba recibido correctamente
- [ ] Variables de entorno configuradas
- [ ] Rate limiting funciona (intenta enviar 6 emails)
- [ ] Validación funciona (intenta enviar formulario vacío)
- [ ] Backend deployado
- [ ] Frontend deployado
- [ ] URLs de producción actualizadas

---

**¡Todo listo para recibir mensajes de contacto!** 🎉
