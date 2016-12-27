var express = require('express');
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var db = require('./db');
var jsonServer = require('json-server');


//var router = jsonServer.router('db.json')






// Configure the Basic strategy for use by Passport.
//
// The Basic strategy requires a `verify` function which receives the
// credentials (`username` and `password`) contained in the request.  The
// function must verify that the password is correct and then invoke `cb` with
// a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));


// Create a new Express application.
//var app = express();
var server = express();


// Configure Express application.
server.use(express.logger());

server.get('/',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.json({ username: req.user.username, email: req.user.emails[0].value });
  });

server.use('/api', jsonServer.router('../../database/db.json'));

//configura json-server
server.get('/api*',
  passport.authenticate('basic', { session: false }));

server.listen(3000, '0.0.0.0', function () {
  console.log('JSON Server is running')
});

