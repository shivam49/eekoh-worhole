'use strict';

var fs = require('fs'),
    path = require('path'),
    async = require('async'),
    hapi = require('hapi');

var port = process.env.PORT || 8000;
var config = {
	debug: {
		request: [ 'error' ]
	},
	files: {
		relativeTo: __dirname
	}
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

    async.each(files, function (controller, cb) {
      var routes = require(path.join(controllers, controller));
      server.route(routes);
      cb();
    }, callback);
  });
}

async.series([
  loadModels,
  loadControllers,
], function (err) {
  if (err) {
    throw new Error(err);
  }

  server.start(function () {
		if (process.send) {
			process.send('online');
		}
	});
});
