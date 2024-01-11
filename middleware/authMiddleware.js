  // middleware/authMiddleware.js
  module.exports = function(req, res, next) {
    // Check if the user is authenticated
    if (req.session && req.session.isAuthenticated) {
      // Allow access to the route if authenticated
      return next();
    } else {
      // Redirect to the login route if not authenticated
      res.redirect('/login');
    }
  };
