var fs = require('fs'),
    path = require('path'),
    async = require('async'),
    hapi = require('hapi');

var port = process.env.PORT || 8000;
var config = {
    };

// Create a server with a host and port
var server = new hapi.Server(port, config);

server.views({
  engines: {
    jade: 'jade'
  },
  path: path.join(__dirname, 'app', 'view'),
  layout: true,
  isCached: false
});

// Load Models
function loadModels(callback) {
  callback();
}

// Load Controllers
function loadControllers(callback) {
  var controllers = path.join(__dirname, 'app', 'controller');

  fs.readdir(controllers, function (err, files) {
    if (err) {
      return callback(err);
    }

    files.forEach(function (controller) {
      var routes = require(path.join(controllers, controller));
      server.route(routes);
    });

    callback();
  });
}

async.series([
  loadModels,
  loadControllers,
], function (err) {
  if (err) {
    throw new Error(err);
  }

  server.start();
});
