
//I'm afraid to clean this up :/
const treatHtml = (str) => {
  let words = ['div', 'span', 'function', 'class', 'script', 'data'];
  let re = new RegExp('\\b(' + words.join('|') + ')\\b', 'g');
  let newStr = (str || '')
    .replace(re, '')
    .replace(/[ ]{2,}/, ' ')
    .replace(/\s+/gi, ' ')
    .replace(/[{}]/g, '')
    .split(' ')
    .filter(term => term.length < 1000)
    .join(' ');
  return newStr;
};

const treatData = (data = null, format) => {
  if (!format) { return data }

  data = typeof data === 'string' && data.slice(-1) === '.' ? data.slice(0, -1) : data; //patch for trailing '.'

  let result = `${Number(data).toFixed(format[1]).replace(/\B(?=(\d{3})+(?!\d))/g, ',').trim()}`;
  if (format[0] === ',') result = result;
  if (format[0] === '$') result = '$' + result;
  if (format[0] === 'd') result = result + '° F';
  if (format[0] === 'i') result = result + ' in';
  if (format[0] === 'f') result = result + ' ft';
  if (format[0] === '%') result = result + '%';
  if (format[0] === ':') result = result + ':1';
  if (format[0] === 'm') result = result + ' min';
  if (format[0] === 'k') result = result + '';
  if (format[0] === 'y') result = result + '';
  if (format[0] === 'x') result = result + 'x';
  if (format[0] === 'M') result = result + ' mi2';  
  return result;
};



module.exports = {
  treatHtml: treatHtml,
  treatData: treatData
}