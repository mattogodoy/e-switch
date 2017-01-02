var Thing = function (data) {
  /* === STRUCTURE ===
  id: Unique ID
  user_id: Owner's unique ID
  name: Thing name given by user
  status: Current status. Valid values: ['on', 'off']
  type: Type of thing. Valid values: ['light_switch']
  ==================== */

  this.data = data;
}

Thing.prototype.data = {};

// === SETTERS ===
Thing.prototype.setUserId = function (userId) {  
  this.data.userId = userId;
}

Thing.prototype.setName = function (name) {  
  this.data.name = name;
}

Thing.prototype.setStatus = function (status) {  
  this.data.status = status;
}

Thing.prototype.setType = function (type) {  
  this.data.type = type;
}

// === GETTERS ===
Thing.prototype.getUserId = function () {  
  return this.data.userId;
}

Thing.prototype.getName = function () {  
  return this.data.name;
}

Thing.prototype.getStatus = function () {  
  return this.data.status;
}

Thing.prototype.getType = function () {  
  return this.data.type;
}

// === METHODS ===
Thing.prototype.isActive = function () {  
  return true;
}