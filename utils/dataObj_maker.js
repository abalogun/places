const { treatHtml, treatData } = require('./treatments');
const makeNameObj = require('./nameObj_maker'); //for testing


////////////////////////// TEST AREA //////////////////////////////////////
let testMode = false;
let testCode = testMode ? require('../test/testHtml') : null;
let len = testCode ? testCode.length : 0; /*?*/
let testPlace = testCode ? testCode.slice(0, testCode.indexOf('<!DOCTYPE html>')) : null /*?*/
/////////////////////////////////////////////////////////////////////////


const siftHtml = (code, searchStr, beforeIdx = 0, afterIdx = 0, format, options) => {
  const idx = code.indexOf(searchStr) || ``;
  const alt = testMode ? `idx --> ${idx}` : null; //for test printing w/ quokka
  let snip = code.slice(idx - beforeIdx, idx + searchStr.length + afterIdx).replace(/[^\d.]/gi, '') || alt;
  return treatData(snip, format);
}


const makeDataObj = (nameObj, rawCode) => {
  code = treatHtml(rawCode);

  const obj = {};

  //unseen
  obj.nameObj = nameObj;
  obj.rawCode = nameObj.full + '\n' + code;
  obj.ignore = ['nameObj', 'rawCode', 'breaks', 'ignore'];
  obj.breaks = ['LIVABILITY', 'SALES_TAX', 'REPS', 'AVG_COMMUTE', 'ELEVATION'];

  //seen
  obj.PLACE = nameObj.full;  /*?*/
  obj.LIVABILITY = siftHtml(code, `<em>Livability</em>`, 0, 20, ''); /*?*/

  obj.COST_OF_LIVING_INDEX = siftHtml(code, `Cost of living index`, 0, 20, ',0'); /*?*/
  obj.GROCERIES_INDEX = siftHtml(code, `Groceries index`, 0, 20, ',0'); /*?*/
  obj.HOUSING_INDEX = siftHtml(code, `Housing index`, 0, 20, ',0'); /*?*/
  obj.MED_HOME_PRICE = siftHtml(code, `Home appreciation the last`, 50, 0, '$0'); /*?*/
  obj.MED_RENT_3BR = siftHtml(code, `3 Bedroom Home or Apartment`, -217, 225, '$0'); /*?*/
  obj.INCOME_TAX = siftHtml(code, `,sales tax rate is `, -40, 30, '%2'); /*?*/
  obj.SALES_TAX = siftHtml(code, `,sales tax rate is `, 0, 6, '%2'); /*?*/

  obj.POPULATION = siftHtml(code, `<tr><td>Population</td><td>`, 0, 15, ',0'); /*?*/
  obj.DENSITY = siftHtml(code, `<td>Population density<small>`, 0, 35, ',0'); /*?*/
  obj.WHITE = siftHtml(code, `<td>Caucasian</td>`, 0, 15, '%0'); /*?*/
  obj.BLACK = siftHtml(code, `<td>African American</td>`, 0, 15, '%0'); /*?*/
  obj.ASIAN = siftHtml(code, `<td>Asian</td>`, 0, 10, '%0'); /*?*/
  obj.HISP = siftHtml(code, `of people are of Hispanic`, 20, 0, '%0'); /*?*/
  obj.DEMS = siftHtml(code, `are registered as Democrats`, 60, 0, '%0'); /*?*/
  obj.REPS = siftHtml(code, `are registered Republican`, 7, 0, '%0'); /*?*/

  obj.VIOLENT_CRIME_INDEX = siftHtml(code, `violent crime, on a scale from 1`, -50, 50, ',0'); /*?*/
  obj.STUDENT_TEACHER_RATIO = siftHtml(code, `<td>Student/Teacher ratio</td>`, 0, 7, ':0'); /*?*/
  obj.AVG_TEST_SCORES = siftHtml(code, `<td>Average Test Scores</td>`, 0, 10, '%0'); /*?*/
  obj.HIGH_SCHOOL_GRAD_RATE = siftHtml(code, `<td>Completed high school</td>`, 0, 10, '%0'); /*?*/
  obj.AVG_COMMUTE = siftHtml(code, `Average Commute time is`, -90, 90, 'm0'); /*?*/

  obj.JULY_HIGH = siftHtml(code, `Avg. July High&nbsp`, -250, 250, 'd0'); /*?*/
  obj.JAN_LOW = siftHtml(code, `Avg. Jan. Low&nbsp`, -250, 250, 'd0'); /*?*/
  obj.RAIN = siftHtml(code, `inches of rain per year`, 10, 0, 'i0'); /*?*/
  obj.SNOW = siftHtml(code, `Snowfall is`, 0, 10, 'i0'); /*?*/
  obj.SUNNY_DAYS = siftHtml(code, `On average, there are`, 0, 10, ',0'); /*?*/
  obj.ELEVATION = siftHtml(code, `The elevation or altitude`, -150, 145, 'f0'); /*?*/

  return obj;
}


if (testMode) {
  console.log(makeDataObj(makeNameObj(testPlace), testCode));
  let x = treatHtml(testCode);
  console.log(treatData(x.length, ','));
  console.log(x);
}

module.exports = makeDataObj;