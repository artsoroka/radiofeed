const shows        = require('../lib/db/shows'); 
const getPageBody  = require('../lib/getPageBody'); 
const getShowsList = require('../lib/getShowsList'); 
const isEmpty      = require('lodash/isEmpty'); 
const config       = require('../config'); 

getPageBody(config.urls.showsListUrl)
  .then(html => getShowsList(html))
  .then(showsList => {
  	if( isEmpty(showsList) ){
      throw new Error('could not fetch shows list'); 
  	}
  	shows.addBatch(showsList)
   }) 
  .then(created => console.log(created))
  .catch(err => console.log('Could not initialize shows list: ', err)); 