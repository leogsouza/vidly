const express = require('express');
const app = express();

const genres = [
  {id: 1, name: 'Action'},
  {id: 2, name: 'Adventure'},
  {id: 3, name: 'Drama'},
  {id: 4, name: 'Western'},
]

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(item => item.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre with the given ID was not found');

  res.send(genre)
});

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening port ${port}`));