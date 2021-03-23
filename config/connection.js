const Sequelize = require(Sequelize)

require ('dotenv').config();

let Sequelize;

if (process.env.JAWSDB_URL) {
    Sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = Sequelize;