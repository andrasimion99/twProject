const { stateController } = require('../controllers/index')

const routes = [
    {
        method: 'GET',
        path: '/data',
        handler: stateController.getAllStatesData.bind(stateController)
    },
];

module.exports = routes;