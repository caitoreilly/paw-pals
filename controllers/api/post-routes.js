// Dependencies
// Express.js connection
const router = require('express').Router();
// User Model, Post Model, and Rating Model
const { user, post, rating } = require('../../models');
// Sequelize database connection
const sequelize = require('../../config/connection');
// Authorization
const authorize = require('../../utils/auth');

// Routes

// Get all posts
router.get('/', (req, res) => {
    post.findAll({
        attributes: [
          'id',
          'postTitle',
          'postDescription',
          ],
        order: [[ 'created_at', 'DESC']],
        include: [
            {
                model: user,
                attributes: ['username']
            },
            {
              model: rating,
              // THESE MAY CHANGE DEPENDING ON WHAT BRIT POSTS FOR RATING MODEL
              attributes: ['id', 'rating', 'created_at'],
          }
        ]
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get post by id
router.get('/:id', (req, res) => {
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
          model: user,
          attributes: ['username']
        },
        {
          model: rating,
          // THESE MAY CHANGE DEPENDING ON WHAT BRIT POSTS FOR RATING MODEL
          attributes: ['id', 'rating', 'created_at'],
      }
      ]
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(postData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Create a new post
router.post('/', authorize, (req, res) => {
    post.create({
        postTitle: req.body.postTitle,
        postDescription: req.body.postDescription,
        userId: req.session.user_id
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update a post
router.put('/:id', authorize, (req, res) => {
    post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post found with an id of ' + postData.id });
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// Delete a post
router.delete('/:id', authorize, (req, res) => {
    post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'No post found with an id of ' + postData.id });
          return;
        }
        res.json(postData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;