const getPageBody = require('./lib/getPageBody'); 
const getShowsList = require('./lib/getShowsList'); 

getPageBody(process.env.RADIOFEED_SHOWSLIST_URL)
  .then(html => getShowsList(html))
  .then(shows => console.log(shows)) 
  .catch(err => console.log('ERROR: ', err)); 