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
        attributes: ['id', 'postTitle', 'postDescription', 'postDateCreated']
      },
      {
        model: rating,
        attributes: ['id', 'rating', 'created_at'],
        include: {
          model: post,
          attributes: ['title']
        }
      }
    ]
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with id of ' + userData.id });
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
      console.log(userData.dataValues)
      post.create({
        postTitle: userData.dogName,
        postDescription:
          `Dog Age: ${userData.dataValues.dogAge}
          Borough: ${userData.dataValues.userBorough}
          Availability: ${userData.dataValues.userAvailable}
          Breed: ${userData.dataValues.dogBreed}
          Favorite Activity ${userData.dataValues.dogActivity}
          `,
        userId: userData.dataValues.id
      })
        .then(postData => {
          res.json(postData)
        }).catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login route
router.post('/login', (req, res) => {
  console.log("+++++++++++++++++++++++");

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
      req.session.user_id = userData.dataValues.id;
      req.session.username = userData.dataValues.username;
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
router.put('/:id', authorize, (req, res) => {
  user.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(userData => {
      if (!userData[0]) {
        res.status(404).json({ message: 'No user found with an id of ' + userData.id });
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
        res.status(404).json({ message: 'No user found with an id of ' + userData.id });
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