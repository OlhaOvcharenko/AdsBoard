const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const Session = require('../models/session.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.register = async (req, res) => {
  try {
    const { login, password, phoneNumber } = req.body;

    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (!req.file) {
      res.status(400).json({ message: 'Failed file type validation.' });
      return;
    }
    console.log(login, password, fileType, phoneNumber)

    if (
      login && typeof login === 'string' && password && typeof password === 'string' &&
      phoneNumber && !isNaN(phoneNumber) && req.file && ['image/jpg', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const userWithLogin = await User.findOne({ login });

      if (userWithLogin) {
        console.log(req.file);
        fs.unlinkSync(req.file.path);
        return res.status(409).send({ message: 'User with this login already exists' });
      }

      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        avatar: req.file.filename,
        phoneNumber: Number(phoneNumber),
      });
      res.status(201).send({ message: 'User created ' + user.login });
    } else {
      const path = req.file ? req.file.path : null;
      fs.unlinkSync(path);
      res.status(400).json({ message: 'Failed validation' });
    }
  } catch (err) {
    const path = req.file ? req.file.path : null;
    fs.unlinkSync(path);
    console.error(err);
    res.status(400).json({ error: 'Bad Request', message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    console.log(login, password);

    if (login && typeof login === "string" && password && typeof password === "string") {

      const user = await User.findOne({ login });

      if (!user) {

        res.status(400).send({ message: "Login or password are incorrect." });

      } else {

        if(bcrypt.compareSync( password, user.password)){
          
          req.session.user = { login: user.login, id: user._id };
          res.status(200).json( req.session.user );
          console.log('user', req.session.user)

        } else {
          res.status(400).send({ message: "Login or password are incorrect." });
        }

      }
        
    } else {
      res.status(400).json({ message: 'Failed validation' });
    }

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad request', message: err.message });
  }
  
};

exports.getUser = async (req, res) => {
  try {
    if (req.session.user && req.session.user.id) {
      const loggedUser = await User.findById(req.session.user.id);
      if (loggedUser) {
        console.log(loggedUser);
        return res.json(loggedUser);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } else {
      return res.status(401).json({ message: "User not authenticated" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    
    req.session.destroy();

    if (process.env.NODE_ENV !== "production") {
      await Session.deleteMany({});
    }
    res.status(200).send({ message: "Logout successful." });

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad request', message: err.message });
  }
};