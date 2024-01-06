// middleware/authMiddleware.js
module.exports = function (req, res, next) {
    // Check if the user is authenticated
    if (req.session && req.session.isAuthenticated) {
        return next(); // Allow access to the route if authenticated
    } else {
        // Skip redirection for login, registerPage1, and registerPage2 routes
        if (
            req.path === '/loginPage' ||
            req.path === '/registerPage1' ||
            req.path === '/registerPage2'
        ) {
            return next();
        }
        res.redirect('/loginPage'); // Redirect to login if not authenticated
    }
};
