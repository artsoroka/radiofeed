const Promise   = require('bluebird'); 
const Datastore = require('nedb'); 
const config    = require('../../config'); 

const filePath = [
  config.database.dir, 
  config.database.files.downloads
].join('/'); 

const db = new Datastore({ 
  filename: filePath, 
  autoload: true 
}); 

module.exports.list = () => {
  return new Promise((resolve, reject) => {
    db
      .find({})
      .sort({ date: -1 })
      .exec((err, downloads) => {
        if( err ) return reject('Failed to read from db: ', err); 
        resolve(downloads); 
      });
  }); 
}; 

module.exports.addFile = (entry) => {
  return new Promise((resolve, reject) => {
    db.insert({ 
      file: entry.file, 
      date: new Date(), 
      show: {
        id   : entry.show.id,
        title: entry.show.title
      }
    }, (err, newDoc) => {
      if( err ) return reject('Failed to save to db: ' + err); 
      resolve(newDoc); 
    });
  });
};