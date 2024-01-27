const Ad = require('../models/ad.model');


exports.getAll = async(req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async(req, res) => {
  try {
    const adById = await Ad.findById(req.params.id);

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
    const adsByTitle = await Ad.find({
      title: { $regex: new RegExp(sanitizedSearchPhrase, 'i') }
    });

    if (adsByTitle.length === 0) {
      res.status(404).json({ message: 'Not found..' });
    } else {
      res.json(adsByTitle);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}


exports.postNewAd = async (req, res) => {
  try {
    
    const { title, description, date, photo, price, location, author } = req.body;

    const newAd = new Ad({ title, description, date, photo, price, location, author });
    await newAd.save();
    res.json({ message: 'OK' });
  
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


//add populate 
//data validation
//tests??
