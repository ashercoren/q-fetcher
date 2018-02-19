const request = require('request-promise');

module.exports = async (url) => {
  return new Promise((resolve,reject) => {
    let postOptions = {
      uri: "https://vision.googleapis.com/v1/images:annotate",
      qs: {
        key:"AIzaSyBBeDLFc9v1K2CIWKSMqhwcDdDHYO9Xuac"
      },
      json:true,
      body: {
        requests: [
        {
          image: {
            source: {
              imageUri: url
            },
          },
          features: [
          {
            type: "TEXT_DETECTION"
          }]
        }]
      }
    };
    request.post(postOptions)
      .then(detected => {
        resolve([detected.responses[0].textAnnotations[0].description]);
      })
      .catch(err => {
        reject(`error while downloading ${url}: ${err.message}`);
      })
    })
}