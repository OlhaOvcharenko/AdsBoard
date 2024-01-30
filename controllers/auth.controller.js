const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const Session = require('../models/session.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.register = async (req, res) => {
  try {
    const { login, password, phoneNumber } = req.body;

    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

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
      res.status(400).json({ message: 'Bad Request' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
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
          
            const userObject = {
              id: user.id,
              login: user.login,
            };
        
            req.session.user = userObject;
            console.log(userObject);

          res.status(200).send({ message: "Login succesful." });

        } else {
          res.status(400).send({ message: "Login or password are incorrect." });
        }

      }
        
    } else {
      res.status(400).json({ message: 'Bad Request' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
  
};

exports.getUser = async (req, res) => {
  res.send("Yeh, I/m logged!" + req.session.user.login )
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
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
};