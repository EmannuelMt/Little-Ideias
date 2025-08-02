const Idea = require('../models/idea.model');
const { exportToCSV } = require('../utils/exportUtils');

exports.getCategoryReport = async (req, res, next) => {
  try {
    const report = await Idea.aggregate([
      { $match: { createdBy: req.user._id } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};

exports.exportIdeasCSV = async (req, res, next) => {
  try {
    const ideas = await Idea.find({ createdBy: req.user._id });
    const csvUrl = exportToCSV(ideas);
    
    res.json({ success: true, data: csvUrl });
  } catch (error) {
    next(error);
  }
};