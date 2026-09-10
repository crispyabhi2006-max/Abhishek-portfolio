import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Message: mongoose.Model<IMessage> =
  (mongoose.models.Message as mongoose.Model<IMessage>) ||
  mongoose.model<IMessage>('Message', MessageSchema);

