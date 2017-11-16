const cheerio = require('cheerio'); 

module.exports = (html) => {
  const $ = cheerio.load(html); 
  const links = $('a.download'); 
  if( ! links || ! links.length) {
    console.log('getAudioLinks failed to find any links with class a.download'); 
    return []; 
  }
    
  const audioFiles = []; 
    
  links.map((index, link) => {
    const attribs = link.attribs || {}; 
    const href    = attribs.href || null; 
    if( href ) audioFiles.push(href); 
  }); 
   
  return audioFiles; 
}; 