// src/models/Entity.js
import mongoose from 'mongoose';

const EntitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: null
  },
  contact: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: ''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Entity || mongoose.model('Entity', EntitySchema);
