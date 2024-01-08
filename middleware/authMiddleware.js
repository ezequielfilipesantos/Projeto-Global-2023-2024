module.exports = function(req, res, next) {
    // Check if the user is authenticated
    if (req.session && req.session.isAuthenticated) {
      // Allow access to all routes if authenticated
      return next();
    } else {
      // Allow access to the index, login, and register routes without authentication
      if (req.path === '/login' || req.path === '/register' || req.path === '/index') {
        return next();
      } else {
        // Redirect to the login route for all other routes
        res.redirect('/login');
      }
    }
  };
  