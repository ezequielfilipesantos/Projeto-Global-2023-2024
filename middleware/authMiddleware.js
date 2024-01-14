  // middleware/authMiddleware.js
  module.exports = function(req, res, next) {
    if (req.session && req.session.isAuthenticated) {
      return next();
    } else {
      res.redirect('/login');
    }
  };
