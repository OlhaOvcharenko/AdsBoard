const express = require('express');
const cors = require('cors');
const path = require('path');//????
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const session = require("express-session");

const app = express();

const uri = `mongodb+srv://ovcharenkoolga2014:Soul1998@cluster0.jwymdrz.mongodb.net/AdsDB?retryWrites=true&w=majority`;

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production') dbUri = uri;
else if (NODE_ENV === 'test') dbUri = 'mongodb://0.0.0.0:27017/AdsDBTest';
else dbUri = 'mongodb://0.0.0.0:27017/AdsDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', err => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to the database');
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({secret: process.env.secret, store: MongoStore.create(mongoose.connection), resave: false, saveUninitialized: false}));

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');
const { connect } = require('http2');

app.use('/api', adsRoutes);
app.use('/auth', authRoutes);

// Serve static files
// app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = server;