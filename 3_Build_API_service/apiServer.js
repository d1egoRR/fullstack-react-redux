var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB connection error'));

app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: true,
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
  // 2 dias, 24 horas, 60 minutos, 60 segundos
}));

app.post('/cart', function(req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err) {
    if (err) {
      throw err;
    }
    res.json(req.session.cart);
  });
});

app.get('/cart', function(req, res) {
  if (typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});

// ----> POST BOOKS <----
var Books = require('./models/books.js');

app.post('/books', function(req, res) {
  var book = req.body;

  Books.create(book, function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.get('/books', function(req, res) {
  Books.find(function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.delete('/books/:_id', function(req, res) {
  var query = {_id: req.params._id};
  Books.remove(query, function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.put('/books/:_id', function(req, res) {
  console.log("ppp PUT");
  var book = req.body;
  var query = req.params._id;

  var update = {
    '$set': {
        title: book.title,
        description: book.description,
        image: book.image,
        price: book.price
    }
  };

  var options = {new: true};

  Books.findOneAndUpdate(query, update, options, function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});
// END APIs

app.get('/images', function(req, res) {
  const imgFolder = __dirname + '/public/images';
  const fs = require('fs');
  fs.readdir(imgFolder, function(err, files) {
    if (err) {
      return console.error(err);
    }

    const filesArr = [];
    files.forEach(function(file) {
      filesArr.push({name: file});
    });

    res.json(filesArr);
  });
});

app.listen(3001, function(err) {
  if (err) {
    return console.log(err);
  }

  console.log("API Server is listening on http://localhost:3001 ");
});