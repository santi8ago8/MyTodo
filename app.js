var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('monk')('localhost/todos');
var todos = db.get('todos');
var app = express();


var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

// We are going to protect /api routes with JWT
var secret = "muy secreto!!!";
app.use('/api', expressJwt({
  secret: secret
}));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

app.post('/authenticate', function (req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
    res.send(401, 'Wrong user or password');
    return;
  }

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, secret, {
    expiresInMinutes: 60 * 5
  });

  res.json({
    token: token
  });
});

app.get('/api/restricted', function (req, res) {
  console.log('user ' + req.user.email + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});

app.get('/api/list', function (req, res) {
  todos.find({}, function (err, docs) {
    res.json({
      data: docs
    });
  });

});
app.post('/api/add', function (req, res) {

  var t = {
    texto: req.body.todo,
    fecha: new Date()
  };
  todos.insert(t, function (err, doc) {
    res.json({
      resp: 'OK',
      todo: doc
    });
  })
});
app.post('/api/remove', function (req, res) {

  todos.remove({
    _id: todos.id(req.body.todo._id)
  }, function (err, count) {
    console.log(err, count);
    res.json({
      resp: 'OK',
      todo: req.body.todo
    });
  });


});
//agregar, remove

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



module.exports = app;