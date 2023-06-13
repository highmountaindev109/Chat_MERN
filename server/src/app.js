require('dotenv').config();

const http = require('http');
const https = require("https");
const { join } = require('path');

const express = require('express');
const socketIO = require('socket.io');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const dbConnection = require('./database/dbConnection');
const router = require('./router');
const ioHandler = require('./io');
const { verifyToken } = require('./utils');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.disabled('x-powered-by');
// app.enable('trust proxy');
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '..', '..', 'client', 'build')));
    app.all('*', (req, res) =>
        res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'))
    );
}

io.use(async (socket, next) => {
    try {
        const token = (socket.request.headers.cookie + ';').match(/(?<=token=)(.*?)(?=;)/)[0];
        const decoded = await verifyToken(token);
        // eslint-disable-next-line no-param-reassign
        socket.decoded = decoded;
        socket.join(decoded._id);
        next();
    } catch (err) {
        next(new Error('Authentication error'));
    }
}).on('connection', ioHandler(io));

module.exports = { server, app, dbConnection };
