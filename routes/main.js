var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });
var User = require('../models/user');

// router.route('*')
//   .get(function(req, res, next){
//     req.session.lastPage = req.url;
//     next();
//   });

router.route('/')
  .get(function(req, res){
    res.render('index', { test: req.session.test || 'null' });
  });

router.route('/login')
  .get(function(req, res){
    if(req.session.user){ 
      res.redirect('/dashboard');
    } else {
      res.render('login');
    }
  })
  .post(urlencode, function(req, res){
    var user = new User({
      email: req.body.email,
      password: req.body.password
    });

    user.login(function(err, data){
      if (err){
        res.json({ error: err });
      } else {
        req.session.user = user;
        res.json({result: 'ok'});
      }
    });
  });

router.route('/logout')
  .get(function(req, res){
    req.session.destroy(function(err) {
      res.redirect('/login');
    });
  });

router.route('/register')
  .get(function(req, res){
    res.render('register');
  });

router.route('/dashboard')
  .get(function(req, res){
    if(req.session.user){ 
      res.render('dashboard');
    } else {
      res.redirect('/login');
    }
  });

module.exports = router;
