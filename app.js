// if(process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// };

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const path = require('path');
// const methodOverride = require('method-override');
// const ejsMate = require('ejs-mate');
// const ExpressError = require('./utils/ExpressError.js');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const flash = require('connect-flash');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const User = require('./models/user.js');

// const ListingRoutes = require('./routes/listing.js');
// const ReviewRoutes = require('./routes/review.js');
// const UserRoutes = require('./routes/user.js');

// const MONGO_URL = process.env.MONGO_URI;
// const PORT = process.env.PORT || 8080;

// main().then(() => {
//     console.log("connected to db");
// }).catch((err) => {
//     console.log(err);
// });

// async function main() {
//     await mongoose.connect(MONGO_URL)
// };

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.urlencoded({ extended: true}));
// app.use(methodOverride('_method'));
// app.engine('ejs', ejsMate);
// app.use(express.static(path.join(__dirname, 'public')));

// const store = MongoStore.create({
//     mongoUrl: MONGO_URL,
//     touchAfter: 24 * 3600, // time period in seconds
//     crypto: {
//         secret: process.env.SECRET
//     }
// });

// store.on('error', (err) => {
//     console.log("Session store error", err);
// });

// const sessionOptions = {
//     store,
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
//         maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
//     },
// };

// app.use(session(sessionOptions));
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) => {
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     res.locals.currUser = req.user;
//     next();
// });

// app.get('/', (req, res) => {
//     res.redirect('/listings');
// });

// // Mount user routes first to avoid conflicts
// app.use('/', UserRoutes);

// app.use('/listings', ListingRoutes);
// app.use('/listings/:id/reviews', ReviewRoutes);

// app.all('*', (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });

// app.use((err, req, res, next) => {
//     let { status = 500, message = 'Something went wrong' } = err;
//     res.status(status).render('error.ejs', { err });
//     // res.status(status).send(message);
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const ListingRoutes = require('./routes/listing.js');
const ReviewRoutes = require('./routes/review.js');
const UserRoutes = require('./routes/user.js');

const MONGO_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;

main().then(() => {
    console.log("✅ Connected to MongoDB Atlas");
}).catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    touchAfter: 24 * 3600, // time period in seconds
    crypto: {
        secret: process.env.SECRET || "fallbacksecret"
    }
});

store.on('error', (err) => {
    console.log("Session store error", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET || "fallbacksecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // only true in production
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
});

app.get('/', (req, res) => {
    res.redirect('/listings');
});

// Mount user routes first to avoid conflicts
app.use('/', UserRoutes);

app.use('/listings', ListingRoutes);
app.use('/listings/:id/reviews', ReviewRoutes);

app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { status = 500, message = 'Something went wrong' } = err;
    res.status(status).render('error.ejs', { err });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
