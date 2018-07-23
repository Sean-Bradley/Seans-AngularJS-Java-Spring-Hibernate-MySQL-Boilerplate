const express = require('express');
//const path = require('path');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');

//var mongoose = require('mongoose');
//mongoose.connect('mongodb://mongodb:27017/seanwasere', { useNewUrlParser: true });

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csurf({ cookie: true, value: (req) => (req.cookies.csrfToken) }));
app.use(function(req, res, next) {
    res.cookie('csrfToken', req.csrfToken ? req.csrfToken() : null, { sameSite: true, httpOnly: true });
    next();
  });
//app.use(express.static(path.join(__dirname, 'www')));

//var catsRouter = require('./routes/cats');
//app.use('/', catsRouter);


app.listen(port);

console.log('nodejs server started : \nhttp://nodejs:' + port);

