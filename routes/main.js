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
    res.render('login');
  })
  .post(urlencode, function(req, res){
    if(req.body.email == 'a@a.com' && req.body.password == 'admin'){
      req.session.user = new User({
        id: 1,
        name: 'John Doe',
        email: req.body.email,
        password: req.body.password
      });

      res.json({result: 'ok'});
    } else {
      res.json({error: 'Invalid email / password combination'});
    }
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
    req.session.test = 'yes';
    if(req.session.user){ 
      console.log(req.session.user.data);
      res.render('dashboard');
    } else {
      res.redirect('/login');
    }
  });

module.exports = router;
