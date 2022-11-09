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
  console.log("++++++++++++++++++++++++++");
  console.log(req.session.user_id);
    user.findOne({
      where: {
        id: req.session.user_id
      },
      include: [
        {
          model: rating,
          attributes: ['id', 'rating'],
        },
        {
          model: post,
        }
      ]
    })
      .then(userData => {
        const dashboardPosts = userData.get({ plain: true });
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
      id: req.params.id
    },
    attributes: [
      'id',
      'postTitle',
      'postDescription',
    ],
    include: [
      {
        model: rating,
        attributes: ['id', 'rating'],
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
        res.status(404).json({ message: 'No post found with an id of ' + postData.id});
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