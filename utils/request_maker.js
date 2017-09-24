const axios = require('axios');
const chalk = require('chalk');
const { colors } = require('./display');

const categoriesAreaVibes = ['cost-of-living', 'demographics', 'education', 'crime'];
const categoriesBestPlaces = ['', 'climate', 'voting', 'housing', 'economy', 'crime'];
const categories = [].concat(categoriesAreaVibes, categoriesBestPlaces);


const fetchHtml = (nameObj, category) => {
  let url;
  if (categoriesBestPlaces.indexOf(category) !== -1) {
    url = `http://www.bestplaces.net/${category}/city/${nameObj.bestplaces}`;
  } else if (categoriesAreaVibes.indexOf(category) !== -1) {
    url = `http://www.areavibes.com/${nameObj.areavibes}/${category}/`;
  }

  console.log(chalk.rgb(...colors.requestColors)(`${nameObj.full}...`, chalk.rgb(...colors.requestColors).underline(`${url}`)));

  return axios.get(url)
    .catch(err => console.log(chalk.rgb(...colors.errorColors)(`ERROR axios get for ${nameObj.full}`)))
}

const fetchAllHtml = (nameObj) => {
  if (!nameObj.placeId) { return }
  return axios.all(categories.map(cat => fetchHtml(nameObj, cat)))
    .then(axios.spread((...resps) => resps.map(resp => resp.data).join('')))
    .catch(err => console.log(chalk.rgb(...colors.errorColors)(`ERROR axios all ${nameObj.full}`)));
}



module.exports = fetchAllHtml;
