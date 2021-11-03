const Sequelize = require('sequelize');
require("dotenv").config();

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

const sequelize = new Sequelize(process.env.DB_CONN_DB, process.env.DB_CONN_USER, process.env.DB_CONN_PW, {
    host: process.env.DB_CONN_HOST,
    port: process.env.DB_CONN_PORT,
    dialect: "mssql",
    define: {
        freezeTableName: true,
        timestamps: true,
        updatedAt: 'change_time',
        createdAt: 'create_time'
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
    }
});

sequelize.authenticate().then(function () {
    console.log("🚀")
}).catch(function (err) {
    console.log(err)
});

module.exports = sequelize