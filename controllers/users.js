const User = require('../models/user');
const Listing = require('../models/listing');
const Review = require('../models/review');

module.exports.showSignupForm =  (req, res) => {
    res.render('users/signup.ejs');
};

module.exports.signup = async(req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({email, username});
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if(err) return next(err);
            req.flash('success', 'Welcome to TripHaven!');
            res.redirect('/listings');
        })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login.ejs');
};

module.exports.login =  async(req, res) => {
    req.flash("success", "Logged in!");
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash('success', "You are logged out!");
        res.redirect('/listings');
    });
};

// Show user profile with their listings and reviews
module.exports.showProfile = async (req, res, next) => {
    try {
        const user = req.user; // Current logged-in user
        
        // Get all listings by this user
        const userListings = await Listing.find({ owner: user._id }).populate('owner');
        
        // Get all reviews by this user
        const userReviews = await Review.find({ author: user._id }).populate('listing');
        
        res.render('users/profile.ejs', { 
            user, 
            userListings, 
            userReviews
        });
    } catch (err) {
        console.error('Profile error:', err);
        req.flash('error', 'Error loading profile');
        res.redirect('/listings');
    }
};