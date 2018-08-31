require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId =require('joi-objectid')(Joi);
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

process.on('uncaughtException', (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

process.on('unhandledRejection', (ex) => {
  throw ex;
})

winston.add(new winston.transports.File({filename: 'logfile.log'}));
winston.add(new winston.transports.MongoDB({
  db:'mongodb://localhost/vidly',
  level: 'info'
}));

const p = Promise.reject(new error('Something failed miserably'));
p.then(() => console.log('Done')).catch()

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
.then(() => console.log('Connected to MongDB'))
.catch(err => console.log('Could not connect to MongoDB', err));

app.use(express.json());

app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening port ${port}`));