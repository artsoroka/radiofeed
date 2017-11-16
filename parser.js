const Shows         = require('./lib/db/shows'); 
const Subscribtions = require('./lib/db/subscribtions'); 
const isEmpty       = require('lodash/isEmpty'); 
const checkUpdates  = require('./lib/checkNewEpisodes'); 

(async () => {
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
      links = links.concat(newEpisodes); 
      await Shows.addNewEpisodes(show, newEpisodes); 

    }
    
    console.log(links); 
    
  } catch(e){
    console.log('Error: ', e); 
  }
})();