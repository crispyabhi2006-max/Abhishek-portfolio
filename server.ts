import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { connectDB, getDbStatus } from './backend/db.ts';
import projectsRouter from './backend/routes/projects.ts';
import messagesRouter from './backend/routes/messages.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Connect to Database (graceful non-blocking fallback if no URI provided)
  await connectDB();

  // Static assets folder for frontend/assets (profile photo, resume)
  const publicDir = path.resolve(process.cwd(), 'public');
  const frontendAssetsDir = path.resolve(process.cwd(), 'public', 'frontend', 'assets');
  const rootFrontendAssetsDir = path.resolve(process.cwd(), 'frontend', 'assets');

  if (!fs.existsSync(frontendAssetsDir)) {
    fs.mkdirSync(frontendAssetsDir, { recursive: true });
  }
  if (!fs.existsSync(rootFrontendAssetsDir)) {
    fs.mkdirSync(rootFrontendAssetsDir, { recursive: true });
  }

  // Allow serving assets via /frontend/assets/* as well as root /assets/*
  app.use('/frontend/assets', express.static(frontendAssetsDir));
  app.use('/frontend/assets', express.static(rootFrontendAssetsDir));
  app.use('/assets', express.static(frontendAssetsDir));
  app.use('/assets', express.static(rootFrontendAssetsDir));

  // Health / Status Check Endpoint
  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'healthy',
      developer: 'Abhishek S',
      institution: 'Easwari Engineering College',
      server: 'Express.js on Node.js',
      database: getDbStatus(),
      timestamp: new Date().toISOString(),
    });
  });

  // API Routes
  app.use('/api/projects', projectsRouter);
  app.use('/api/messages', messagesRouter);

  // Profile Photo Upload Endpoint
  app.post('/api/upload-photo', (req, res) => {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ success: false, error: 'No image data provided' });
      }
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      const targetPaths = [
        path.resolve(process.cwd(), 'frontend', 'assets', 'profile.jpg'),
        path.resolve(process.cwd(), 'public', 'frontend', 'assets', 'profile.jpg'),
        path.resolve(process.cwd(), 'public', 'assets', 'profile.jpg'),
      ];

      for (const targetPath of targetPaths) {
        const dir = path.dirname(targetPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(targetPath, buffer);
      }

      return res.status(200).json({
        success: true,
        message: 'Profile photo updated successfully',
        url: '/frontend/assets/profile.jpg',
      });
    } catch (err: any) {
      console.error('[Upload Photo Error]', err);
      return res.status(500).json({ success: false, error: 'Failed to save photo' });
    }
  });

  // Dedicated Resume Download Endpoints
  const serveResume = (req: express.Request, res: express.Response) => {
    const resumePath = path.resolve(process.cwd(), 'frontend', 'assets', 'Abhishek_S_Resume.pdf');
    const fallbackPath = path.resolve(process.cwd(), 'public', 'frontend', 'assets', 'Abhishek_S_Resume.pdf');
    const finalPath = fs.existsSync(resumePath) ? resumePath : fallbackPath;

    if (fs.existsSync(finalPath)) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Abhishek_S_Resume.pdf"');
      return res.sendFile(finalPath);
    } else {
      return res.status(404).json({ error: 'Resume PDF not found' });
    }
  };

  app.get('/api/resume/download', serveResume);
  app.get('/api/resume', serveResume);
  app.get('/frontend/assets/Abhishek_S_Resume.pdf', serveResume);
  app.get('/Abhishek_S_Resume.pdf', serveResume);

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Error handling middleware
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('[Server Error]', err);
    res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred.',
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Portfolio backend & frontend running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server Failed to Start]', err);
});
