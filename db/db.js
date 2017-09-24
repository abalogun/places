const sqlite = require('sqlite3');
const Sequelize = require('sequelize');
const path = require('path');
const colors = require('colors');
const { makeDataObj } = require('../utils/dataObj_maker');


const db = new Sequelize('places', 'root', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  pool: { max: 5, min: 0, idle: 10000 },
  storage: path.join(__dirname, 'places.db'),
  logging: false,
});


const makeRawSchema = () => {
  let obj = {};
  obj.PLACE_ID = { type: Sequelize.TEXT, allowNull: false }
  obj.HTML = { type: Sequelize.TEXT, allowNull: true }
  obj.LEN = { type: Sequelize.INTEGER, allowNull: true }
  return obj;
}


const Raw = db.define('raw', makeRawSchema());


const sync = () => {
  Raw.sync({ force: false })
};


module.exports = {
  Raw: Raw,
  sync: sync
}
