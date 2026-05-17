import Fastify from 'fastify';
import cors from '@fastify/cors';
import workflowRoutes from './routes/action';

const fastify = Fastify({ logger: true });

// 1. CORS: Fastify uses a separate official plugin
fastify.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true,
});

// 2. Health Check
fastify.get('/api/health', async (request, reply) => {
  return { status: 'Fastify Backend is running smoothly!' };
});

// 3. Mount Routes (Fastify uses prefixes for grouping)
fastify.register(workflowRoutes, { prefix: '/api/workflow' });

const start = async () => {
  try {
    await fastify.listen({ port: 4000 });
    console.log(`🚀 Fastify Server running on http://localhost:4000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();