'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models/index');
const op = db.Sequelize.Op;

const config = require('../config/config')
const rules = require('../rules/users')
const auth = require('../services/auth')

const ca_users = require('../models/').ca_users;
const ca_products = require('../models/').ca_products;

async function getUsers(req, res) {

    try {

        const rows = await ca_users.findAll({
            raw: true
        });

        return res.status(200).json(rows)
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

async function createUser(req, res) {

    let transaction
    let json = {}

    try {

        const rule = rules.createUser(req)
        if (rule.codigo != 0) {
            json.mensaje = rule.mensaje
            return res.json(json)
        }

        const repeat_username = await ca_users.findOne({
            where: {
                username: req.body.username,
            },
            raw: true
        })

        if (repeat_username) {
            return res.status(409).json({ mensaje: 'Lo sentimos, el username no se encuentra disponible.' })
        }

        const repeat_email = await ca_users.findOne({
            where: {
                email: req.body.email,
            },
            raw: true
        })

        if (repeat_email) {
            return res.status(409).json({ mensaje: 'Lo sentimos, el correo ya se encuentra registrado.' })
        }

        const salt = await bcrypt.genSalt(10);
        const password_crypted = await bcrypt.hash(req.body.password, salt);

        transaction = await db.sequelize.transaction();

        const newUser = await ca_users.create({
            username: req.body.username,
            password: password_crypted,
            email: req.body.email,
        }, transaction)

        if (!newUser) {
            await transaction.rollback();
            return res.status(400).send({
                mensaje: 'Lo sentimos, no fue posible crear al usuario.',
            });
        }

        await transaction.commit();

        return res.status(200).json({ message: "Usuario registrado con éxito" })
    } catch (error) {
        console.error(error);
        await transaction.rollback();
        return res.status(500);
    }
}

async function login(req, res) {

    let json = {}

    try {

        const rule = rules.login(req)
        if (rule.codigo != 0) {
            json.mensaje = rule.mensaje
            return res.json(json)
        }

        const user = await ca_users.findOne({
            where: {
                username: req.body.username,
            },
            raw: true
        })

        let match = undefined;
        if (user) {
            match = await bcrypt.compare(req.body.password, user.password);
        }

        if (!user || !match) {
            return res.status(401).json({ mensaje: 'Usuario y/o contraseña incorrecto.' })
        }

        const usr = {
            id: user.id,
            email: user.email,
            username: user.username
        }

        const token = jwt.sign(usr, config.token_secret, { expiresIn: '24h' });

        return res.status(200).json({ token })

    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

async function updateUser(req, res) {

    let transaction
    let json = {}

    try {

        const rule = rules.updateUser(req)
        if (rule.codigo != 0) {
            json.mensaje = rule.mensaje
            return res.json(json)
        }

        transaction = await db.sequelize.transaction();

        const updateUser = await ca_users.update(
            {
                username: req.body.username,
                email: req.body.email,
            },
            {
                where: {
                    id: req.params.id
                }, transaction
            }
        )

        if (!updateUser || updateUser[0] != 1) {
            await transaction.rollback();
            return res.status(400).send({
                mensaje: 'Lo sentimos, no fue posible actualizar al usuario.',
            });
        }

        await transaction.commit();

        return res.status(200).json({ message: "Usuario actualizado con éxito" })
    } catch (error) {
        console.error(error);
        await transaction.rollback();
        return res.status(500);
    }
}

async function deleteUser(req, res) {

    let transaction
    let json = {}

    try {

        const usr = auth.decodeAuth(req);

        const rule = rules.deleteUser(req)
        if (rule.codigo != 0) {
            json.mensaje = rule.mensaje
            return res.json(json)
        }

        transaction = await db.sequelize.transaction();

        const deleteProducts = await ca_products.destroy({
            where: {
                userId: usr.id
            }
        });

        if (!deleteProducts) {
            await transaction.rollback();
            return res.status(400).send({
                mensaje: 'Lo sentimos, no fue posible eliminar al usuario.',
            });
        }

        const deleteUser = await ca_users.destroy({
            where: {
                id: req.params.id
            }, transaction
        })

        if (!deleteUser) {
            await transaction.rollback();
            return res.status(400).send({
                mensaje: 'Lo sentimos, no fue posible eliminar al usuario.',
            });
        }

        await transaction.commit();

        return res.status(200).json({ message: "Usuario eliminado con éxito" })

    } catch (error) {
        console.error(error);
        await transaction.rollback();
        return res.status(500);
    }
}

module.exports = {
    getUsers,
    createUser,
    login,
    updateUser,
    deleteUser
}