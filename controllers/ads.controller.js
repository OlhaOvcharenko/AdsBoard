const Ad = require('../models/ad.model');
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType');
const User = require('../models/user.model');

exports.getAll = async(req, res) => {
  try {
    const ads = await Ad.find().populate('author');
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async(req, res) => {
  try {
    const adById = await Ad.findById(req.params.id).populate('author');

    if(!adById) { 
      res.status(404).json({message: 'Not found..'});
    } else {
      res.json(adById);
    }

  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getBySearchPhrase = async(req, res) => { 
  try {
    const searchPhrase = req.params.searchPhrase;
    const sanitizedSearchPhrase = searchPhrase.replace(/\+/g, ' ');
    const adsByPhrase = await Ad.find({
      title: { $regex: new RegExp(sanitizedSearchPhrase, 'i'),
      }
    });

    if (adsByPhrase.length === 0) {
      res.status(404).json({ message: 'Not found..' });
    } else {
      res.json(adsByPhrase);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}


exports.postNewAd = async (req, res) => {
  try {
    const { title, description, date, price, location, author } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    if (
      title && typeof title === 'string' &&
      description && typeof description === 'string' &&
      location && typeof location === 'string' &&
      author && typeof author === 'string' &&
      date && /^\d{4}-\d{2}-\d{2}$/.test(date) &&
      price && !isNaN(price) &&
      req.file && ['image/jpg', 'image/jpeg', 'image/gif'].includes(fileType)
     ) {
      const newAd = new Ad({
        title,
        description,
        date,
        price: Number(price),
        location,
        photo: req.file.filename,
        author: req.session.user.id,    
      });

      await newAd.save();
      res.json({ message: 'Post has been created!' });

    } else {
      const path = req.file ? req.file.path : null;
      if (path) {
        fs.unlinkSync(path);
      }
      res.status(400).json({ message: 'Bad Request' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
};

exports.editAd = async(req, res) => {

  const { title, description, date, photo, price, location, author } = req.body;
  try {
    const ad = await Ad.findById(req.params.id);

    if (ad) {
      ad.title = title;
      ad.description = description;
      ad.date = date;
      ad.photo = photo;
      ad.price = price;
      ad.location = location;
      ad.author = author;

      await ad.save(); // Use await with save()

      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteAd = async(req, res) => {
  try{
    const ad = await Ad.findById(req.params.id)
    if(ad){
    await Ad.deleteOne({ _id: req.params.id })
    res.json({message:"OK"})
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


//apply fs.ulinkSynk to other methods
//data validation
//edition of post
// dostep do obrazkuw 
//tests??
//JohnDoe, tester345