var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));


var todos = ['algo1','algo2','algo3','chau'];

app.get('/api/list',function(req,res){
   
    res.json({data:todos});
});
app.post('/api/add',function(req,res){
    
    todos.push(req.body.todo);
    res.json({resp:'OK'});
});
app.post('/api/remove',function(req,res){
    
    todos.splice(todos.indexOf(req.body.todo),1)
    res.json({resp:'OK'});
    
});
//agregar, remove

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



module.exports = app;
