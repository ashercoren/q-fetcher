const csv=require('csvtojson'),
      request = require('request-promise');


module.exports = async (url) => {
  let rows = [];
  return new Promise((resolve,reject) => {
    csv().fromStream(request(url))
      .on('json',(csvRow)=> {
        rows.push(csvRow); 
      })
      .on('done',(err)=> {
        if (err){
          reject(`error while downloading ${url}: ${err.message}`);
        }
        else {
          resolve(rows.map(row => row.text));
        }
      })
  });
}