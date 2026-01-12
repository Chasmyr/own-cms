// src/app.ts
import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyJwt from 'fastify-jwt';
import authRoutes from './routes/auth.routes';

const app = fastify({ logger: true });

app.register(cors, { origin: '*' });
app.register(fastifyJwt, { secret: process.env.JWT_SECRET! });
app.register(authRoutes, { prefix: '/auth' });

app.get('/ping', async () => {
  return { message: 'pong', time: new Date().toISOString() };
});

export default app;
