'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models/index');
const op = db.Sequelize.Op;

const config = require('../config/config')
const rules = require('../rules/products')
const auth = require('../services/auth')

const ca_products = require('../models/').ca_products;

async function getProducts(req, res) {

    try {

        const usr = auth.decodeAuth(req);

        const rows = await ca_products.findAll({
            where: {
                userId: usr.id
            },
            raw: true
        });

        return res.status(200).json(rows)
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

async function createProduct(req, res) {

    let transaction
    let json = {}

    try {

        const usr = auth.decodeAuth(req);

        const rule = rules.createProduct(req)
        if (rule.codigo != 0) {
            json.mensaje = rule.mensaje
            return res.json(json)
        }

        transaction = await db.sequelize.transaction();

        const newProduct = await ca_products.create({
            userId: usr.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        }, transaction)


        if (!newProduct) {
            await transaction.rollback();
            return res.status(400).send({
                mensaje: 'Lo sentimos, no fue posible crear el producto.',
            });
        }

        await transaction.commit();

        return res.status(200).json({ message: `Producto creado con éxito, productId: ${newProduct["dataValues"].id}` })
    } catch (error) {
        console.error(error);
        await transaction.rollback();
        return res.status(500);
    }
}

async function updateProduct(req, res) {

    let transaction
    let json = {}

    try {

        const usr = auth.decodeAuth(req);

        const rule = rules.updateProduct(req)
        if (rule.codigo != 0) {
            json.mensaje = rule.mensaje
            return res.json(json)
        }

        transaction = await db.sequelize.transaction();

        const updateProduct = await ca_products.update(
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
            },
            {
                where: {
                    id: req.params.id,
                    userId: usr.id
                }, transaction
            }
        )

        if (!updateProduct || updateProduct[0] != 1) {
            await transaction.rollback();
            return res.status(400).send({
                mensaje: 'Lo sentimos, no fue posible actualizar el producto.',
            });
        }

        await transaction.commit();

        return res.status(200).json({ message: "Producto actualizado con éxito" })
    } catch (error) {
        console.error(error);
        await transaction.rollback();
        return res.status(500);
    }
}

async function deleteProduct(req, res) {

    let transaction
    let json = {}

    try {

        const usr = auth.decodeAuth(req);

        const rule = rules.deleteProduct(req)
        if (rule.codigo != 0) {
            json.mensaje = rule.mensaje
            return res.json(json)
        }

        transaction = await db.sequelize.transaction();

        const deleteProduct = await ca_products.destroy({
            where: {
                id: req.params.id,
                userId: usr.id
            }, transaction
        })

        if (!deleteProduct) {
            await transaction.rollback();
            return res.status(400).send({
                mensaje: 'Lo sentimos, no fue posible eliminar el producto.',
            });
        }

        await transaction.commit();

        return res.status(200).json({ message: "Producto eliminado con éxito" })

    } catch (error) {
        console.error(error);
        await transaction.rollback();
        return res.status(500);
    }
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}