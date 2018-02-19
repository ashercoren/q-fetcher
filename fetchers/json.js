const request = require('request-promise');

module.exports = async (url) => {
  var options = {
    uri: url,
    json: true
  };
  return new Promise((resolve,reject) => {
    request(options)
      .then(function (res) {
          resolve(res.questions.map(question => question.text));
      })
      .catch(function (err) {
        reject(`error while downloading ${url}: ${err.message}`);
      });
  });
}