const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('../middleware/restricted-endpoint');

const authRouter = require('./auth/auth-router');
const potluckRouter = require('./potluck/potluck-router');
const foodRouter = require('./food/food-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/potluck', potluckRouter)
server.use('/api/food', foodRouter)

server.get("/", (req, res) => {
    res.json({ api: "api is running!"})
})

module.exports = server;