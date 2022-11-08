const withAuth = (req, res, next) => {
    if (!req.session.ID) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;