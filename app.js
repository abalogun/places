const prompt = require('prompt');
const { sync } = require('./db/db');
const { promptProps } = require('./utils/display');
const main = require('./utils/main');
const handleInput = require('./utils/inputHandler');
const comparisons = require('./comparisons');

const runApplication = (_ => {
  sync();
  prompt.message = '';
  prompt.start();
  prompt.get(promptProps, (err, result) => main(handleInput(result.place, ...comparisons)));
})();