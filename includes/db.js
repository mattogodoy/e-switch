var firebase = require('firebase');
firebase.initializeApp({
    apiKey: "AIzaSyDQRMT9N_JwyunPiCWUIYxPIl4_TgHVRRU",
    authDomain: "smartthings-2f0b3.firebaseapp.com",
    databaseURL: "https://smartthings-2f0b3.firebaseio.com",
    storageBucket: "smartthings-2f0b3.appspot.com",
    messagingSenderId: "236639005563"
  });
var db = firebase.database();

module.exports = db;