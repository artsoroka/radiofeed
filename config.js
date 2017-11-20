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
  }
}; 
