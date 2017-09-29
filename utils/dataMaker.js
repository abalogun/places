const _ = require('underscore');
const { treatHtml, treatData } = require('./treatments');
const makeNameObj = require('./nameMaker'); //for testing
const tester = require('../test/testers');

////////////////////////// TEST AREA //////////////////////////////////////
let testMode = false;
/////////////////////////////////////////////////////////////////////////


const siftHtml = (code, searchStr, start = 0, end = 0, format, options) => {
  //Note: start = where to start the slice. end = where to end the slice. negative numbers count left, positive numbers count right.

  const idx = code.indexOf(searchStr) || ``;
  const alt = `idx --> ${idx}`; //for test printing w/ quokka
  let snip = code.slice(idx + start, idx + searchStr.length + end);
  if (_.contains(['image-author'], searchStr)) {
    snip = snip.replace(/[]/gi, '') || alt;
  } else {
    snip = snip.replace(/[^\d.-]/gi, '') || alt;

    if (searchStr === `summary-caption">Average in`) { //patch for salary info from indeed
      if (snip == 0 || isNaN(snip) || snip == null) {
        snip = 65001;
      } else if (snip < 100) {
        snip = Number(snip) * 40 * 52;
      } else if (snip < 1000) {
        snip = Number(snip) * 52;
      }
    }

    if (searchStr === `Engineering, computers, science`) { //patch for STEM jobs
      options = options.map(d => d.replace(/[,%]/gi, ''));
      snip = options[0] * (1 - (options[1] / 100)); /*?*/
    }

    if (_.contains(['<td>Murder</td>', '<td>Violent crime</td>', '<td>Property crime</td>'], searchStr)) {
      if (snip <= 0) { return 'N/A'; }
    }

  }
  return treatData(snip, format);
}


