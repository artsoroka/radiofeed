const Shows         = require('./db/shows'); 
const Subscribtions = require('./db/subscribtions'); 
const Downloads     = require('./db/downloads'); 
const isEmpty       = require('lodash/isEmpty'); 
const checkUpdates  = require('./checkNewEpisodes'); 
const download      = require('./download'); 

module.exports = async () => {
  try{
    let links = []; 
    const subscribed = await Subscribtions.list(); 
    const shows      = await Shows.getShows({id: {$in: subscribed} }); 
    
    for(let show of shows){
      console.log(`Cheking ${show.id}...`); 
      const newEpisodes = await checkUpdates(show); 
      
      if( isEmpty(newEpisodes) ){
        console.log(`No new episodes of ${show.id} found`); 
        continue; 
      }
      
      console.log(`New episodes of ${show.id} found`); 
      const downloads = newEpisodes.map(episode => {
        return {
          show: {
            title: show.title,
            id: show.id
          }, 
          url: episode
        }; 
      }); 
      links = links.concat(downloads); 
      await Shows.addNewEpisodes(show, newEpisodes); 

    }
    
    console.log(links); 
    
    for(let link of links){
      const file = await download(link.url); 
      await Downloads.addFile({
        file: file, 
        show: link.show
      }); 
    }
    
  } catch(e){
    console.log('Error: ', e); 
  }
}