'use strict';

const config = require('../config/config')
const auth = require('../services/auth')
const users = require('../controllers/users')

module.exports = (app) => {
    app.get(`${config.api.base_api}/users`, auth.ensureAuth, users.getUsers);
    app.post(`${config.api.base_api}/users`, users.createUser);
    app.post(`${config.api.base_api}/login`, users.login);
    app.put(`${config.api.base_api}/users/:id`, auth.ensureAuth, users.updateUser);
    app.delete(`${config.api.base_api}/users/:id`, auth.ensureAuth, users.deleteUser);
}