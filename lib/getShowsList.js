const cheerio = require('cheerio');

module.exports = (html) => {
  const $     = cheerio.load(html); 
  const links = $('div.title > h2 > a'); 
    
  const shows = []; 
    
  links.map((index, link) => {
    const attribs = link.attribs || {}; 
    const href    = attribs.href || null; 
        
    if( ! href ) return; 
        
    const children  = link.children || []; 
    const innerText = children[0]; 
    const title     = innerText.data || null;
    const id        = href.split('/')[2] || null;  
        
    shows.push({
      id   : id, 
      title: title,   
      url  : href
    }); 
    
  }); 
    
  return shows; 

};