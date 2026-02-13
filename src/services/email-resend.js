import { Resend } from 'resend';

const resend = new Resend("re_detru7i7_K2YRPQSkfwM5Hnwa4wxm31Zj");

/**
 * Envía un email de contacto usando Resend
 */
export async function sendEmail({ fromName, fromEmail, message }) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Portafolio de Santiago <onboarding@resend.dev>', // Email verificado de Resend
            to: "barbozamujica109@gmail.com", // Tu email donde recibirás los mensajes
            replyTo: fromEmail, // Email del usuario para responder
            subject: `💼 Nuevo mensaje de contacto de ${fromName}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 8px;
            }
            .header {
              background-color: #0969ff;
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
            }
            .field-label {
              font-weight: bold;
              color: #0969ff;
              margin-bottom: 5px;
            }
            .field-value {
              padding: 10px;
              background-color: #f5f5f5;
              border-radius: 4px;
              border-left: 3px solid #0969ff;
            }
            .message-box {
              background-color: #f9f9f9;
              padding: 15px;
              border-radius: 4px;
              margin-top: 10px;
              white-space: pre-wrap;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Nuevo Mensaje de Contacto</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">👤 Nombre:</div>
                <div class="field-value">${fromName}</div>
              </div>
              
              <div class="field">
                <div class="field-label">📧 Email:</div>
                <div class="field-value">
                  <a href="mailto:${fromEmail}">${fromEmail}</a>
                </div>
              </div>
              
              <div class="field">
                <div class="field-label">💬 Mensaje:</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>Este mensaje fue enviado desde tu formulario de contacto del portfolio.</p>
              <p>Puedes responder directamente a este email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
        });

        if (error) {
            console.error('❌ Error de Resend:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Email enviado con Resend:', data.id);
        return { success: true, messageId: data.id };
    } catch (error) {
        console.error('❌ Error al enviar email:', error);
        return { success: false, error: error.message };
    }
}
export async function sendConfirmationEmail(toEmail, userName) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Portafolio de Santiago <onboarding@resend.dev>',
            to: toEmail,
            subject: '✅ Mensaje recibido - Portafolio de Santiago',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #0969ff;
              color: white;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
            }
            .content {
              padding: 30px;
              background-color: #f9f9f9;
              border-radius: 8px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ ¡Mensaje Recibido!</h1>
            </div>
            <div class="content">
              <p>Hola ${userName},</p>
              <p>He recibido tu mensaje y te contactaré pronto.</p>
              <p>¡Gracias por ponerte en contacto!</p>
              <br>
              <p>Saludos,<br>Santiago Alexandre Barboza Mujica</p>
            </div>
          </div>
        </body>
        </html>
      `,
        });

        if (error) {
            console.error('❌ Error de Resend al enviar confirmación:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Email de confirmación enviado con Resend:', data.id);
        return { success: true, messageId: data.id };
    } catch (error) {
        console.error('❌ Error al enviar confirmación:', error);
        return { success: false, error: error.message };
    }
}