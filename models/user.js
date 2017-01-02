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

// User.findById = function (id, callback) {  
//   db.get('users', {id: id}).run(function (err, data) {
//     if (err) return callback(err);
//     callback(null, new User(data));
//   });
// }

User.prototype.passwordIsValid = function () {  
  return true;
}

module.exports = User;