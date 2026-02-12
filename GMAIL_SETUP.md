# 📧 Guía Completa: Configurar Gmail para Nodemailer

## 🎯 Requisitos

Para que Nodemailer funcione con Gmail, necesitas:

1. ✅ Una cuenta de Gmail
2. ✅ Verificación en 2 pasos activada
3. ✅ Crear una "contraseña de aplicación"

## 📝 Paso a Paso

### Paso 1: Activar Verificación en 2 Pasos

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. Click en **"Seguridad"** en el menú lateral
3. En la sección "Cómo inicias sesión en Google", busca **"Verificación en 2 pasos"**
4. Click en **"Verificación en 2 pasos"**
5. Click en **"Comenzar"** y sigue los pasos
6. Configura tu método preferido (SMS, app de autenticación, etc.)

### Paso 2: Crear Contraseña de Aplicación

Una vez que tienes la verificación en 2 pasos activada:

1. Ve nuevamente a: https://myaccount.google.com/security
2. Busca **"Contraseñas de aplicaciones"** (puede estar en "Verificación en 2 pasos")
3. Si no la ves, ve directamente a: https://myaccount.google.com/apppasswords
4. Selecciona:
   - **Aplicación**: "Correo"
   - **Dispositivo**: "Otro (nombre personalizado)"
   - Escribe: "Portfolio Backend" o el nombre que quieras
5. Click en **"Generar"**
6. Google te mostrará una contraseña de 16 caracteres (ej: `abcd efgh ijkl mnop`)
7. **CÓPIALA INMEDIATAMENTE** - solo se muestra una vez

### Paso 3: Configurar el Backend

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Abre el archivo `.env` y completa:
   ```env
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop
   ```
   
   **IMPORTANTE**: 
   - En `EMAIL_PASSWORD` pega la contraseña de aplicación SIN ESPACIOS
   - Ejemplo: Si Google te dio `abcd efgh ijkl mnop`, escribe `abcdefghijklmnop`

### Paso 4: Probar

Inicia el servidor y prueba enviando un email:

```bash
npm run dev
```

Luego desde Postman o tu frontend envía:

```bash
POST http://localhost:3001/api/contact
Content-Type: application/json

{
  "name": "Test",
  "email": "test@example.com",
  "message": "Este es un mensaje de prueba"
}
```

Deberías recibir un email en tu Gmail configurado.

## 🔒 Seguridad

### ✅ Buenas Prácticas

1. **NUNCA** subas el archivo `.env` a Git
2. **NUNCA** uses tu contraseña normal de Gmail
3. Usa SOLO contraseñas de aplicación
4. Mantén tu `.env` privado

### 🚫 Qué NO Hacer

```javascript
// ❌ NUNCA hagas esto
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu-email@gmail.com',  // ❌ Hardcodeado
    pass: 'tu-contraseña'         // ❌ Contraseña visible
  }
});
```

```javascript
// ✅ Siempre usa variables de entorno
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,      // ✅ Desde .env
    pass: process.env.EMAIL_PASSWORD   // ✅ Desde .env
  }
});
```

## ⚠️ Solución de Problemas

### Error: "Invalid login"

**Causa**: Contraseña incorrecta o verificación en 2 pasos no activada

**Solución**:
1. Verifica que la verificación en 2 pasos esté activada
2. Genera una nueva contraseña de aplicación
3. Cópiala SIN ESPACIOS en el `.env`

### Error: "Username and Password not accepted"

**Causa**: Estás usando tu contraseña normal en lugar de la contraseña de aplicación

**Solución**:
1. Ve a https://myaccount.google.com/apppasswords
2. Genera una nueva contraseña de aplicación
3. Úsala en el `.env`

### Error: "Connection timeout"

**Causa**: Firewall o problema de red

**Solución**:
1. Verifica tu conexión a internet
2. Desactiva temporalmente el firewall para probar
3. Verifica que el puerto 587 (SMTP) no esté bloqueado

### El email no llega

**Revisa**:
1. Carpeta de SPAM de tu Gmail
2. Los logs del servidor (`console.log`)
3. Que el email en `EMAIL_USER` sea correcto
4. Que el servidor esté corriendo

## 🌐 Alternativas a Gmail

Si prefieres usar otro servicio:

### SendGrid (Recomendado para producción)
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

### Mailgun
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASSWORD
  }
});
```

### Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

## 📊 Límites de Gmail

Gmail tiene límites de envío:

- **Cuenta gratuita**: ~500 emails por día
- **Google Workspace**: ~2000 emails por día

Para un formulario de contacto personal, esto es más que suficiente.

## ✅ Verificación Final

Antes de usar en producción, verifica:

- [ ] Verificación en 2 pasos activada
- [ ] Contraseña de aplicación creada
- [ ] `.env` configurado correctamente
- [ ] Email de prueba enviado correctamente
- [ ] `.env` está en `.gitignore`

---

**¡Listo!** Ahora tu backend puede enviar emails. 🎉
