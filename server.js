require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const PORT = process.env.SERVER_PORT || 3000;


app.get('/movies', (req, res) => {
  knex
    .select('*')
    .from('movies')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});