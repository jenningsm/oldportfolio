
var Element = require('/home/mjennings/pagebuilder/html.js');

module.exports = function(structure){

  assignIDs(structure);
  structure[0].generator = structure[0].generator(structure[0].id, null, null);
  var pageList = connect(structure);

  var pageSet = {};
  for(var i = 0; i < pageList.length; i++){
    pageSet[pageList[i][0]] = pageList[i][1];
  }
  return pageSet;
}



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

    for(var i = 0; i < children.length; i++){
      var child = getTop(children[i]);
      var prevID = (i === 0 ? par.id : getTop(children[i-1]).id);
      var nextID = (i === children.length - 1 ? par.id : getTop(children[i+1]).id);
      child.generator = child.generator(child.id, prevID, nextID);
    }
    
    for(var i = 0; i < children.length; i++){
      pages = pages.concat(connect(children[i]));
    }
    return pages;
  }
}
