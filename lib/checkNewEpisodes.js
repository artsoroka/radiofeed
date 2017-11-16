const getPageBody   = require('./getPageBody'); 
const getAudioLinks = require('./getAudioLinks'); 
const diff          = require('lodash/difference'); 
const last          = require('lodash/last'); 
const config        = require('../config'); 

module.exports = async (show) => {
  const html = await getPageBody(config.urls.base + show.url); 
  
  const audioFiles = getAudioLinks(html).filter(link => {
    // strip off links for other shows 
    return last(link.split('/')).match(show.id); 
  }); 
  
  return diff(audioFiles, show.episodes); 
  
}; 