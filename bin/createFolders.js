const fs     = require('fs');
const config = require('../config'); 

const folders = [
  config.database.dir,
  config.downloads.dir
]; 

for(let folder of folders){
  if ( ! fs.existsSync(folder) ){
    console.log(`Creating folder ${folder}...`); 
    fs.mkdirSync(folder);
  }    
} 