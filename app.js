var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'), 
    cors = require('cors'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    flash = require('connect-flash');
var app = express();

const url = 'mongodb://localhost:27017/receipts';   // Your db is receipts
mongoose.connect(url, {useMongoClient: true});

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb 27017...');
});
mongoose.connection.on('error', (err) => {
    if(err){
        console.log('error in db connection: ' + err);
    }
});

const port = 3000;

// Models  
var Receipt = require('./models/receipt');
var User = require('./models/user');
mongoose.Promise = global.Promise;

// CORS middleware
app.use(cors());

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
var receiptRoute = require('./routes/receipts');
var indexRoute = require('./routes/index');
var userRoute = require('./routes/user');
var commentRoute = require('./routes/comments');

//  View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(methodOverride('_method'));
app.use(flash());

// Passport Configuration
app.use(require('express-session')
    (
        {
        secret: 'dimash',
        resave: false,
        saveUninitialized: false
        }
    )
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

// Flash Messages
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});


// Using routes
app.use('/receipts', receiptRoute);
app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/receipts/:id/comments', commentRoute);

app.listen(port, () => {
    console.log('Server is connected at port ' + port);
});
