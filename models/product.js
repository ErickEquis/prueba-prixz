'use strict'

module.exports = (sequelize, DataTypes, Deferrable) => {

    let ca_products = sequelize.define(
        'ca_products',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            userId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'ca_users',
                    key: 'id',
                    deferrable: Deferrable.INITIALLY_IMMEDIATE
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
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

    ca_products.associate = (models) => {
        ca_products.belongsTo(models.ca_users, {
            foreignKey: 'userId',
            as: 'user'
        });
    };

    return ca_products;
};
