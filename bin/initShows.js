const shows       = require('../lib/db/shows'); 
const getPageBody = require('../lib/getPageBody'); 
const getShowsList = require('../lib/getShowsList'); 
const config      = require('../config'); 

getPageBody(config.urls.showsListUrl)
  .then(html => getShowsList(html))
  .then(showsList => shows.addBatch(showsList)) 
  .then(created => console.log(created))
  .catch(err => console.log('Could not initialize shows list: ', err)); 