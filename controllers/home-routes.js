// Requires express
const router = require('express').Router();
// Requires sequelize
const sequelize = require('../config/connection');
// Requires models
const { post, user, rating } = require('../models');

// Get all posts
router.get('/', (req, res) => {
    post.findAll({
        attributes: [
          'postID',
          'postTitle',
          'postDescription',
          ],
        order: [[ 'created_at', 'DESC']],
        include: [
            {
                model: user,
                attributes: ['userName']
            },
            {
                model: rating,
                attributes: ['ratingID', 'rating'],
                include: {
                    model: user,
                    attributes: ['userName']
                }
            }
        ]
    })
    .then(postData => {
      const posts = postData.map(post => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a specific post
router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'postID',
        'postTitle',
        'postDescription',
      ],
      include: [
        {
          model: user,
          attributes: ['userName']
        },
        {
            model: rating,
            attributes: ['ratingID', 'rating'],
            include: {
                model: user,
                attributes: ['userName']
            }
        }
      ]
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'No post found with id of ' + id });
          return;
        }
        const singlePost = postData.get({ plain: true });
        res.render('single-post', {singlePost});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Get log in page
router.get('/login', (req, res) => {
    res.render('login');
  });

module.exports = router;