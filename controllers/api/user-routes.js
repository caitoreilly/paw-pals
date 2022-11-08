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
router.get('/:id', (req, res) => {
    user.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
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
                model: Post,
                attributes: ['title']
            }
        }
      ]
    })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with id of ' + id });
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
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword
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
        email: req.body.userEmail
        }
    }).then(userData => {
        if (!userData) {
        res.status(400).json({ message: 'Email address not found.' });
        return;
        }
        const validPassword = userData.checkPassword(req.body.userPassword);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
          res.json({ user: userData, message: 'Log in sucessful!' });
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
router.put('/:id', authorize, (req, res) => {
    user.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
      .then(userData => {
        if (!userData[0]) {
          res.status(404).json({ message: 'No user found with an id of ' + id });
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
router.delete('/:id', authorize, (req, res) => {
    user.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with an id of ' + id });
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