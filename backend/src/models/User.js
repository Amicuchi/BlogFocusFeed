import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'O nome de usuário é obrigatório'],
    unique: true,
    trim: true,
    minlength: [3, 'O nome de usuário deve ter pelo menos 3 caracteres'],
    maxlength: [30, 'O nome de usuário deve ter no máximo 30 caracteres'],
  },
  fullName: {
    type: String,
    required: [true, 'O nome completo é obrigatório'],
    trim: true,
    minlength: [2, 'O nome completo deve ter pelo menos 2 caracteres'],
    maxlength: [50, 'O nome completo deve ter no máximo 50 caracteres'],
  },
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória'],
    minlength: [8, 'A senha deve ter pelo menos 8 caracteres'],
  },
  profilePicture: {
    type: String,
    // default: 'default-avatar.png',
  },
  bio: {
    type: String,
    maxlength: [500, 'A biografia deve ter no máximo 500 caracteres'],
  },
  location: {
    type: String,
    maxlength: [100, 'A localização deve ter no máximo 100 caracteres'],
  },
  socialLinks: {
    instagram: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    github: { type: String },
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  passwordResetToken: String,
  passwordResetExpires: Date,
}, {
  timestamps: true,
});

// Índices para consultas frequentes
UserSchema.index({ username: 1, email: 1 });

// Garante que o modelo seja registrado apenas uma vez
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;