const makeDataObj = (nameObj, rawCode) => {
  code = treatHtml(rawCode);

  const obj = {};

  //unseen
  obj.nameObj = nameObj;
  obj.rawCode = nameObj.full + '\n' + code;
  obj.notes = `* NOTES: 'LIVABILITY' is a score from AreaVibes. 'INDEX' of 100 represents national average. 'SCORE' represents a scale to 100.`;
  obj.ignore = ['nameObj', 'rawCode', 'notes', 'ignore'];

  //GENERAL
  obj['GENERAL'] = '';
  obj.STATE = nameObj.stateProper; /*?*/
  obj.LIVABILITY = siftHtml(code, `<em>Livability</em>`, 0, 20, ''); /*?*/
  obj.POPULATION = siftHtml(code, `<tr><td>Population</td><td>`, 0, 15, ',0'); /*?*/
  obj.DENSITY = siftHtml(code, `<td>Population density<small>`, 0, 35, ',0'); /*?*/
  obj.POP_CHANGE_SINCE_2000 = siftHtml(code, `Percent change in population, 2000`, 160, 150, '%1'); /*?*/
  obj.LAND_AREA = siftHtml(code, `Land Area`, 190, 200, 'M, 0'); /*?*/
  obj.WATER_AREA = siftHtml(code, `Water Area`, 190, 200, 'M, 0'); /*?*/
  obj.ELEVATION = siftHtml(code, `The elevation or altitude`, 150, 145, 'f0'); /*?*/

  //COSTS
  obj['COSTS'] = '';
  obj.COST_OF_LIVING_INDEX = siftHtml(code, `Cost of living index`, 0, 20, ',0'); /*?*/
  obj.HOUSING_INDEX = siftHtml(code, `Housing index`, 0, 20, ',0'); /*?*/
  obj.GROCERIES_INDEX = siftHtml(code, `Groceries index`, 0, 20, ',0'); /*?*/
  obj.BEER = siftHtml(code, `Beer`, 0, 20, '$2'); /*?*/
  obj.GASOLINE = siftHtml(code, `Gasoline`, 0, 20, '$2'); /*?*/
  obj.ELECTRICITY = siftHtml(code, `All Electricity`, 0, 20, '$2'); /*?*/

  //HOUSING
  obj['HOUSING'] = '';
  obj.MED_HOME_PRICE = siftHtml(code, `col=median_property_value`, 40, 45, '$,'); /*?*/
  obj.HOME_APPREC_1_YR = siftHtml(code, `appreciation - last 12 months`, 150, 140, '%1'); /*?*/
  obj.HOME_APPREC_5_YR = siftHtml(code, `appreciation - last 5 years`, 150, 140, '%1'); /*?*/
  obj.HOME_APPREC_10_YR = siftHtml(code, `appreciation - last 10 years`, 150, 140, '%1'); /*?*/
  obj.MED_RENT_3BR = siftHtml(code, `3 Bedroom Home or Apartment`, 217, 225, '$0'); /*?*/
  obj.HOME_INCOME_RATIO = siftHtml(code, `Home price to income ratio`, -10, 0, 'x1'); /*?*/

  //ECONOMY
  obj['ECONOMY'] = '';
  obj.MED_FAMILY_INCOME = siftHtml(code, `income&rank=1&dataset=False'`, 20, 20, '$0'); /*?*/
  obj.INCOME_GROWTH = siftHtml(code, `growth from the previous year`, -10, 0, '%2'); /*?*/
  obj.JOB_GROWTH = siftHtml(code, `with jobs, a`, 0, 20, '%2'); /*?*/
  obj.INCOME_TAX = siftHtml(code, `,sales tax rate is `, 40, 30, '%2'); /*?*/
  obj.SALES_TAX = siftHtml(code, `,sales tax rate is `, 0, 6, '%2'); /*?*/
  obj.UNEMPLOYMENT = siftHtml(code, `Unemployment rate`, 0, 20, '%1'); /*?*/
  obj.POVERTY = siftHtml(code, `Poverty level`, 0, 20, '%1'); /*?*/

  //DEMOS
  obj['DEMOGRAPHICS'] = '';
  obj.MEDIAN_AGE = siftHtml(code, `Median age`, 0, 20, 'y1'); /*?*/
  obj.MARRIED_W_KIDS = siftHtml(code, `married, living with one or more children`, 150, 140, '%1'); /*?*/
  obj.WHITE = siftHtml(code, `<td>Caucasian</td>`, 0, 15, '%1'); /*?*/
  obj.BLACK = siftHtml(code, `<td>African American</td>`, 0, 15, '%1'); /*?*/
  obj.ASIAN = siftHtml(code, `<td>Asian</td>`, 0, 10, '%1'); /*?*/
  obj.HISPANIC = siftHtml(code, `of people are of Hispanic`, -20, 0, '%1'); /*?*/
  obj.DEMOCRATIC_VOTERS = siftHtml(code, `are registered as Democrats`, -60, 0, '%1'); /*?*/
  obj.REPUBLICAN_VOTERS = siftHtml(code, `are registered Republican`, -7, 0, '%1'); /*?*/

  //QUALITY OF LIFE
  obj['QUAL_OF_LIFE'] = '';
  obj.VIOLENT_CRIME_SCORE = siftHtml(code, `violent crime, on a scale from 1`, 50, 50, ',0'); /*?*/
  obj.STUDENT_TEACHER_RATIO = siftHtml(code, `<td>Student/Teacher ratio</td>`, 0, 7, ':0'); /*?*/
  obj.AVG_TEST_SCORES = siftHtml(code, `<td>Average Test Scores</td>`, 0, 10, '%0'); /*?*/
  obj.HIGH_SCHOOL_GRAD_RATE = siftHtml(code, `<td>Completed high school</td>`, 0, 10, '%0'); /*?*/
  obj.AVG_COMMUTE = siftHtml(code, `mean_commute_minutes&rank`, 30, 30, 'm0'); /*?*/
  obj.SUPER_COMMUTES = siftHtml(code, `"super commutes"`, -55, 0, '%2'); /*?*/

  //CLIMATE
  obj['CLIMATE'] = '';
  obj.JULY_HIGH = siftHtml(code, `Avg. July High&nbsp`, 250, 250, 'd0'); /*?*/
  obj.JAN_LOW = siftHtml(code, `Avg. Jan. Low&nbsp`, 250, 250, 'd0'); /*?*/
  obj.RAIN = siftHtml(code, `inches of rain per year`, -10, 0, 'i0'); /*?*/
  obj.SNOW = siftHtml(code, `Snowfall is`, 0, 10, 'i0'); /*?*/
  obj.SUNNY_DAYS = siftHtml(code, `On average, there are`, 0, 10, ',0'); /*?*/
  obj.UV_LEVEL = siftHtml(code, `UV Index`, 320, 330, ',1'); /*?*/
  obj.AIR_QUALITY_SCORE = siftHtml(code, `Air quality in`, 30, 35, ',0'); /*?*/
  obj.WATER_QUALITY_SCORE = siftHtml(code, `Water quality in`, 30, 35, ',0'); /*?*/


  ////////////////////////// PERSONAL AREA //////////////////////////////////////
  //obj['PERSONAL'] = '';
  //obj.WEB_DEV_SALARY_indeed = siftHtml(code, `summary-caption">Average in`, 60, 60, '$0', obj.COST_OF_LIVING_INDEX); /*?*/


  return obj;
}

tester(testMode, makeNameObj, makeDataObj, treatHtml, treatData)


module.exports = makeDataObj;