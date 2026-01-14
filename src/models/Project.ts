import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  category: string;
  image: string;
  year: string;
  description: string;
  client?: string;
  software?: string[];
  longDescription?: string;
  additionalImages?: string[];
  process?: string;
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: String, trim: true },
    software: { type: [String], default: [] },
    longDescription: { type: String },
    additionalImages: { type: [String], default: [] },
    process: { type: String },
    videoUrl: { type: String }
  },
  { timestamps: true }
);

export const ProjectModel = model<IProject>('Project', projectSchema);
