const express = require('express');
const morgan = require('morgan');

const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Middlewares
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
////////////////// to see overview.html ///////////////////
// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log('hello');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

//Routes
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;