const chalk = require('chalk');
const _ = require('underscore');

//theme
const theme = {
  promptColors: [237, 98, 75],
  labelColors: [255, 255, 255],
  primColors: [237, 98, 75],
  compColors: [255, 255, 255],
  noteColors: [155, 204, 204],
  gapColors: [100, 100, 100],
  spaceColors: [100, 100, 100],
  requestColors: [155, 204, 204],
  errorColors: [175, 64, 71]
};


const promptProps = { properties: { place: { description: chalk.rgb(...theme.promptColors)('Name the place ==>') }, } }

const displayData = (places, printer) => {

  console.log();

  if (printer.print_rawCode) {
    places.forEach(p => console.log(chalk.rgb(...theme.spaceColors)(p.rawCode)));
  }

  if (printer.print_dataObj) {

    let primary = places[0];
    let { breaks, ignore } = primary;
    let labels = Object.keys(primary);
    let notes = primary.notes;
    let maxLabelLen = Math.max(null, ...labels.map(label => label.length));
    let maxPlaceLen = Math.max(null, ...places.map(place => place.nameObj.cityProper.length));

    labels.forEach((label, i) => {
      if (!_.contains(ignore, label)) {
        let line = ``;
        let isHeading = !primary[label];
        let hasBreak = !primary[labels[i + 1]];
        let symb = isHeading ? ` ` : `.`;
        let lab = label.replace(/_/g, ` `);
        let gap;
        lab = isHeading ? chalk.underline.rgb(...theme.labelColors)(lab) : chalk.rgb(...theme.labelColors)(lab);
        gap = `  ${symb.repeat(maxLabelLen - label.length)}`;
        gap = chalk.rgb(...theme.gapColors)(gap);

        line += lab + gap;

        places.forEach((place, j) => {
          let isPrimary = j === 0 ? true : false;
          let data = place[label] || place.nameObj.cityProper;
          let space;
          space = `${symb.repeat(Math.max(12, maxPlaceLen + 2) - data.length)} `;
          space = isPrimary ? space : '  ' + space; //smooths output with labels
          space = chalk.rgb(...theme.spaceColors)(space);
          data = data.replace(/_/g, ` `);
          data = isPrimary ? chalk.rgb(...theme.primColors)(data) : chalk.rgb(...theme.compColors)(data);
          data = isHeading ? chalk.underline.rgb(...theme.primColors)(data) : data;

          line += space + data;
        });

        if (!_.contains(ignore, label)) { console.log(line, hasBreak ? '\n' : ''); }
      }
    });
    notes = chalk.rgb(...theme.noteColors)(notes);
    console.log(notes);
  }
};


module.exports = {
  promptProps: promptProps,
  displayData: displayData,
  theme: theme
}