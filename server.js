//var express = require('express');
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var db = require('./db');
var jsonServer = require('json-server');
var server = jsonServer.create()
var router = jsonServer.router('database/db.json');
var middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

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
//var server = express();


// Configure Express application.
//server.use(express.logger());

server.use(
  passport.authenticate('basic', { session: false }),
  function(req, res, next) {
    if (req.isAuthenticated())
      next();
    else
      res.sendStatus(401);
  });

/*server.use(passport.authenticate('basic', { session: false }),
  function(req, res, next) {
    if (req.isAuthenticated())
      next();
    else
      res.sendStatus(401);
  });*/

//configura json-server
server.use(router);
server.listen(3000, '0.0.0.0', function () {
  console.log('JSON Server is running')
});

