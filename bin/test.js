const assert        = require('assert'); 
const isEmpty       = require('lodash/isEmpty'); 
const first         = require('lodash/first'); 
const has           = require('lodash/has'); 
const getPageBody   = require('../lib/getPageBody'); 
const getShowsList  = require('../lib/getShowsList'); 
const getAudioLinks = require('../lib/getAudioLinks'); 
const config        = require('../config'); 

getPageBody(config.urls.showsListUrl)
  .then(html => {
    assert.equal(isEmpty(html), false, 'could not fetch page body ' + config.urls.showsListUrl); 
    return getShowsList(html)
  })
  .then(shows => {
    assert.equal(isEmpty(shows), false, 'could not fetch shows list')
    return first(shows); 
  }) 
  .then(show => {
    ['id', 'title', 'url'].forEach((property) => {
      assert.equal(has(show, property), true, property + ' field is missing'); 
      assert.equal(isEmpty(show[property]), false, property + ' should not be empty'); 
    }); 
    const url = [config.urls.base, show.url].join(''); 
    return getPageBody(url); 
  })
  .then(html => {
    assert.equal(isEmpty(html), false, 'could not fetch page body '); 
    return getAudioLinks(html); 
  })
  .then(links => {
    assert.equal(isEmpty(links), false, 'could not find audio links'); 
    console.log('Ok'); 
  })
  .catch(err => {
      console.log('Failed with error %s', err); 
      process.exit(1); 
  }); 