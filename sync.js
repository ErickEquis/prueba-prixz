const { sequelize } = require('./server/models');

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Base de datos sincronizada');
    } catch (error) {
        console.error('Error sincronizando la base de datos:', error);
    } finally {
        await sequelize.close();
    }
})();