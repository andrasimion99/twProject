const http = require('http');

const { router } = require('./router');
const { routes } = require('./router');

process.on('uncaughtException', function(err) {
    console.log('uncaughtException');
    console.error(err.stack);
    console.log(err);
});


const server = http.createServer(async (req, res) => {
    await router(req, res, routes);
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});