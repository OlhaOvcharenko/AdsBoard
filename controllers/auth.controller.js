const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { login, password, avatar, phoneNumber } = req.body;

        if (login && typeof login === "string" && password && typeof password === "string") {
            const userWithLogin = await User.findOne({ login });

            if (userWithLogin) {
                return res.status(409).send({ message: "User with this login already exists" });
            }

            const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar, phoneNumber });
            res.status(201).send({ message: "User created" + user.login });
        } else {
            res.status(400).json({ message: 'Bad Request' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};