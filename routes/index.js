/* eslint-disable global-require */
function initiateRoutes(app) {
    app.get('/ping', (req, res) => {
        res.send('pong');
    });

    app.use('/auth', require('./auth'));
    app.use('/garages', require('./garages'));
}

module.exports = initiateRoutes;
