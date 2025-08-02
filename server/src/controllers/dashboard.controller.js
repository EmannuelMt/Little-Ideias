const Idea = require('../models/idea.model');

exports.getStats = async (req, res, next) => {
  try {
    const stats = await Idea.aggregate([
      { $match: { createdBy: req.user._id } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          inProgress: { 
            $sum: { 
              $cond: [{ $eq: ["$status", "Em andamento"] }, 1, 0] 
            } 
          },
          completed: { 
            $sum: { 
              $cond: [{ $eq: ["$status", "Finalizado"] }, 1, 0] 
            } 
          },
          favorites: {
            $sum: {
              $cond: [{ $eq: ["$favorite", true] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          total: 1,
          inProgress: 1,
          completed: 1,
          favorites: 1
        }
      }
    ]);

    const byCategory = await Idea.aggregate([
      { $match: { createdBy: req.user._id } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: stats[0] || { total: 0, inProgress: 0, completed: 0, favorites: 0 },
        byCategory
      }
    });
  } catch (error) {
    next(error);
  }
};