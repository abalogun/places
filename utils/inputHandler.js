const chalk = require('chalk');
const { theme } = require('./display');
const _ = require('underscore');
const { fetchAllNames } = require('./controller');


const printer = {
  print_rawCode: null,
  print_dataObj: null,
};

const shortcuts = {
  a: 'austin, tx',
  s: 'seattle, wa',
  d: 'denver, co',
  f: 'san francisco, ca',
  g: 'long beach, ca',
  h: 'houston, tx',
  j: 'salt lake city, ut',
  c: 'colorado springs, co',
  k: 'dallas, tx',
  l: 'los angeles, ca',
  n: 'new york, ny',
  b: 'billings, mt',
  y: 'yucaipa, ca'
}


const handleInput = (...input) => {

  let prefix = input[0].slice(0, 4);
  let namesArr = [];

  //EXIT conditions
  if (!prefix || prefix.toUpperCase() === 'EXIT') {
    console.log(chalk.rgb(...theme.errorColors)('Exiting'));
    return;
  }


  // pre filters
  if (input[0].indexOf(',') === -1) {
    if (!_.contains(['EXIT', 'ALL', 'TEST', ...Object.keys(shortcuts), ''], prefix)) {
      console.log(chalk.rgb(...theme.errorColors)('Invalid entry'));
      return;
    }
  }

  //quick case
  if (_.contains(Object.keys(shortcuts), input[0])) {
    input[0] = shortcuts[input[0]];
  }

  //other conditions
  if (prefix.toUpperCase() === 'ALL') {
    printer.print_rawCode = false;
    printer.print_dataObj = false;
    console.log();
    fetchAllNames();
    return;
  } else if (prefix.toUpperCase() === 'TEST') {
    printer.print_rawCode = true;
    printer.print_dataObj = false;
    input = [input[0].replace(/\bTEST \b/, '')];
  } else {
    printer.print_rawCode = false;
    printer.print_dataObj = true;
  }

  namesArr = input;
  namesArr.printer = printer; //tack this on to the array object
  return namesArr;
}



module.exports = handleInput;