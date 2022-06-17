//Import Express & Morgan
const express = require('express'),
  morgan = require('morgan');

const app = express();

let topTenMovies = [
  {
    title: 'Equilibrium',
  },
  {
    title: 'Lords of Dogtown',
  },
  {
    title: 'Lost Highway',
  }
];

//Middleware functions
app.use(morgan('common'));
app.use(express.static('public'));

//Endpoints
app.get('/', (req, res) => {
  res.send('Welcome to Milos Movie APP!');
});

app.get('/movies', (req, res) => {
  res.json(topTenMovies);
});

// GET data about a single movie by title to the user
app.get('/movies/title', (req, res) => {
  res.send('Return a list of ALL movies to the user');
});

// GET data about a genre by name/title
app.get('/movies/genres/title', (req, res) => {
  res.send('Return data about a genre (description) by name/title (e.g., “Thriller”)');
});

// GET data about a director by name
app.get('/movies/directors/name', (req, res) => {
  res.send('Return data about a director (bio, birth year, death year) by name');
});


//Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Listening for port 8080
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
