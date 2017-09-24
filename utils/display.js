const chalk = require('chalk');
const _ = require('underscore');

//colors
const colors = {
  promptColors: [217, 123, 63],
  labelColors: [189, 73, 23],
  primColors: [210, 196, 137],
  compColors: [191, 135, 37],
  dotColors: [100, 100, 100],
  requestColors: [163, 230, 195],
  errorColors: [175, 64, 71]
};


const promptProps = { properties: { place: { description: chalk.rgb(...colors.promptColors)('Name the place ==>') }, } }


const displayData = (data, printer) => {
  console.log();

  if (printer.print_rawCode) {
    data.forEach(p => console.log(chalk.rgb(...colors.dotColors)(p.rawCode)));
  }

  if (printer.print_dataObj) {

    const primary = data[0];
    const comparisons = data.slice(1);

    const ignore = primary ? primary.ignore : null;
    const breaks = primary ? primary.breaks : null;
    let count = 0;

    for (let k in primary) {
      //for primary
      let key = k ? k.replace(/\_/g, ` `) : '';
      let val = k && typeof primary[k] === 'string' ? primary[k].replace(/\_/g, ` `) : '';
      let space = ' ';
      while (space.length + key.length + val.length + 2 < 38) { space += `.`; }

      let line = `${chalk.bold.rgb(...colors.labelColors)(key)} ${chalk.rgb(...colors.dotColors)(space)} ${chalk.rgb(...colors.primColors)(val)}`;

      // for comparisons
      comparisons.forEach(comp => {
        let cval = typeof primary[k] === 'string' ? comp[k].replace(/\_/g, ` `) : '';
        let cspace = `  `;
        while (cspace.length + cval.length + 1 < 18) { cspace += `.`; }
        line += `${chalk.rgb(...colors.dotColors)(cspace)} ${chalk.rgb(...colors.compColors)(cval)}`;
      });

      if (!_.contains(ignore, k)) {
        console.log(line); //str
        if (_.contains(breaks, k)) {
          console.log();
        }
      }
      count++;
    }
  }
};


module.exports = {
  promptProps: promptProps,
  displayData: displayData,
  colors: colors
}