const chalk = require('chalk');
const { colors } = require('./display');
const _ = require('underscore');
const { fetchAllNames } = require('./controller');


const printer = {
  print_rawCode: null,
  print_dataObj: null,
};


const handleInput = (...input) => {

  let prefix = input[0].slice(0, 4);
  let namesArr = [];

  //EXIT conditions
  if (!prefix || prefix.toUpperCase() === 'EXIT') {
    console.log(chalk.rgb(...colors.errorColors)('Exiting'));
    return;
  }


  // pre filters
  if (input[0].indexOf(',') === -1) {
    if (!_.contains(['EXIT', 'ALL', 'TEST', 'g', ''], prefix)) {
      console.log(chalk.rgb(...colors.errorColors)('Invalid entry'));
      return;
    }
  }

  //quick case
  if (input[0] === 'g') {
    input[0] = 'los angeles, ca'
  }

  //other conditions
  if (prefix.toUpperCase() === 'ALL') {
    printer.print_rawCode = false;
    printer.print_dataObj = false;
    console.log();
    fetchAllNames();
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