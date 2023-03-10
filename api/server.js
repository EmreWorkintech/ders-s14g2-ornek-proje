const express = require('express');
// const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());

// server.use(morgan('dev'));

function slithy(req, res, next) {
  // console.log(req.method, req.originalUrl);
  req.jabberwocky = 'slithy toves';
  next();
}

// server.use(slithy, jubjub);

server.use('/api/hubs', hubsRouter);

server.get('/', slithy, (req, res) => {

  console.log(req.jabberwocky);
  console.log(req.jubjub);

  res.send(`
    <h2>Hubs API</h2>
    <p>Welcome to the Hubs API</p>
  `);
});

server.use('*', (req, res) => {
  // catch all: 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

server.use((err, req, res, next) => {
  // error middleware
  let { status = 500, message = 'internal server error' } = err;
  res.status(status).json({ message: message });
});

module.exports = server;
