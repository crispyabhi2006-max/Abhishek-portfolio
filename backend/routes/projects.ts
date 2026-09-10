import { Router, Request, Response } from 'express';
import { Project } from '../models/Project.ts';
import { initialProjects, ProjectItem } from '../seedData.ts';
import { getDbStatus } from '../db.ts';

const router = Router();

// In-memory fallback storage when MongoDB is not connected
let memoryProjects: ProjectItem[] = [...initialProjects];

// GET /api/projects - Retrieve all projects
router.get('/', async (req: Request, res: Response) => {
  const dbStatus = getDbStatus();

  if (dbStatus.connected) {
    try {
      const projects = await Project.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        source: 'mongodb',
        count: projects.length,
        data: projects,
      });
    } catch (error: any) {
      console.error('[API] Error fetching projects from MongoDB:', error);
      // Fallback to memory if query fails
      return res.status(200).json({
        success: true,
        source: 'fallback (db error)',
        count: memoryProjects.length,
        data: memoryProjects,
      });
    }
  }

  // Graceful fallback response
  return res.status(200).json({
    success: true,
    source: 'fallback',
    message: 'Displaying development portfolio projects (MongoDB not connected).',
    count: memoryProjects.length,
    data: memoryProjects,
  });
});

// POST /api/projects - Add a new project
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, technologies, github, liveDemo } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Project title is required.',
      });
    }

    if (!description || typeof description !== 'string' || !description.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Project description is required.',
      });
    }

    const techArray = Array.isArray(technologies)
      ? technologies.map((t) => String(t).trim()).filter(Boolean)
      : typeof technologies === 'string'
      ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const newProject = new Project({
        title: title.trim(),
        description: description.trim(),
        technologies: techArray,
        github: github ? String(github).trim() : '',
        liveDemo: liveDemo ? String(liveDemo).trim() : '',
      });

      const saved = await newProject.save();
      return res.status(201).json({
        success: true,
        source: 'mongodb',
        message: 'Project created successfully in MongoDB.',
        data: saved,
      });
    }

    // In-memory fallback create
    const fallbackItem: ProjectItem = {
      _id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: title.trim(),
      description: description.trim(),
      technologies: techArray,
      github: github ? String(github).trim() : '',
      liveDemo: liveDemo ? String(liveDemo).trim() : '',
      createdAt: new Date().toISOString(),
    };

    memoryProjects.unshift(fallbackItem);

    return res.status(201).json({
      success: true,
      source: 'fallback',
      message: 'Project saved to temporary memory store (Configure MONGO_URI for persistent database storage).',
      data: fallbackItem,
    });
  } catch (error: any) {
    console.error('[API] Error creating project:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error while saving project.',
    });
  }
});

// DELETE /api/projects/:id - Delete project by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const deleted = await Project.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Project not found.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Project deleted successfully from MongoDB.',
        id,
      });
    }

    const index = memoryProjects.findIndex((p) => p._id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Project not found in memory store.',
      });
    }

    memoryProjects.splice(index, 1);
    return res.status(200).json({
      success: true,
      message: 'Project deleted from memory store.',
      id,
    });
  } catch (error: any) {
    console.error('[API] Error deleting project:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error while deleting project.',
    });
  }
});

export default router;
