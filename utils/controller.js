const chalk = require('chalk');
const { colors } = require('./display');
const { Raw } = require('../db/db');


const fetchAllNames = () => {
  const plainName = (placeId) => placeId.split('-').map(p => p.replace(/\+/g, ' ')).join(', ');
  const stripName = (respArr) => respArr.map(r => plainName(r.dataValues.PLACE_ID));

  return Raw
    .findAll({ attributes: ['PLACE_ID'], order: ['PLACE_ID'] })
    .then(resp => resp ? stripName(resp) : null)
    .then(names => names.forEach((n, i) => console.log(i + 1, n)))
    .catch(err => console.log(chalk.rgb(...colors.errorColors)(`ERROR findAllRaw...`)));
};

const findRaw = (nameObj) => {
  return Raw
    .findOne({ where: { PLACE_ID: nameObj.placeId } })
    .then(resp => resp ? resp.dataValues.HTML : null)
    .catch(err => console.log(chalk.rgb(...colors.errorColors)(`ERROR findRaw for ${nameObj.full}...`)));
};

const insertRaw = (nameObj, rawCode) => {
  if (!rawCode) { return 'NOPE' }

  const defaultObj = {};
  defaultObj.PLACE_ID = nameObj.id;
  defaultObj.HTML = rawCode;
  defaultObj.LEN = rawCode.length || null;

  return Raw
    .findOrCreate({ where: { PLACE_ID: nameObj.placeId }, defaults: defaultObj })
    .spread(resp => resp.dataValues.HTML)
    .catch(err => console.log(chalk.rgb(...colors.errorColors)(`ERROR InsertRaw for ${nameObj.full}...`)));
};



module.exports = {
  fetchAllNames: fetchAllNames,
  findRaw: findRaw,
  insertRaw: insertRaw
}
