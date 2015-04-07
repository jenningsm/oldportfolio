
var Element = require('/home/mjennings/pagebuilder/html.js');

module.exports = function(structure){
  
  var pageID = 0;
  function assignIDs(s){
    if(Array.isArray(s)){
      for(var i = 0; i < s.length; i++){
        assignIDs(s[i]);
      }
    } else {
      s.id = pageID++;
    }
  }

  function getTop(n){
    if(Array.isArray(n)){
      return n[0];
    } else {
      return n;
    }
  }
 
  function connect(s){
    var par;
    var children;
    if(Array.isArray(s)){
      par = s[0];
      children = s.slice(1);
    } else {
      par = s;
      children = [];
    }
    if(children.length === 0){
      return [[par.id, par.generator([])]];
    } else {
      var childrenNameMap = [];
      for(var i = 0; i < children.length; i++){
        var child = getTop(children[i]);
        childrenNameMap.push([child.name, child.id]);
      }
      var pages = [[par.id, par.generator(childrenNameMap)]];
  
      var child = getTop(children[0]);
      var prevID = par.id;
      var nextID = (children.length > 1 ? getTop(children[1]).id : par.id);
      child.generator = child.generator(child.id, prevID, nextID);
      for(var i = 1; i < children.length - 1; i++){
        child = getTop(children[i]);
        prevID = getTop(children[i-1]).id;
        nextID = getTop(children[i+1]).id;
        child.generator = child.generator(child.id, prevID, nextID);
      }
      if(children.length > 1){
        var lastIndex = children.length - 1;
        child = getTop(children[lastIndex]);
        prevID = getTop(children[lastIndex-1]).id;
        nextID = par.id
        child.generator = child.generator(child.id, prevID, nextID);
      }
      
      for(var i = 0; i < children.length; i++){
        pages = pages.concat(connect(children[i]));
      }
      return pages;
    }
  }

  assignIDs(structure);
  structure[0].generator = structure[0].generator(structure[0].id, null, null);
  return connect(structure);
}
