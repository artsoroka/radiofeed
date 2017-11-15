const cheerio = require('cheerio'); 

module.exports = (html) => {
  const $ = cheerio.load(html); 
  const links = $('a.download'); 
  if( ! links || ! links.length) {
    return console.log('links with class a.download not found'); 
  }
    
  const audioFiles = []; 
    
  links.map((index, link) => {
    const attribs = link.attribs || {}; 
    const href    = attribs.href || null; 
    if( href ) audioFiles.push(href); 
  }); 
   
  return audioFiles; 
}; 