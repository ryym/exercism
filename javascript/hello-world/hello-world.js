var HelloWorld = function() {};

HelloWorld.prototype.hello = function(name) {
  return 'Hello, ' + (name || 'World') + '!';
};

module.exports = HelloWorld;