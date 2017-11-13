const request = require('request'); 
const cheerio = require('cheerio'); 
const Promise = require('bluebird'); 

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    request.get(url, (err, response, body) => {
      if( err ) return reject(err); 
        resolve(body); 
    });
  });
}; 