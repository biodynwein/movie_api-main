const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

//Import Express & Morgan
const express = require('express'),
  morgan = require('morgan');

const app = express();

// JSON movie list
let movieList = [
  {
      movie: 'Timer',
      director: 'Jac Schaeffer',
      genre: 'Romatic Comedy'
  },
  {
      movie: 'Baby Driver',
      director: 'Edgar Wright',
      genre: 'Action'
  },
  {
      movie: 'Frequencies',
      director: 'Darren Paul Fisher',
      genre: 'Mystery'
  },
  {
      movie: 'The Grand Budapest Hotel',
      director: 'Wes Anderson',
      genre: 'Adventure'
  },
  {
      movie: 'Incident in a Ghostland',
      director: 'Pascal Laugier',
      genre: 'Horror'
  },
  {
      movie: 'What We Do in the Shadows',
      director: 'Jermaine Clement',
      genre: 'Comedy'
  },
  {
      movie: 'It Follows',
      director: 'David Robert Mitchell',
      genre: 'Horror'
  },
  {
      movie: 'La La Land',
      director: 'Damien Chazelle',
      genre: 'Muscial Comedy'
  },
  {
      movie: 'Everything Everything',
      director: 'Stella Meghie',
      genre: 'Drama'
  },
  {
      movie: 'The Call',
      director: 'Chung-Hyun Lee',
      genre: 'Horror'
  }
];

//Middleware functions
app.use(morgan('common'));
app.use(express.static('public'));

//Endpoints
// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to Milos Movie APP!');
} );

// GET a list of ALL movies to the user
app.get('/movies', (req, res) => {
  res.json(movieList);
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

// POST new users to register
app.post('/users', (req, res) => {
  res.send('Allow new users to register');
});

// PUT updated to username
app.put('/users/username', (req, res) => {
  res.send('Allow users to update their user info (username)');
});

// POST movie to user's favorites list
app.post('/users/username/movies/movieName', (req, res) => {
  res.send('Allow users to add a movie to their list of favorites (showing only a text that a movie has been added)');
});

// DELETE movie from user's favorites list
app.delete('/users/username/movies/movieName', (req, res) => {
  res.send('Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed)');
});

// DELETE a user from registration database
app.delete('/users/username', (req, res) => {
  res.send('Allow existing users to deregister (showing only a text that a user email has been removed)');
});

//Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Listening for port 8080
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');});

  //Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});