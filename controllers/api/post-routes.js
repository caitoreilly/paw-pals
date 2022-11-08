// Dependencies
// Express.js connection
const router = require('express').Router();
// User Model, Post Model, and Rating Model
const { User, Post, Rating } = require('../../models');
// Sequelize database connection
const sequelize = require('../../config/connection');
// Authorization
const authorize = require('../../utils/authorization');

// Routes

// Get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
          'id',
          'postTitle',
          'postDateCreated',
          'postLocation',
          'postAvailable',
          'postDog',
          ],
        order: [[ 'created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['userName']
            },
            {
              model: Rating,
              // THESE MAY CHANGE DEPENDING ON WHAT BRIT POSTS FOR RATING MODEL
              attributes: ['ratingID', 'rating', 'created_at'],
              include: {
                  model: Post,
                  attributes: ['title']
              }
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
          model: User,
          attributes: ['userName']
        },
        {
          model: Rating,
          // THESE MAY CHANGE DEPENDING ON WHAT BRIT POSTS FOR RATING MODEL
          attributes: ['ratingID', 'rating', 'created_at'],
          include: {
              model: Post,
              attributes: ['title']
          }
      }
      ]
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'No post found with an id of ' + id });
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
    Post.create({
        postTitle: req.body.postTitle,
        postDescription: req.body.postDescription,
        postDog: req.postDog
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update a post
router.put('/:id', authorize, (req, res) => {
    Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post found with an id of ' + id });
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
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'No post found with an id of ' + id });
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