var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('monk')('localhost/todos');
var todos = db.get('todos');
var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));



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