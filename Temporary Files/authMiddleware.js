// middleware/authMiddleware.js
module.exports = function(req, res, next) {
    // Check if the user is authenticated
    if (req.session && req.session.isAuthenticated) {
      // Allow access to the route if authenticated
      return next();
    } else {
      // Skip redirection for the login route
      if (req.path === '/loginPage') {
        return next();
      }
      // Redirect to the login route for all other routes
      res.redirect('/loginPage');
    }
  };
  