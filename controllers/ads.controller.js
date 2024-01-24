const Ad = require('../models/ads.model');


exports.getAll = async(req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};