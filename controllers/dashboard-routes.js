// Dependencies
// Requires express
const router = require('express').Router();
// Requires sequelize
const sequelize = require('../config/connection');
// Requires models
const { post, user, rating } = require('../models');
// Requires authorization
const authorize = require('../utils/auth')

// Renders dashboard page
router.get('/', authorize, (req, res) => {
    post.findAll({
      where: {
        postID: req.session.postID
      },
      attributes: [
        'postID',
        'postTitle',
        'postDescription',
      ],
      include: [
        {
          model: rating,
          attributes: ['ratingID', 'rating'],
          include: {
            model: user,
            attributes: ['username']
          }
        },
        {
          model: user,
          attributes: ['username']
        }
      ]
    })
      .then(postData => {
        const dashboardPosts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', { dashboardPosts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Edit posts
router.get('/edit/:id', authorize, (req, res) => {
  post.findOne({
    where: {
      postID: req.params.postID
    },
    attributes: [
      'postID',
      'postTitle',
      'postDescription',
    ],
    include: [
      {
        model: rating,
        attributes: ['ratingID', 'rating'],
        include: {
          model: user,
          attributes: ['username']
        }
      },
      {
        model: user,
        attributes: ['username']
      }
    ]
  })
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with an id of ' + postData.postID});
        return;
      }
      const editPost = postData.get({ plain: true });
      res.render('edit-post', { editPost, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;