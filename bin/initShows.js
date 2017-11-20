const Shows        = require('../lib/db/shows'); 
const getPageBody  = require('../lib/getPageBody'); 
const getShowsList = require('../lib/getShowsList'); 
const isEmpty      = require('lodash/isEmpty'); 
const config       = require('../config'); 

getPageBody(config.urls.showsListUrl)
  .then(html => getShowsList(html))
  .then(shows => {
    if( isEmpty(shows) ){
      throw new Error('could not fetch shows list'); 
  	}
    // add episodes array for each show
    return shows.map(show => {
      return Object.assign({episodes: []}, show);
    }); 
  }) 
  .then(shows => Shows.addBatch(shows))
  .then(created => console.log(created))
  .catch(err => console.log('Could not initialize shows list: %s', err)); 