'use strict';

const config = require('../config/config')
const auth = require('../services/auth')
const products = require('../controllers/products')

module.exports = (app) => {
    app.get(`${config.api.base_api}/products`, auth.ensureAuth, products.getProducts);
    app.post(`${config.api.base_api}/products`, auth.ensureAuth, products.createProduct);
    app.put(`${config.api.base_api}/products/:id`, auth.ensureAuth, products.updateProduct);
    app.delete(`${config.api.base_api}/products/:id`, auth.ensureAuth, products.deleteProduct);
}