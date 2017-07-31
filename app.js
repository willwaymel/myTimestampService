var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var strftime = require('strftime');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/:id", function(req, res) {
  var qs = req.params.id;
  var responseobj = {'unix':0,'natural':""};
  var unixTime = getUnixStamp(qs);
  if (unixTime === null) {
    responseobj.unix = null;
    responseobj.natural = null;
  } else {
    responseobj.unix = unixTime;
    responseobj.natural = strftime('%B %d, %Y', new Date(unixTime));
  }
    res.end(JSON.stringify(responseobj));
  });
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//returns unix stamp or null if there is a NaN error
function getUnixStamp(input) {
  // console.log("hello " + parseInt(input).toString().length + " " + input + " " + input.length + " " + typeof parseInt(input));
  var d;
  if (parseInt(input).toString().length == input.length) {
    //it's a number
  d = new Date(parseInt(input)).getTime();
    console.log(d + " im here");
  return d;
  } else {
  d = new Date(input).getTime();
  return (isNaN(d) ? null : d);  
  }

}



module.exports = app;
