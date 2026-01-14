import { FastifyInstance } from 'fastify';
import {
  createProjectHandler,
  getAllProjectsHandler,
  getProjectByIdHandler,
  updateProjectHandler,
  deleteProjectHandler
} from '../controller/project.controller';
import { verifyJWT } from '../middlewares/auth.middleware';

async function projectRoutes(fastify: FastifyInstance) {
  // POST - Create a new project (protected)
  fastify.post(
    '/',
    { preHandler: [verifyJWT] },
    createProjectHandler
  );

  // GET - List all projects (public)
  fastify.get('/', getAllProjectsHandler);

  // GET - Get specific project by ID (public)
  fastify.get('/:id', getProjectByIdHandler);

  // PUT - Update a project (protected)
  fastify.put(
    '/:id',
    { preHandler: [verifyJWT] },
    updateProjectHandler
  );

  // DELETE - Delete a project (protected)
  fastify.delete(
    '/:id',
    { preHandler: [verifyJWT] },
    deleteProjectHandler
  );
}

export default projectRoutes;
