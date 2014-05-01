// Add the route
module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.view('home');
    }
  }
];
