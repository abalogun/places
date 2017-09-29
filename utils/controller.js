const chalk = require('chalk');
const { theme } = require('./display');
const { Raw } = require('../db/db');


const fetchAllNames = () => {
  const plainName = (placeId) => placeId.split('-').map(p => p.replace(/\+/g, ' ')).join(', ');
  const stripName = (respArr) => respArr.map(r => plainName(r.dataValues.PLACE_ID));

  return Raw
    .findAll({ attributes: ['PLACE_ID'], order: ['PLACE_ID'] })
    .then(resp => resp ? stripName(resp) : null)
    .then(names => names.forEach((n, i) => console.log(i + 1, n)))
    .catch(err => console.log(chalk.rgb(...theme.errorColors)(`ERROR findAllRaw...`)));
};

const findRaw = (nameObj) => {
  return Raw
    .findOne({ where: { PLACE_ID: nameObj.placeId } })
    .then(resp => resp ? resp.dataValues.HTML : null)
    .catch(err => console.log(chalk.rgb(...theme.errorColors)(`ERROR findRaw for ${nameObj.full}...`, err)));
};

const insertRaw = (nameObj, rawCode) => {
  if (!rawCode) { return }

  const defaultObj = {};
  defaultObj.PLACE_ID = nameObj.placeId;
  defaultObj.HTML = rawCode;
  defaultObj.LEN = rawCode.length;

  return Raw
    .findOrCreate({ where: { PLACE_ID: nameObj.placeId }, defaults: defaultObj })
    .spread((code, created) => code.dataValues.HTML)
    .catch(err => err ? setTimeout(() => (insertRaw(nameObj, rawCode)), 0) : null) //fixes db being busy from simultaneous inserts
    .then(resp => rawCode)
    .catch(err => console.log(chalk.rgb(...theme.errorColors)(`ERROR InsertRaw for ${nameObj.full}...`, err)));
};



module.exports = {
  fetchAllNames: fetchAllNames,
  findRaw: findRaw,
  insertRaw: insertRaw
}
