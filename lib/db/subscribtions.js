const Promise   = require('bluebird'); 
const Datastore = require('nedb'); 
const config    = require('../../config'); 

const filePath = [
  config.database.dir, 
  config.database.files.subscribtions
].join('/'); 

const db = new Datastore({ 
  filename: filePath, 
  autoload: true 
}); 

module.exports.add = (show) => {
  return new Promise((resolve, reject) => {
    db.update({ title: show }, { title: show }, {upsert: true}, 
    (err, newDoc) => {
      if( err ) return reject('Failed to save to db: ' + err); 
      resolve(newDoc); 
    });
  });
}; 

module.exports.list = () => {
  return new Promise((resolve, reject) => {
    db.find({}, (err, docs) => {
      if( err ) return reject('Failed to read list of subscribtions: ' + err); 
      resolve(docs.map(doc => doc.title)); 
    });
  });
}; 

module.exports.remove = (show) => {
  return new Promise((resolve, reject) => {
    db.remove({ title: show }, {multi: true}, (err, numRemoved) => {
      if( err ) return reject('Failed to save to db: ' + err); 
      console.log('Removed subscribtions for ' + show + ', items deleted: ' + numRemoved); 
      resolve(true); 
    });
  });
}; 