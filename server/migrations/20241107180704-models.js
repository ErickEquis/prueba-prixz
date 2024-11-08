'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('ca_users', {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
      {
        charset: 'UTF8',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
      }
    )

    await queryInterface.createTable('ca_products', {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      userId: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: {
            tableName: 'ca_users',
          },
          key: 'id',
        },
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false,
      },
    },
      {
        charset: 'UTF8',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
      }
    )

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
