// Dependencies
// Requires express
const router = require('express').Router();
// Requires sequelize
const sequelize = require('../config/connection');
// Requires models
const { Post, User, Rating } = require('../models');
// Requires authorization
const authorize = require('../utils/auth')

// Renders dashboard page
router.get('/', authorize, (req, res) => {
    Post.findAll({
      where: {
        postDog: req.session.postDog
      },
      attributes: [
        'id',
        'postTitle',
        'postDateCreated',
        'postLocation',
        'postAvailable',
        'postDog',
      ],
      include: [
        {
          // THESE MAY CHANGE DEPENDING ON WHAT BRIT POSTS FOR COMMENT MODEL
          model: Rating,
          attributes: ['ratingId', 'rating'],
          include: {
            model: User,
            attributes: ['userName']
          }
        },
        {
          model: User,
          attributes: ['userName']
        }
      ]
    })
      .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Edit posts
router.get('/edit/:id', authorize, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'postTitle',
      'postDateCreated',
      'postLocation',
      'postAvailable',
      'postDog',
    ],
    include: [
      {
        model: Rating,
        attributes: ['ratingId', 'rating'],
        include: {
          model: User,
          attributes: ['userName']
        }
      },
      {
        model: User,
        attributes: ['userName']
      }
    ]
  })
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with an id of ' + id });
        return;
      }
      const post = postData.get({ plain: true });
      res.render('edit-post', { post, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;