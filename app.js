var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'prolog_db');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
})

var upload = multer({ storage: storage })
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/uploadfile', upload.single('fileToUpload'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.redirect('/');
});

// app.delete('/deleteFile/:name', (req, res, next) => {
//   const fileName = req.params.name;
//   const path = './prolog_db/'.concat(fileName);
//   fs.unlinkSync(path);
//   res.redirect(303, '/');
// });

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
