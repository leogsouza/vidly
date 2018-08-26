const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const app = express();
const customers = require('./routes/customers')
const genres = require('./routes/genres')
const movies = require('./routes/movies')

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
.then(() => console.log('Connected to MongDB'))
.catch(err => console.log('Could not connect to MongoDB', err));

app.use(express.json());

app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening port ${port}`));