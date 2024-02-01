const Ad = require('../models/ad.model');
const fs = require('fs');
const path =require('path');
const getImageFileType = require('../utils/getImageFileType');
const sanitizeHtml = require('sanitize-html');
const schemaValidation = require('../utils/schemaValidation');

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

    if (!adsByPhrase.length) {
      res.status(404).json({ message: 'Not found..' });
    } else {
      res.json(adsByPhrase);
    }
  } catch (error) {
    res.status(500).json({ error: 'Bad request', message: error.message });
  }
}

exports.postNewAd = async (req, res) => {
  try {
    const { title, description, date, price, location, author } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    if (!req.file) {
      res.status(400).json({ message: 'Failed file type validation.' });
      return;
    }
   
    const cleanTitle = sanitizeHtml(title);
    const cleanDescription = sanitizeHtml(description);
    const cleanLocation = sanitizeHtml(location);
    const cleanDate = sanitizeHtml(date);
    const cleanAuthor = sanitizeHtml(author);

    const validatedData = await schemaValidation.validateAsync({cleanTitle, cleanDescription, 
      cleanLocation, cleanAuthor, cleanDate, price, fileType});
    
    if(validatedData) {
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
      fs.unlinkSync(path);
      res.status(400).json({ error: 'Failed validation'});
    }
  } catch (err) {
    const path = req.file ? req.file.path : null;
    fs.unlinkSync(path);
    console.error(err);
    res.status(400).json({ error: 'Bad Request', message: err.message });
  }
};

exports.editAd = async(req, res) => {
  try {
    const { title, description, date, price, location, author } = req.body;
    const photo = req.file.filename;
		const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (!req.file) {
      res.status(400).json({ message: 'Failed file type validation.' });
      return;
    }

    const ad = await Ad.findById(req.params.id);

    if(req.session.user.id == ad.author.id){

      if (ad) {
        const prevPhotoPath = path.resolve(`public/uploads/${ad.photo}`);

        if (fs.existsSync(prevPhotoPath)) {
          fs.unlinkSync(prevPhotoPath);
        } else {
          console.error('File does not exist:', prevPhotoPath);
        }

        const cleanTitle = sanitizeHtml(title);
        const cleanDescription = sanitizeHtml(description);
        const cleanLocation = sanitizeHtml(location);
        const cleanDate = sanitizeHtml(date);
        const cleanAuthor = sanitizeHtml(author);

        const validatedData = await schemaValidation.validateAsync({cleanTitle, cleanDescription, 
        cleanLocation, cleanAuthor, cleanDate, price, fileType});

        if(validatedData) {
          await ad.updateOne({ $set: { title, description, date, photo, location, author: req.session.user.id, price } });
          res.json({ message: 'OK' });
        } else {
          const path = req.file ? req.file.path : null;
          fs.unlinkSync(path);
          res.status(400).json({ message: 'Failed validation' });
        }
      } else {
        const path = req.file ? req.file.path : null;
        fs.unlinkSync(path);
        res.status(404).json({ message: 'Not found...' });
      }
    } else {
      res.status(400).json({ message: 'You are not authorized' });
    }
  } catch (err) {
    const path = req.file ? req.file.path : null;
    fs.unlinkSync(path);
    res.status(400).json({ error: 'Bad Request', message: err.message });
  }
};


exports.deleteAd = async(req, res) => {
  try {
    const ad = await Ad.findOneAndDelete({ _id: req.params.id});
    if (ad) {
      const photoPath = path.resolve(`public/uploads/${ad.photo}`);

      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      } else {
        console.error('File does not exist:', photoPath);
      }
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting ad:', message: err.message });
  }
};

