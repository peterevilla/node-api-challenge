const express = require('express');
const projectRoutes = require('./routes/projectRoutes')
const actionRoutes = require('./routes/actionRoutes')
const server = express();
server.use(express.json())
server.use(logger)
server.use('/api/projects', projectRoutes)
server.use('/api/actions', actionRoutes)

server.get('/', (req, res) => {
    res.send(`<h2>This is Node Spring Challenge</h2>`);
  });






/////////Logger 

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`)
    next()
  }
module.exports = server;