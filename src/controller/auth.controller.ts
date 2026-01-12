import { FastifyReply, FastifyRequest } from 'fastify';
import * as AuthService from '../services/auth.services';

interface AuthBody {
  email: string,
  password: string
}

export const register = async (req: FastifyRequest<{ Body: AuthBody }>, reply: FastifyReply) => {
  try {
    const { email, password } = req.body as any;
    const user = await AuthService.registerAdmin(email, password);
    reply.send({ id: user.id, email: user.email });
  } catch (err: any) {
    reply.status(400).send({ error: err.message });
  }
};

export const login = async (req: FastifyRequest<{ Body: AuthBody}>, reply: FastifyReply) => {
  try {
    const { email, password } = req.body as any;
    const result = await AuthService.loginAdmin(email, password);
    reply.send(result);
  } catch (err: any) {
    reply.status(400).send({ error: err.message });
  }
};
