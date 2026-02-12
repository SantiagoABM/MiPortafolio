# 📧 Portfolio Backend - API de Contacto

Backend simple con **Fastify** y **Nodemailer** para el formulario de contacto de tu portfolio.

## 🚀 Características

- ✅ **Fastify** - Framework rápido y eficiente
- ✅ **Nodemailer** - Envío de emails con Gmail
- ✅ **Rate Limiting** - Protección contra spam (5 emails/hora por IP)
- ✅ **CORS** - Configurado para tu frontend
- ✅ **Validación** - Validación de datos del formulario
- ✅ **Logging** - Logs bonitos con Pino
- ✅ **Hot Reload** - Recarga automática en desarrollo

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Editar .env con tus credenciales
nano .env
```

## ⚙️ Configuración de Gmail

**IMPORTANTE**: Antes de usar, debes configurar Gmail.

👉 **Lee la guía completa**: [GMAIL_SETUP.md](./GMAIL_SETUP.md)

Resumen rápido:
1. Activa verificación en 2 pasos en tu Gmail
2. Crea una "contraseña de aplicación"
3. Agrega las credenciales en `.env`

## 🏃 Ejecutar

### Modo Desarrollo (con hot reload)
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

El servidor se iniciará en: `http://localhost:3001`

## 📡 API Endpoints

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-02-11T15:30:00.000Z"
}
```

### Enviar Email de Contacto
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "message": "Hola, me interesa trabajar contigo..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "¡Mensaje enviado correctamente! Te contactaré pronto."
}
```

**Error Response (400):**
```json
{
  "error": "Datos inválidos",
  "details": [
    "El nombre es requerido",
    "El email no es válido"
  ]
}
```

**Rate Limit Response (429):**
```json
{
  "statusCode": 429,
  "error": "Too Many Requests",
  "message": "Has excedido el límite de 5 emails por hora. Intenta más tarde."
}
```

## 🧪 Probar con Postman/Thunder Client

1. Método: `POST`
2. URL: `http://localhost:3001/api/contact`
3. Headers: `Content-Type: application/json`
4. Body (JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "message": "Este es un mensaje de prueba"
}
```

## 🔌 Integrar con el Frontend

Actualiza tu componente `Contact.tsx`:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('¡Mensaje enviado correctamente!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert(data.message || 'Error al enviar el mensaje');
    }
  } catch (error) {
    alert('Error de conexión. Intenta más tarde.');
  } finally {
    setLoading(false);
  }
};
```

## 📂 Estructura del Proyecto

```
portfolio-backend/
├── src/
│   ├── server.js              # Servidor principal de Fastify
│   ├── services/
│   │   └── email.js           # Lógica de envío de emails
│   └── utils/
│       └── validators.js      # Validaciones del formulario
├── .env.example               # Ejemplo de variables de entorno
├── .gitignore                 # Archivos a ignorar en Git
├── package.json               # Dependencias y scripts
├── GMAIL_SETUP.md            # Guía de configuración de Gmail
└── README.md                  # Este archivo
```

## 🔒 Seguridad

### Rate Limiting
- **Límite**: 5 emails por hora por dirección IP
- **Ventana**: 1 hora
- **Protege contra**: Spam y abuso

### CORS
- Solo permite solicitudes desde `FRONTEND_URL` (configurable en `.env`)
- En producción, cambia `FRONTEND_URL` a tu dominio real

### Validación
- Valida nombre, email y mensaje
- Previene campos vacíos
- Límites de caracteres

## 🌐 Deployment

### Railway
```bash
# 1. Instala Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Inicializa proyecto
railway init

# 4. Configura variables de entorno en Railway Dashboard
railway variables set EMAIL_USER=tu-email@gmail.com
railway variables set EMAIL_PASSWORD=tu-contraseña
railway variables set FRONTEND_URL=https://tu-frontend.com

# 5. Deploy
railway up
```

### Vercel (Serverless)
No recomendado para este caso - mejor usar Railway, Render, o Fly.io

### Render
1. Crea una cuenta en [Render](https://render.com)
2. Conecta tu repositorio
3. Configura las variables de entorno
4. Deploy automático

### Variables de Entorno en Producción

Configura estas variables en tu servicio de hosting:
```
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-contraseña-de-aplicacion
FRONTEND_URL=https://tu-frontend.vercel.app
PORT=3001
```

## 📊 Logs

El servidor usa Pino para logs bonitos:

```bash
[15:30:45] INFO: Server listening at http://0.0.0.0:3001
[15:31:12] INFO: POST /api/contact
[15:31:13] INFO: ✅ Email enviado: <message-id>
```

## 🐛 Troubleshooting

### Error: "Invalid login"
- Verifica que tengas verificación en 2 pasos activada
- Usa una contraseña de aplicación, NO tu contraseña normal
- Lee [GMAIL_SETUP.md](./GMAIL_SETUP.md)

### Error: "CORS"
- Verifica que `FRONTEND_URL` en `.env` coincida con tu frontend
- En desarrollo: `http://localhost:3000`
- En producción: `https://tu-dominio.com`

### No recibo emails
- Revisa la carpeta de SPAM
- Verifica los logs del servidor
- Prueba con Postman primero

## 📝 Notas

- **Gmail gratuito**: Límite de ~500 emails/día
- **Para producción**: Considera usar SendGrid, Mailgun, o AWS SES
- **Alternativa**: Usa un servicio como Formspree o EmailJS

## 🤝 Contribuciones

Si encuentras algún bug o mejora, ¡siéntete libre de contribuir!

## 📄 Licencia

MIT

---

**¡Hecho con ❤️ usando Fastify y Nodemailer!**
