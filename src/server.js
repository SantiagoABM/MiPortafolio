import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import dotenv from 'dotenv';
import { sendEmail } from './services/email-resend.js';
import { validateContactForm } from './utils/validators.js';
dotenv.config()
const fastify = Fastify({
  logger: true
});

// CORS - Permite solicitudes desde tu frontend
await fastify.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
});

// Rate Limiting - Previene spam (máximo 5 emails por hora por IP)
await fastify.register(rateLimit, {
  max: 5,
  timeWindow: '1 hour',
  errorResponseBuilder: (req, context) => {
    return {
      statusCode: 429,
      error: 'Too Many Requests',
      message: `Has excedido el límite de ${context.max} emails por hora. Intenta más tarde.`,
    };
  },
});

// ========================================
// RUTAS
// ========================================

// Health Check
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Enviar Email de Contacto
fastify.post('/api/contact', async (request, reply) => {
  try {
    const { name, email, message } = request.body;

    // Validar datos
    const validation = validateContactForm({ name, email, message });
    if (!validation.valid) {
      return reply.status(400).send({
        error: 'Datos inválidos',
        details: validation.errors,
      });
    }

    // Enviar email
    const result = await sendEmail({
      fromName: name,
      fromEmail: email,
      message: message,
    });

    if (result.success) {
      // await sendConfirmationEmail(email, name);
      return {
        success: true,
        mensaje: '¡Mensaje enviado correctamente! Te contactaré pronto.',
        datos: null
      };
    } else {
      return reply.status(500).send({
        success: false,
        mensaje: 'Hubo un problema al procesar tu mensaje. Intenta más tarde.',
        datos: null
      });
    }
  } catch (error) {
    fastify.log.error(error);
    return reply.status(500).send({
      success: false,
      mensaje: 'Ocurrió un error inesperado. Por favor, intenta más tarde.',
      datos: null
    });
  }
});

// Manejo de rutas no encontradas
fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    error: 'Not Found',
    message: 'La ruta solicitada no existe',
    path: request.url,
  });
});

// ========================================
// INICIAR SERVIDOR
// ========================================

const start = async () => {
  try {
    const port = process.env.PORT || 3001;
    const host = process.env.HOST || '0.0.0.0';

    await fastify.listen({ port, host });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

// Manejo de cierre graceful
const signals = ['SIGINT', 'SIGTERM'];
signals.forEach((signal) => {
  process.on(signal, async () => {
    console.log(`\n${signal} recibido, cerrando servidor...`);
    await fastify.close();
    process.exit(0);
  });
});
