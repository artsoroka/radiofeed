/*
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    |
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)
*/

var EVERY_15_MINUTES = '*/15 * * * *'; 

module.exports = {
  database: {
    dir: './db', 
    files: {
      downloads: 'downloads.db', 
      shows: 'shows.db',
      subscribtions: 'subscribtions.db'
    }
  },
  downloads: {
    dir: './downloads'
  },
  urls: {
    base: process.env.RADIOFEED_BASE_URL || 'http://radiofeed.com',
    showsListUrl: process.env.RADIOFEED_SHOWSLIST_URL || 'http://radiofeed.com/programs/'
  }, 
  worker: {
    interval: process.env.RADIOFEED_CHECK_INTERVAL || EVERY_15_MINUTES
  }
}; 
