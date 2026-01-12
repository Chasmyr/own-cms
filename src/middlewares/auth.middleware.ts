import { FastifyReply, FastifyRequest } from 'fastify';

export const verifyJWT = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new Error('Missing token');

    const token = authHeader.split(' ')[1];
    const decoded = await (req.server as any).jwt.verify(token);
    (req as any).user = decoded;
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized' });
  }
};
