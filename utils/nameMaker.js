const states = [
  {
    "arizona": "az",
    "alabama": "al",
    "alaska": "ak",
    "arizona": "az",
    "arkansas": "ar",
    "california": "ca",
    "colorado": "co",
    "connecticut": "ct",
    "delaware": "de",
    "florida": "fl",
    "georgia": "ga",
    "hawaii": "hi",
    "idaho": "id",
    "illinois": "il",
    "indiana": "in",
    "iowa": "ia",
    "kansas": "ks",
    "kentucky": "ky",
    "louisiana": "la",
    "maine": "me",
    "maryland": "md",
    "massachusetts": "ma",
    "michigan": "mi",
    "minnesota": "mn",
    "mississippi": "ms",
    "missouri": "mo",
    "montana": "mt",
    "nebraska": "ne",
    "nevada": "nv",
    "new hampshire": "nh",
    "new jersey": "nj",
    "new mexico": "nm",
    "new york": "ny",
    "north carolina": "nc",
    "north dakota": "nd",
    "ohio": "oh",
    "oklahoma": "ok",
    "oregon": "or",
    "pennsylvania": "pa",
    "rhode island": "ri",
    "south carolina": "sc",
    "south dakota": "sd",
    "tennessee": "tn",
    "texas": "tx",
    "utah": "ut",
    "vermont": "vt",
    "virginia": "va",
    "washington": "wa",
    "west virginia": "wv",
    "wisconsin": "wi",
    "wyoming": "wy",
    "district_of_columbia": "dc"
  }, {
    "az": "arizona",
    "al": "alabama",
    "ak": "alaska",
    "ar": "arkansas",
    "ca": "california",
    "co": "colorado",
    "ct": "connecticut",
    "de": "delaware",
    "fl": "florida",
    "ga": "georgia",
    "hi": "hawaii",
    "id": "idaho",
    "il": "illinois",
    "in": "indiana",
    "ia": "iowa",
    "ks": "kansas",
    "ky": "kentucky",
    "la": "louisiana",
    "me": "maine",
    "md": "maryland",
    "ma": "massachusetts",
    "mi": "michigan",
    "mn": "minnesota",
    "ms": "mississippi",
    "mo": "missouri",
    "mt": "montana",
    "ne": "nebraska",
    "nv": "nevada",
    "nh": "new hampshire",
    "nj": "new jersey",
    "nm": "new mexico",
    "ny": "new york",
    "nc": "north carolina",
    "nd": "north dakota",
    "oh": "ohio",
    "ok": "oklahoma",
    "or": "oregon",
    "pa": "pennsylvania",
    "ri": "rhode island",
    "sc": "south carolina",
    "sd": "south dakota",
    "tn": "tennessee",
    "tx": "texas",
    "ut": "utah",
    "vt": "vermont",
    "va": "virginia",
    "wa": "washington",
    "wv": "west virginia",
    "wi": "wisconsin",
    "wy": "wyoming",
    "dc": "district_of_columbia"
  }
]

const makeNameObj = (inputStr) => {
  if (!inputStr) { return 'INVALID' }

  let obj = {};
  let tmp = inputStr.split(',').map(p => p.toLowerCase().replace(/\s+/gi, ' ').trim());
  let city = tmp[0];
  let state = tmp[1];

  let stateAbbrLowerCase = states[0][state] || states[0][states[1][state]] || null; /*?*/
  if (!stateAbbrLowerCase) { return null };
  let stateAbbrUpperCase = stateAbbrLowerCase.toUpperCase(); /*?*/
  let stateLongLowerCase = states[1][stateAbbrUpperCase.toLowerCase()]; /*?*/
  let stateLongUpperCase = stateLongLowerCase.toUpperCase(); /*?*/
  let stateLongProper = stateLongLowerCase.split(' ').map(part => part.split('').map((char, i) => i == 0 ? char.toUpperCase() : char.toLowerCase()).join('')).join(' '); /*?*/
  let stateWithUnderscore = stateLongProper.replace(/ /g, '_'); /*?*/
  let stateWithPluses = stateLongProper.replace(/ /g, '+'); /*?*/
  let stateWithDash = stateLongProper.replace(/ /g, '-'); /*?*/

  let cityLowerCase = city; /*?*/
  let cityUpperCase = city.toUpperCase(); /*?*/
  let cityProper = city.split(' ').map(part => part.split('').map((char, i) => i == 0 ? char.toUpperCase() : char.toLowerCase()).join('')).join(' '); /*?*/;
  let cityWithUnderscores = city.replace(/ /g, '_'); /*?*/
  let cityWithPluses = city.replace(/ /g, '+'); /*?*/
  let cityWithDashes = city.replace(/ /g, '-'); /*?*/

  if (cityLowerCase === 'nashville') { //patch for nashville
    cityWithDashes += '-davidson-metropolitan-government-(balance)';
    cityWithUnderscores += '-davidson'
  }

  obj.placeId = `${cityWithPluses}-${stateAbbrLowerCase}`; /*?*/
  obj.dataUSA = `${cityWithDashes}-${stateAbbrLowerCase}`; /*?*/
  obj.areavibes = `${cityWithPluses}-${stateAbbrLowerCase}`; /*?*/
  obj.bestplaces = `${stateAbbrLowerCase}/${cityWithUnderscores}`; /*?*/
  obj.indeed = `${cityWithDashes}-${stateAbbrUpperCase}`; /*?*/
  obj.google = `${cityWithPluses}+${stateAbbrLowerCase}`; /*?*/
  obj.cityProper = cityProper; /*?*/
  obj.stateProper = stateLongProper; /*?*/
  obj.full = `${cityProper}, ${stateLongProper}`; /*?*/
  obj.Pro = `${cityProper}, ${stateAbbrUpperCase}`; /*?*/

  return obj;
};

module.exports = makeNameObj;
