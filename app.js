const prompt = require('prompt');
const { sync } = require('./db/db');
const { promptProps } = require('./utils/display');
const main = require('./utils/main');
const handleInput = require('./utils/input_handler');

//have up to 6 comparison cities
const comparisons = [
  'san francisco, ca',
  'austin, tx',
  'seattle, wa',
  'washington, dc',
  'denver, co',
  'new york, ny'
];

const runApplication = (() => {
  sync();
  prompt.message = '';
  prompt.start();
  prompt.get(promptProps, (err, result) => main(handleInput(result.place, ...comparisons)));
})();