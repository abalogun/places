const axios = require('axios');
const chalk = require('chalk');
const _ = require('underscore');
const { theme } = require('./display');

const categoriesDataUSA = ['  ']; // '#intro', '#demographics', '#housing', '#economy'
const categoriesAreaVibes = ['cost-of-living', 'demographics', 'education', 'employment', 'real-estate'];
const categoriesBestPlaces = ['', 'climate', 'voting', 'housing', 'economy', 'crime', 'health', 'people'];
const categoriesIndeed = ['salary'];
const categoriesGlassDoor = ['google'];
let categories = [...categoriesDataUSA, ...categoriesAreaVibes, ...categoriesBestPlaces, ...categoriesIndeed, ...categoriesGlassDoor];

let count;

const fetchHtml = (nameObj, category) => {
  let url;
  if (_.contains(categoriesDataUSA, category)) { url = `https://datausa.io/profile/geo/${nameObj.dataUSA}/${category}`; }
  if (_.contains(categoriesAreaVibes, category)) { url = `http://www.areavibes.com/${nameObj.areavibes}/${category}/`; }
  if (_.contains(categoriesBestPlaces, category)) { url = `http://www.bestplaces.net/${category}/city/${nameObj.bestplaces}`; }
  if (_.contains(categoriesIndeed, category)) { url = `https://www.indeed.com/salaries/Web-Developer-Salaries,-${nameObj.indeed}?period=yearly`; }
  if (_.contains(categoriesGlassDoor, category)) { url = `https://www.google.com/search?q=salary+web+developer+${nameObj.google}+glassdoor`; }

  if (!count) {
    console.log(chalk.rgb(...theme.requestColors)(`Requesting ${nameObj.full}...`))
    count++;
  }

  if (url) {
    return axios.get(url)
      .catch(err => console.log(chalk.rgb(...theme.errorColors)(`ERROR axios get for ${nameObj.full}`)))
  }
}

const fetchAllHtml = (nameObj) => {
  count = 0;
  if (!nameObj.placeId) { return }
  return axios.all(categories.map(cat => fetchHtml(nameObj, cat)))
    .then(axios.spread((...resps) => {
      return resps.map(resp => {
        if (resp.config.url.slice(-9) === 'glassdoor') {
          // console.log(resp.data.slice(0, 30000))
          return resp.data; //still working on this
        } else {
          return resp.data;
        }
      }).join('')
    }))
    .catch(err => console.log(chalk.rgb(...theme.errorColors)(`ERROR axios all ${nameObj.full}`), err));
}



module.exports = fetchAllHtml;
