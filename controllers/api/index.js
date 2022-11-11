// Dependencies
// Server connection
const router = require('express').Router();
// User Routes
const userRoutes = require('./user-routes');
// Post Routes
const postRoutes = require('./post-routes');
// Rating Routes
const ratingRoutes = require('./rating-routes');

// Define route path for the API to use, e.g. api/users/
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/ratings', ratingRoutes);

// Export the router
module.exports = router;