'use strict'

module.exports = (sequelize, DataTypes, Deferrable) => {

    let ca_users = sequelize.define(
        'ca_users',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            charset: 'UTF8',
            timestamps: true,
            createdAt: true,
            updatedAt: true,
        }
    );

    return ca_users;
};
