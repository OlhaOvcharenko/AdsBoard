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
      $or: [
        { title: { $regex: new RegExp(sanitizedSearchPhrase, 'i') } },
        { location: { $regex: new RegExp(sanitizedSearchPhrase, 'i') } },
      ]
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
    const fileType = await getImageFileType(req.file)
    if (!req.file && fileType === 'unknown') {
      return res.status(400).json({ message: 'Failed file type validation.' });
    }
   
    const cleanTitle = sanitizeHtml(title);
    const cleanDescription = sanitizeHtml(description);
    const cleanLocation = sanitizeHtml(location);
    const cleanDate = sanitizeHtml(date);
    const cleanAuthor = sanitizeHtml(author);

    const validatedData = await schemaValidation.validateAsync({cleanTitle, cleanDescription, 
      cleanLocation, cleanAuthor, cleanDate, price});
    
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

exports.editAd = async (req, res) => {
  const { title, description, date, price, location, author } = req.body;
  
  try {
   
    const photo = req.file?.filename;
    console.log(photo);

    const ad = await Ad.findById({ _id: req.params.id});
    console.log(ad)
    if (!ad) {
      return res.status(404).json({ message: 'Not Found' });
    }

    if(photo) {
    const prevPhotoPath = path.resolve(`public/uploads/${ad.photo}`);
      if (fs.existsSync(prevPhotoPath)) {
        fs.unlinkSync(prevPhotoPath);
      } else {
        console.error('File does not exist:', prevPhotoPath);
      }

       const fileType = await getImageFileType(req.file);
       if(fileType === 'unknown'){
         return res.status(400).json({message: 'Unsupported file type.'})
       }
    }

    // Sanitize input data
    const cleanTitle = sanitizeHtml(title);
    const cleanDescription = sanitizeHtml(description);
    const cleanLocation = sanitizeHtml(location);
    const cleanDate = sanitizeHtml(date);
    const cleanAuthor = sanitizeHtml(author);

    // Validate data
    const updatedAd = await schemaValidation.validateAsync({
      cleanTitle,
      cleanDescription,
      cleanLocation,
      cleanAuthor,
      cleanDate,
      price,
      //fileType: photo ? await getImageFileType(req.file) : 'image/png'
    });

    console.log(updatedAd);

    if (updatedAd) {
      // Update the ad object with the new values
      ad.title = cleanTitle;
      ad.description = cleanDescription;
      ad.date = cleanDate;
      ad.photo = photo || ad.photo;
      ad.location = cleanLocation;
      ad.author = req.session.user.id;
      ad.price = price;
    
      // Save the updated ad object in the database
      await ad.save();
    
      return res.json(ad);
    } else {
     
      const path = req.file ? req.file.path : null;
      fs.unlinkSync(path);
      return res.status(400).json({ message: 'Failed validation' });
    }
  } catch (err) {
    // Error occurred
    const path = req.file ? req.file.path : null;
    if(path){
      fs.unlinkSync(path);
    }
    console.error('Error updating advertisement:', err);
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
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

