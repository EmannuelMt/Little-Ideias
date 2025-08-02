const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome da ideia é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode exceder 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'A descrição é obrigatória'],
    maxlength: [1000, 'Descrição não pode exceder 1000 caracteres']
  },
  category: {
    type: String,
    required: true,
    enum: ['SaaS', 'Blog', 'Portfólio', 'E-commerce', 'Aplicativo', 'Outro']
  },
  technologies: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['Ideia', 'Em andamento', 'Finalizado'],
    default: 'Ideia'
  },
  priority: {
    type: String,
    enum: ['Baixa', 'Média', 'Alta'],
    default: 'Média'
  },
  inspirations: [{
    type: String,
    validate: {
      validator: v => /https?:\/\/.+/i.test(v),
      message: props => `${props.value} não é um URL válido!`
    }
  }],
  notes: String,
  attachments: [{
    type: {
      type: String,
      enum: ['image', 'link', 'file']
    },
    data: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  favorite: {
    type: Boolean,
    default: false
  },
  deadline: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Idea', IdeaSchema);