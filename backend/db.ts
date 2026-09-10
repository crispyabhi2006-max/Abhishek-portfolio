import mongoose from 'mongoose';
import { Project } from './models/Project.ts';
import { initialProjects } from './seedData.ts';

let isConnected = false;
let connectionError: string | null = null;

export async function connectDB(): Promise<boolean> {
  const uri = process.env.MONGO_URI;

  if (!uri || uri.trim() === '' || uri.includes('YOUR_MONGODB_CONNECTION_STRING')) {
    console.log('[Database] No MONGO_URI provided. Running in development fallback mode.');
    isConnected = false;
    connectionError = 'MONGO_URI not configured in environment variables';
    return false;
  }

  try {
    console.log('[Database] Connecting to MongoDB...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    connectionError = null;
    console.log('[Database] Successfully connected to MongoDB.');

    // Auto-seed projects if database collection is empty
    const count = await Project.countDocuments();
    if (count === 0) {
      console.log('[Database] Seeding initial portfolio projects to MongoDB...');
      const seedDocs = initialProjects.map(({ _id, ...rest }) => rest);
      await Project.insertMany(seedDocs as any);
      console.log(`[Database] Seeded ${seedDocs.length} projects successfully.`);
    }

    return true;
  } catch (err: any) {
    isConnected = false;
    connectionError = err.message || 'Failed to connect to MongoDB';
    console.warn(`[Database] MongoDB connection error: ${connectionError}. Operating in in-memory fallback mode.`);
    return false;
  }
}

export function getDbStatus() {
  return {
    connected: isConnected,
    mode: isConnected ? 'mongodb' : 'fallback',
    error: connectionError,
    uriConfigured: Boolean(process.env.MONGO_URI && !process.env.MONGO_URI.includes('YOUR_MONGODB')),
  };
}
