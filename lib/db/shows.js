const Promise   = require('bluebird'); 
const Datastore = require('nedb'); 
const config    = require('../../config'); 

const filePath = [
  config.database.dir, 
  config.database.files.shows
].join('/'); 

const db = new Datastore({ 
  filename: filePath, 
  autoload: true 
}); 

module.exports.addShow = (show) => {
  return new Promise((resolve, reject) => {
    db.insert({ 
      id   : show.id,
      title: show.title, 
      url  : show.url
    }, (err, newDoc) => {
      if( err ) return reject('Failed to save to db: ' + err); 
      resolve(newDoc); 
    });
  });
}; 

module.exports.getShows = (params) => {
  const query = params || {}; 
  return new Promise((resolve, reject) => {
    db.find(query, (err, docs) => {
      if( err ) return reject('Failed to read db: ' + err); 
      resolve(docs); 
    });
  });	
}; 

module.exports.addBatch = (showsList) => {
  return new Promise((resolve, reject) => {
    db.insert(showsList, (err, newDocs) => {
      if( err ) return reject('Failed to save to db: ' + err); 
      resolve(newDocs); 
    });
  });
}; 

module.exports.addNewEpisodes = (show, newEpisodes) => {
  return new Promise((resolve, reject) => {
    const episodes = show.episodes.concat(newEpisodes); 
    db.update({ id: show.id }, { $set: { episodes: episodes } }, {}, 
    (err, numReplaced) => {
      if( err ) return reject(err); 
      resolve(numReplaced); 
    }); 
  }); 
}; 