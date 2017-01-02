var util = require('../includes/util');
var db = require('../includes/db');
var userRef = db.ref('/users');

// var firebase = require('firebase');
// firebase.initializeApp({
//     apiKey: "AIzaSyDQRMT9N_JwyunPiCWUIYxPIl4_TgHVRRU",
//     authDomain: "smartthings-2f0b3.firebaseapp.com",
//     databaseURL: "https://smartthings-2f0b3.firebaseio.com",
//     storageBucket: "smartthings-2f0b3.appspot.com",
//     messagingSenderId: "236639005563"
//   });

var User = function (data) {
  /* === STRUCTURE ===
  id: Unique ID
  name: User's full name
  email: Email address
  password: MD5 encrypted password
  ==================== */

  this.data = data;
}

User.prototype.data = {};

// === SETTERS ===
User.prototype.setName = function (name) {  
  this.data.name = name;
}

User.prototype.setEmail = function (email) {  
  this.data.email = email;
}

User.prototype.setPassword = function (password) {  
  this.data.password = password;
}

User.prototype.setLastAccess = function (lastAccess) {  
  this.data.lastAccess = lastAccess;
}

// === GETTERS ===
User.prototype.getName = function () {  
  return this.data.name;
}

User.prototype.getEmail = function () {  
  return this.data.email;
}

User.prototype.getLastAccess = function () {  
  return this.data.lastAccess;
}

// === METHODS ===
User.prototype.passwordIsValid = function () {  
  return true;
}

User.prototype.getAll = function () {
  userRef.once('value', function(snapshot) {
    console.log(snapshot.val());
  }, function(error) {
    console.error(error);
  });
}

User.prototype.findByEmail = function (email, callback) {  
  userRef
    .orderByChild('email')
    .startAt(email)
    .endAt(email)
    .once('value', function(snapshot) {
      var user = util.firstChild(snapshot.val());
      
      callback(null, user);
    }, function(error) {
      callback(error, null);
    });
}

User.prototype.login = function (callback) {
  var self = this;

  userRef
    .orderByChild('email')
    .startAt(self.data.email)
    .endAt(self.data.email)
    .once('value', function(snapshot) {
      var user = util.firstChild(snapshot.val());

      if(user.email == self.data.email && user.password == self.data.password){
        self.data.id = user.id;
        self.data.name = user.name;
        self.data.email = user.email;
        self.data.password = user.password;

        callback(null, user);
      } else {
        callback('Wrong username / password', null);
      }

    }, function(error) {
      callback(error, null);
    });
}

module.exports = User;
