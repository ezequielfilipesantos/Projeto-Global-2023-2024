// middleware/authMiddleware.js
module.exports = function(req, res, next) {
    // Check if the user is authenticated
    if (req.session && req.session.isAuthenticated) {
        return next(); // Allow access to the route
    } else {
        // Skip redirection for index and login routes
        if (req.originalUrl === '/' || req.originalUrl === '/loginPage') {
            return next();
        }
        res.redirect('/loginPage'); // Redirect to login if not authenticated
    }
};
