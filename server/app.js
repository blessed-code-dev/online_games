var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var fieldRouter = require('./routes/field_api');
var snakeScore = require('./routes/snake_score');
var index = require('./routes/index');
var privacy = require('./routes/privacy');
var logsRouter = require('./routes/logs');
var config = require('./config.json')
var cons = require('consolidate');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(
    cors({
        origin: `*`,
    })
)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index)
app.use('/', express.static(path.join(__dirname, '../client', 'build')))
app.use('/field_api', fieldRouter);
app.use('/snake_score', snakeScore);
app.use('/privacy_policy', privacy);
app.use('/get_logs',logsRouter);


// if (process.env.NODE_ENV==='production'){
//     app.use('/',express.static(path.join(__dirname,'../client','build')))
// }



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
