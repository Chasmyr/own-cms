import { FastifyReply, FastifyRequest } from 'fastify';
import { ProjectModel } from '../models/Project';

/**
 * POST /projects - Create a new project
 */
export async function createProjectHandler(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { title, category, image, year, description, client, software, longDescription, additionalImages, process, videoUrl } = req.body as any;

    // Validate required fields
    if (!title || !category || !image || !year || !description) {
      return reply.code(400).send({
        error: 'Missing required fields',
        required: ['title', 'category', 'image', 'year', 'description']
      });
    }

    const project = await ProjectModel.create({
      title: String(title).trim(),
      category: String(category).trim(),
      image: String(image).trim(),
      year: String(year).trim(),
      description: String(description).trim(),
      client: client ? String(client).trim() : undefined,
      software: software ? (Array.isArray(software) ? software : [software]) : [],
      longDescription: longDescription ? String(longDescription).trim() : undefined,
      additionalImages: additionalImages ? (Array.isArray(additionalImages) ? additionalImages : [additionalImages]) : [],
      process: process ? String(process).trim() : undefined,
      videoUrl: videoUrl ? String(videoUrl).trim() : undefined
    });

    console.log('✅ Project created:', { id: project._id, title: project.title });

    return reply.status(201).send({
      success: true,
      project: {
        id: project._id,
        title: project.title,
        category: project.category,
        year: project.year,
        createdAt: project.createdAt
      }
    });
  } catch (err) {
    console.error('❌ Error creating project:', err);
    return reply.status(500).send({
      error: 'Failed to create project',
      message: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}

/**
 * GET /projects - Get all projects
 */
export async function getAllProjectsHandler(req: FastifyRequest, reply: FastifyReply) {
  try {
    const projects = await ProjectModel.find().lean();

    console.log(`✅ Retrieved ${projects.length} projects`);

    return reply.send({
      success: true,
      count: projects.length,
      projects: projects.map(project => ({
        id: project._id,
        title: project.title,
        category: project.category,
        image: project.image,
        year: project.year,
        description: project.description,
        client: project.client,
        software: project.software,
        longDescription: project.longDescription,
        additionalImages: project.additionalImages,
        process: project.process,
        videoUrl: project.videoUrl,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      }))
    });
  } catch (err) {
    console.error('❌ Error fetching projects:', err);
    return reply.status(500).send({
      error: 'Failed to fetch projects',
      message: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}

/**
 * GET /projects/:id - Get specific project by ID
 */
export async function getProjectByIdHandler(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = req.params as { id: string };

    const project = await ProjectModel.findById(id).lean();

    if (!project) {
      return reply.status(404).send({
        error: 'Project not found',
        id
      });
    }

    console.log(`✅ Retrieved project: ${project.title}`);

    return reply.send({
      success: true,
      project: {
        id: project._id,
        title: project.title,
        category: project.category,
        image: project.image,
        year: project.year,
        description: project.description,
        client: project.client,
        software: project.software,
        longDescription: project.longDescription,
        additionalImages: project.additionalImages,
        process: project.process,
        videoUrl: project.videoUrl,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      }
    });
  } catch (err) {
    console.error('❌ Error fetching project:', err);
    return reply.status(500).send({
      error: 'Failed to fetch project',
      message: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}

/**
 * PUT /projects/:id - Update a project
 */
export async function updateProjectHandler(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = req.params as { id: string };
    const updateData = req.body as any;

    // Validate that at least one field is provided
    if (!updateData || Object.keys(updateData).length === 0) {
      return reply.code(400).send({
        error: 'No data provided for update'
      });
    }

    const project = await ProjectModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return reply.status(404).send({
        error: 'Project not found',
        id
      });
    }

    console.log('✅ Project updated:', { id: project._id, title: project.title });

    return reply.send({
      success: true,
      project: {
        id: project._id,
        title: project.title,
        category: project.category,
        image: project.image,
        year: project.year,
        description: project.description,
        client: project.client,
        software: project.software,
        longDescription: project.longDescription,
        additionalImages: project.additionalImages,
        process: project.process,
        videoUrl: project.videoUrl,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      }
    });
  } catch (err) {
    console.error('❌ Error updating project:', err);
    return reply.status(500).send({
      error: 'Failed to update project',
      message: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}

/**
 * DELETE /projects/:id - Delete a project
 */
export async function deleteProjectHandler(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = req.params as { id: string };

    const project = await ProjectModel.findByIdAndDelete(id);

    if (!project) {
      return reply.status(404).send({
        error: 'Project not found',
        id
      });
    }

    console.log('✅ Project deleted:', { id: project._id, title: project.title });

    return reply.send({
      success: true,
      message: `Project "${project.title}" has been deleted`
    });
  } catch (err) {
    console.error('❌ Error deleting project:', err);
    return reply.status(500).send({
      error: 'Failed to delete project',
      message: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}
