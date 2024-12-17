import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome da categoria é obrigatório'],
    unique: true,
    trim: true,
    minlength: [2, 'O nome da categoria deve ter pelo menos 2 caracteres'],
    maxlength: [20, 'O nome da categoria deve ter no máximo 20 caracteres'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'A descrição deve ter no máximo 200 caracteres'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Índice para facilitar busca por nome
// CategorySchema.index({ name: 1 });

const Category = mongoose.model('Category', CategorySchema);

export default Category;