const path = require('path'),
      fs = require('fs');

var fetchers = {};
fs.readdirSync(__dirname).forEach(function (file) {
  if (file === 'index.js') return;

  let {base,name} = path.parse(file);
  fetchers[name] = require(`./${base}`);
});

module.exports = async (url,extention) => {
    let fetcher = fetchers[extention];
    if (fetcher){
      return fetcher(url);
    }
    else {
      throw new Error(`FETCHER: file type not supported: ${extention}`);
    }
  };