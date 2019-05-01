const http = require('http');
const app = require('./app');
const config = require('config');

const HTTP_PORT = config.get('app.port');

global.Promise = require('bluebird');

process.on('uncaughtException', (error) => {
    console.log('some error occured', error.message);
});


/**
 * normalize port to number, string or false value
 * @param {*} val 
 */
function normalizePort(val) {
    const port = parseInt(val);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >=0 ) {
        // port number
        return port
    }
    return false;
}

// normalize port
const port = normalizePort(HTTP_PORT);

// set port on express() object.
app.set('port', port);

// create server
const server = http.createServer(app);
server.listen(port);

server.on('listening', () => {
    // get address info (address, family,port )
    const address = server.address();
    const bind = typeof address === 'string'?`pipe ${address}`: `port ${address.port}`;
    console.log(`Listening on ${bind}`);
});

server.on('error', (error) => {
    console.log(`error while creating server`, error.message);
    process.exit(1);
});
