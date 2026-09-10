import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  liveDemo?: string;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    technologies: { type: [String], default: [] },
    github: { type: String, trim: true, default: '' },
    liveDemo: { type: String, trim: true, default: '' },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Project: mongoose.Model<IProject> =
  (mongoose.models.Project as mongoose.Model<IProject>) ||
  mongoose.model<IProject>('Project', ProjectSchema);

