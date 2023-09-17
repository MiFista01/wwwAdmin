const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("portfolio","root","",{host: "localhost", dialect:"mysql"})
module.exports = sequelize