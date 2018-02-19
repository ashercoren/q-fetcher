const readline = require('readline'),
      fs = require('fs'),
      path = require('path'),
      fetcher = require('./fetchers'),
      {queue} = require('async');

loadFile = function(file,q,questions,cb) {

  var input = fs.createReadStream(file);
  input.on('error', (err) => {
    console.log(`couldn't read file: ${err}`);
    process.exit(1);
  });

  const rl = readline.createInterface({
    input: input
  });

  rl.on('line', (line) => {
    q.push({url:line,questions:questions});
  });

  rl.on('close', () => {
    q.drain = function() {
      cb();
    };
  })
};

handleUrl = async function({url,questions}){
  console.log(`fetching ${url}`);
  let fileType = path.extname(url).substring(1);
  try {
    let fetched = await fetcher(url,fileType);
    fetched.forEach(question => {questions.push({source:fileType,value:question})});
  } catch (err){
    console.log(`error with url ${url}: ${err.message}`);
  }
}

fetchUrls = function () {
  return new Promise((resolve,reject) => {
    let questions = [];
    let q = queue(handleUrl,10);
    loadFile('data/manifest.dat', q, questions, () => {
      resolve(questions);
    });
  });
}

module.exports = fetchUrls;

if (require.main === module) {
  fetchUrls().then(data => {console.log(data)});
}
