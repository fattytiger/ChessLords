var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * 
 * Config the database
 * 
 * **/
const mongoose = require('mongoose')
//Get the datatbase url
const mongoDB = "mongodb://localhost:27017/chesslord"
//connect mongodb database ,the databse name is chesslord
mongoose.connect(mongoDB)
//connect action success
mongoose.connection.on('connected', function () {
  console.log(`mongodb connected success`);
})
//connect action failed
mongoose.connection.on('error', function () {
  console.log('mongodb connected failed')
})
//disconnected action
mongoose.connection.on('disconnected', function () {
  console.log('mongodb disconnected')
})


/**
 * 
 * Config websocket
 * 
 * **/
const webSocket = require('ws')
const handler  = require('./handler')
const ClientManager = require('./handler/ClientManager')
//establish a websocket server
const wss = new webSocket.Server({ port: 8000 })
// let clients = []
wss.on('connection', function connection(ws) {
  handler.onClientMessage(ws)  
  handler.onClientClose(ws)
  ClientManager.onClientConnect(ws)
})



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
