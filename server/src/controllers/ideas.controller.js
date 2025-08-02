const Idea = require('../models/idea.model');
const { generatePDF } = require('../utils/generatePDF');

exports.getAllIdeas = async (req, res, next) => {
  try {
    const { status, category, search } = req.query;
    const filter = { createdBy: req.user.id };
    
    if (status) filter.status = status;
    if (category) filter.category = category;
    
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { technologies: searchRegex }
      ];
    }

    const ideas = await Idea.find(filter).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    next(error);
  }
};

exports.getIdeaById = async (req, res, next) => {
  try {
    const idea = await Idea.findOne({ 
      _id: req.params.id, 
      createdBy: req.user.id 
    });
    
    if (!idea) {
      return res.status(404).json({ message: 'Ideia não encontrada' });
    }
    
    res.json(idea);
  } catch (error) {
    next(error);
  }
};

exports.createIdea = async (req, res, next) => {
  try {
    const newIdea = new Idea({
      ...req.body,
      createdBy: req.user.id
    });
    
    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea);
  } catch (error) {
    next(error);
  }
};

exports.updateIdea = async (req, res, next) => {
  try {
    const updatedIdea = await Idea.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedIdea) {
      return res.status(404).json({ message: 'Ideia não encontrada' });
    }
    
    res.json(updatedIdea);
  } catch (error) {
    next(error);
  }
};

exports.deleteIdea = async (req, res, next) => {
  try {
    const deletedIdea = await Idea.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });
    
    if (!deletedIdea) {
      return res.status(404).json({ message: 'Ideia não encontrada' });
    }
    
    res.json({ message: 'Ideia removida com sucesso' });
  } catch (error) {
    next(error);
  }
};

exports.toggleFavorite = async (req, res, next) => {
  try {
    const idea = await Idea.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });
    
    if (!idea) {
      return res.status(404).json({ message: 'Ideia não encontrada' });
    }
    
    idea.favorite = !idea.favorite;
    await idea.save();
    
    res.json(idea);
  } catch (error) {
    next(error);
  }
};

exports.exportToPDF = async (req, res, next) => {
  try {
    const idea = await Idea.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });
    
    if (!idea) {
      return res.status(404).json({ message: 'Ideia não encontrada' });
    }
    
    const pdfBuffer = await generatePDF(idea);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=ideia-${idea.name}.pdf`
    });
    
    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};
// Criar índices
IdeaSchema.index({ name: 'text', description: 'text' });
IdeaSchema.index({ createdBy: 1, status: 1 });
IdeaSchema.index({ createdBy: 1, favorite: 1 });