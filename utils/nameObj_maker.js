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
  if (!inputStr) { return 'INVALD' }

  let obj = {};
  let tmp = inputStr.split(',').map(p => p.toLowerCase().replace(/\s+/gi, ' ').trim());
  let city = tmp[0];
  let state = tmp[1];

  let stateLowerAbbr = states[0][state] || states[0][states[1][state]] || null;
  if (!stateLowerAbbr) { return 'INVALID' }
  let stateUpperAbbr = stateLowerAbbr.toUpperCase();
  let stateLowerBestPlaces = (state.length > 2 ? state : states[1][state]).split(' ').map(p => p).join('_');
  let cityLowerAreaVibes = city.split(' ').map(part => part).join('+');
  let cityLowerBestPlaces = city.split(' ').map(part => part).join('_');
  if (cityLowerBestPlaces === 'nashville') { cityLowerBestPlaces += '-davidson' } //patch for nashville

  let cityProper = city.split(' ').map(part => {
    return part.split('').map((char, i) => {
      return i === 0 ? char.toUpperCase() : char.toLowerCase();
    }).join('')
  }).join(' ');

  let cityProperIndeed = cityProper.split(' ').map(part => part).join('-');

  let areavibes = `${cityLowerAreaVibes}-${stateLowerAbbr}`;
  let bestplaces = `${stateLowerBestPlaces}/${cityLowerBestPlaces}`;
  let indeed = `${cityProperIndeed}-${stateUpperAbbr}`;

  obj.placeId = areavibes;
  obj.areavibes = areavibes;
  obj.bestplaces = bestplaces;
  obj.indeed = indeed;
  obj.properCity = cityProper;
  obj.properState = stateUpperAbbr;
  obj.full = `${cityProper}, ${stateUpperAbbr}`;

  return obj;
};



module.exports = makeNameObj;
