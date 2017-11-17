const fs      = require('fs'); 
const request = require('request'); 
const Promise = require('bluebird');  
const last    = require('lodash/last'); 
const config  = require('../config'); 

module.exports = (url) => {
  const file = last(url.split('/'));
  const path     = [config.downloads.dir, file].join('/'); 

  console.log(`Downloading ${url} as ${path}`); 
  
  return new Promise((resolve, reject) => {
    request(url)
      .pipe(fs.createWriteStream(path)) 
      .on('close', () => {
          resolve(file); 
      }); 
  }); 
}; 