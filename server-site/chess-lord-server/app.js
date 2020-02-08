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
const COMMANDS = require('./commands')
const Player = require('./models/players/player')
//establish a websocket server
const wss = new webSocket.Server({ port: 8000 })

let clients = []

wss.on('connection', function connection(ws) {
  let client = ws
  clients.push(client)
  ws.on('message', function message(msg) {
    let received = JSON.parse(msg)
    let msgID = received[0]
    let receivedData = received[1]
    /**
     * 
     * 8005 code 
     * 
     * **/
    if (msgID === 8005) {
      let hero_id = receivedData[0]
      let hero_name = receivedData[1]
      Player.findOne({ hero_id: hero_id }, function (err, doc) {
        if (err) { console.log(err.message); }
        console.log(doc)
        //if search result is null ,illustrate does not have the hero information in databse
        if (doc === null) {
          let hero = new Player({
            hero_id: hero_id,
            hero_name: hero_name,
            login: true,
            ready: false
          })
          hero.save(function (err, res) {
            if (err) { console.log(err); }

            let nowDate = new Date()

            let msgData = res

            let sendMesaage = [COMMANDS.HERO_INFO, nowDate, msgData]

            client.send(JSON.stringify(sendMesaage))

            client.hero = res.hero_id

          })
        }

        //if search result is exist ,illustrate there already have player information in database
        if (doc) {
          //search condition
          let searchCondition = { 'hero_id': hero_id }

          //excute the data update
          let updateCondition = { 'login': true }

          Player.updateOne(searchCondition, updateCondition, function (err, res) {
            if (err) { console.log(err); }

            let nowDate = new Date()

            //find the updated data
            Player.findOne({ hero_id: hero_id }, function (err, res) {

              if (err) { console.log(err); return }

              let msgData = res

              let sendMesaage = [COMMANDS.HERO_INFO, nowDate, msgData]

              client.send(JSON.stringify(sendMesaage))

              client.hero = res.hero_id
            })
          })
        }
      })
    }


    if (msgID === COMMANDS.HERO_READ) {

      let nowDate = new Date()

      let hero_id = receivedData[0]      
      
      Player.findOne({ hero_id: hero_id }, function (err, res) {

        if (err) { console.log(err); return }

        let msgData = res

        let sendMesaage = [COMMANDS.HERO_READ, nowDate, msgData]

        client.send(JSON.stringify(sendMesaage))

        client.hero = res.hero_id
      })

    }


  })


  ws.on('close', function close() {
    console.log('disconected')
    Player.find({}, function (err, res) {
      if (err) { console.log(err); return }

      for (let i = 0; i < res.length; i++) {
        let item = res[i].hero_id
        if (item === client.hero) {

          //search condition
          let searchCondition = { 'hero_id': item }

          //excute the data update
          let updateCondition = { 'login': false }

          Player.updateOne(searchCondition, updateCondition, function (err, res) {
            if (err) { console.log(err); }
            console.log('player logout')
          })
        }
      }
    })

  })
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
