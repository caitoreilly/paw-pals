// Dependencies
// Express.js connection
const router = require('express').Router();
// Comment model
const { rating } = require('../../models');
// Authorization Helper
const authorize = require('../../utils/auth');

// Routes

// Get ratings
router.get('/', (req, res) => {
    rating.findAll()
      .then(ratingData => res.json(ratingData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Post a new rating
router.post('/', authorize, (req, res) => {
    rating.create({
      rating_id: req.body.ratingID,
      rating: req.body.rating,
    })
      .then(ratingData => res.json(ratingData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
});

module.exports = router;