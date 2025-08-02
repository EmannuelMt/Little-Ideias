const express = require('express');
const router = express.Router();
const ideasController = require('../controllers/ideas.controller');
const { authenticate } = require('../middlewares/auth');

router.use(authenticate);

router.get('/', ideasController.getAllIdeas);
router.post('/', ideasController.createIdea);
router.get('/:id', ideasController.getIdeaById);
router.put('/:id', ideasController.updateIdea);
router.delete('/:id', ideasController.deleteIdea);
router.patch('/:id/favorite', ideasController.toggleFavorite);
router.get('/:id/export/pdf', ideasController.exportToPDF);

module.exports = router;