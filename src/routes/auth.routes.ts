import { FastifyInstance } from 'fastify';
import * as AuthController from '../controller/auth.controller';
import { verifyJWT } from '../middlewares/auth.middleware';

async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', AuthController.register);
  fastify.post('/login', AuthController.login);

  // Exemple route protégée
  fastify.get('/me', { preHandler: verifyJWT }, async (req) => {
    return { user: (req as any).user };
  });
}

export default authRoutes;