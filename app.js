// Import necessary modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import custom modules for database connection and routing
var connectDB = require('./assignment3_100886264/config'); // Connect to the database
var indexRouter = require('./routes/index'); // Index route
var usersRouter = require('./routes/users'); // Users route
var assignmentsRouter = require('./routes/assignments'); // Assignments route
var methodOverride = require('method-override'); // For HTTP method override (e.g., PUT/DELETE)
const ejsLayouts = require('express-ejs-layouts'); // For EJS layouts

var app = express();

// Connect to the database
connectDB();

// Set up view engine (EJS)
app.set('views', path.join(__dirname, 'views')); // Set the views folder
app.set('view engine', 'ejs'); // Use EJS as the templating engine

// Use EJS layouts to wrap views in a common layout
app.use(ejsLayouts);

// Enable HTTP method override (useful for forms that need PUT or DELETE methods)
app.use(methodOverride('_method'));

// Set up logging, body parsing, and cookie parsing middleware
app.use(logger('dev')); // Log HTTP requests in development format
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// Set a default title for the application, accessible in all views
app.use((req, res, next) => {
    res.locals.title = "Assignment Tracker"; // Set a default title for all views
    next(); // Move to the next middleware
});

// Route for the homepage
app.get('/', (req, res) => {
    res.render('home', { title: 'Home - Assignment Tracker' }); // Render the 'home' view with a dynamic title
});

// Use custom routers for handling different routes
app.use('/', indexRouter); // Route for the index page
app.use('/users', usersRouter); // Route for users
app.use('/assignments', assignmentsRouter); // Route for assignments

// Handle 404 errors (page not found)
app.use(function(req, res, next) {
    next(createError(404)); // Create a 404 error
});

// Error handling middleware
app.use(function(err, req, res, next) {
    // Set locals for the error message and error stack (only in development)
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {}; // Show detailed error stack in development

    res.status(err.status || 500); // Set the HTTP status code (default to 500 for server error)
    res.render('error'); // Render the error page
});

// Export the app for use in other modules
module.exports = app;