const makeNameObj = require('./nameObj_maker');
const { fetchAllNames, findRaw, insertRaw } = require('./controller');
const makeDataObj = require('./dataObj_maker');
const fetchAllHtml = require('./request_maker');
const { displayData } = require('./display');


const main = (namesList) => {
  if (!namesList) { return }

  let counter = 1;
  const dataObjs = [];

  namesList.forEach((name, i, a) => {
    let obj = { nameObj: makeNameObj(name) }; //fx call
    findRaw(obj.nameObj) //async call
      .then(rawCode => rawCode ? rawCode : fetchAllHtml(obj.nameObj)) //async call
      .then(rawCode => insertRaw(obj.nameObj, rawCode)) //async call
      .then(rawCode => dataObjs[i] = Object.assign(obj, makeDataObj(obj.nameObj, rawCode))) //fx call
      .then(() => a.length === counter ? displayData(dataObjs, namesList.printer) : counter++) //fx call
      .catch(err => console.log('err with main::', err));
  })
}



module.exports = main;