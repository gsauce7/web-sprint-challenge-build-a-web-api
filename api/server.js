const express = require('express');
const server = express();
// const { logger, validate...} = require('./middleware/middleware');
// const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

// give your server the ability to parse JSON in request bodies
server.use(express.json())
// connect global middleware and the routes
// server.use(logger, validateXyz, validateOneTwoThree, validateThis)
// server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Why is this here? Maybe I will delete it..</h2>`);
})

module.exports = server;
