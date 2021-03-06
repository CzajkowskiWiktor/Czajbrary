const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const bookingController = require('./controllers/bookingController');
const viewRouter = require('./routes/viewRoutes');

const app = express();

//trusting proxy to secure createSendToken
app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(cors());
//Access-Control-Allow-Origin
//api.czajbrary.com front-end czajbrary.com
//app.use(cors({
//    oirign: 'https://czajbrary.herokuapp.com'
//}))

//allowing all routes
app.options('*', cors());
// app.options('/api/v1/books/:id', cors());

//serving static files
////////////////// to see overview.html ///////////////////
app.use(express.static(path.join(__dirname, 'frontend')));

//security http headers
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'http:', 'data:'],
        scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
        styleSrc: ["'self'", 'https:', 'http:', 'unsafe-inline'],
      },
    })
);

//development login
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//limit requests from API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in a hour!'
});
app.use('/api', limiter);

app.post('/webhook-checkout', express.raw({type: 'application/json'}),bookingController.webhookCheckout);

//body parser
app.use(express.json({
    limit: '10kb'
}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));
app.use(cookieParser());

//data sanitization against NoSQL query incjection
app.use(mongoSanitize());

//data sanitization against XSS
app.use(xss());

//prevent parameter pollution
app.use(hpp({
    whitelist: ['ratingsAverage', 'ratingsQuantity', 'price', 'genre', 'year']
}));

app.use(compression())

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    next();
});

//Routes
app.use('/', viewRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;