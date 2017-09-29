
const tester = (testMode, makeNameObj, makeDataObj, treatHtml, treatData) => {
  let testCode = testMode ? require('./testHtml') : null;
  let len = testCode ? testCode.length : 0; /*?*/
  let testPlace = testCode ? testCode.slice(0, testCode.indexOf('<!--')) : null /*?*/

  if (testMode) {
    console.log(makeDataObj(makeNameObj(testPlace), testCode));
    let x = treatHtml(testCode);
    console.log(treatData(x.length, ','));
    console.log(x);
  }

}

module.exports = tester;