const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('./routes/genres')

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
.then(() => console.log('Connected to MongDB'))
.catch(err => console.log('Could not connect to MongoDB', err));

app.use(express.json());

app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening port ${port}`));