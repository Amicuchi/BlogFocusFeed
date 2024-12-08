import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true,
    maxlength: [100, 'O título deve ter no máximo 100 caracteres'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'A descrição deve ter no máximo 200 caracteres'],
  },
  content: {
    type: String,
    required: [true, 'O conteúdo é obrigatório'],
    minlength: [10, 'O conteúdo deve ter pelo menos 10 caracteres'],
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }],
  tags: [{
    type: String,
    trim: true,
  }],
  image: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Índices para consultas frequentes
PostSchema.index({ title: 'text', content: 'text' });

const Post = mongoose.model('Post', PostSchema);

export default Post;