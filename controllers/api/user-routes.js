// Dependencies
// Express.js connection
const router = require('express').Router();
// User, Post, Vote models
const { user, post, rating } = require('../../models');
// Authorization Helper
const authorize = require('../../utils/auth');

// Routes
// Get all users
router.get('/', (req, res) => {
    user.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET user by id
router.get('/:ID', (req, res) => {
    user.findOne({
      attributes: { exclude: ['password'] },
      where: {
        ID: req.params.ID
      },
      include: [
        {
          model: post,
          attributes: ['postID', 'postTitle', 'postDescription', 'postDateCreated']
        },
        {
            model: rating,
            attributes: ['ratingID', 'rating', 'created_at'],
            include: {
                model: post,
                attributes: ['title']
            }
        }
      ]
    })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with id of ' + userData.ID });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Add a new user
router.post('/', (req, res) => {
  user.create({
    username: req.body.username,
    userEmail: req.body.userEmail,
    password: req.body.password,
    dogName: req.body.dogName,
    dogAge: req.body.dogAge,
    userBorough: req.body.userBorough,
    userAvailable: req.body.userAvailable,
    dogBreed: req.body.dogBreed,
    dogActivity: req.body.dogActivity
  })
    .then(userData => {
        res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login route
router.post('/login', (req, res) => {
    user.findOne({
        where: {
        userEmail: req.body.userEmail
        }
    }).then(userData => {
        if (!userData) {
        res.status(400).json({ message: 'Email address not found.' });
        return;
        }
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
          req.session.ID = userData.ID;
          req.session.userName = userData.userName;
          req.session.loggedIn = true;
          res.json({ user: userData, message: 'Log in sucessful!' });
    });  
});
});

// Log out an existing user
router.post('/logout', authorize, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})

// Update an existing user
router.put('/:ID', authorize, (req, res) => {
    user.update(req.body, {
        individualHooks: true,
        where: {
            ID: req.params.ID
        }
    })
      .then(userData => {
        if (!userData[0]) {
          res.status(404).json({ message: 'No user found with an id of ' + userData.ID });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  })

// Delete an existing user
router.delete('/:ID', authorize, (req, res) => {
    user.destroy({
      where: {
        ID: req.params.ID
      }
    })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with an id of ' + userData.ID });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;