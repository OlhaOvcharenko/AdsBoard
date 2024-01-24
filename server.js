const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const uri = `mongodb+srv://ovcharenkoolga2014:Soul1998@cluster0.jwymdrz.mongodb.net/AdsDB?retryWrites=true&w=majority`;

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production') dbUri = uri;
else if (NODE_ENV === 'test') dbUri = 'mongodb://0.0.0.0:27017/AdsDBTest';
else dbUri = 'mongodb://0.0.0.0:27017/AdsDB';

mongoose.connect(dbUri);
const db = mongoose.connection;
//console.log(db,"dataBase");

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

module.exports = server;
