const shows         = require('./lib/db/shows'); 
const subscribtions = require('./lib/db/subscribtions'); 
const getPageBody   = require('./lib/getPageBody'); 
const getShowsList  = require('./lib/getShowsList'); 
const getAudioLinks = require('./lib/getAudioLinks'); 
const includes      = require('lodash/includes'); 
const last          = require('lodash/last'); 
const config        = require('./config'); 

(async () => {
  try{
    var links = []; 
    const showsPage = await getPageBody(config.urls.showsListUrl); 
    const shows     = getShowsList(showsPage);   
    const favorite  = await subscribtions.list(); 
    
    for(let show of shows.filter(s => includes(favorite, s.id))){
      console.log('Cheking ' + show.id + '... '); 
      const html = await getPageBody(config.urls.base + show.url); 
      const audioFiles = getAudioLinks(html).filter(link => {
        return last(link.split('/')).match(show.id); 
      }); 
      links = links.concat(audioFiles); 
    }
    
    console.log(links); 
    
  } catch(e){
    console.log('Error: ', e); 
  }
})();