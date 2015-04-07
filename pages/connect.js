
var Element = require('/home/mjennings/pagebuilder/html.js');

module.exports = function(structure){

  assignNames(structure);
  structure[0].generator = structure[0].generator(structure[0].name, null, null);
  var pageList = connect(structure);

  var pageSet = {};
  for(var i = 0; i < pageList.length; i++){
    pageSet[pageList[i].name] = pageList[i].page;
  }
  return pageSet;
}


function iterator(structure){
  var items = [];
  function collate(s){
    if(Array.isArray(s)){
      for(var i = 0; i < s.length; i++){
        collate(s[i]);
      }
    } else {
      items.push(s);
    }
  }
  collate(structure);
  var i = 0;
  return function(){
    if(i === items.length){
      return null;
    }
    return items[i++];
  }
}

var count = 0;
function assignNames(structure){
  var iter, item;

  //get all the names that have already been assigned
  //so we can avoid collisions when assigning new names
  var names = {};
  iter = iterator(structure);
  while((item = iter()) !== null){
    names[item.name] = true;
  }
  
  //assign names to those that don't already have them
  iter = iterator(structure);
  while((item = iter()) !== null){
    if(item.name === undefined){
      //make sure the new name doesn't collide
      //with any existing names
      while(names[count] !== undefined){
        count++;
      }
      item.name = count++;
    }
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
    return [{'name' : par.name, 'page' : par.generator([])}];
  } else {
    for(var i = 0; i < children.length; i++){
      var child = getTop(children[i]);
      var prevChildName = (i === 0 ? par.name : getTop(children[i-1]).name);
      var nextChildName = (i === children.length - 1 ? par.name : getTop(children[i+1]).name);
      child.generator = child.generator(child.name, prevChildName, nextChildName);
    }
    
    var childrenNameMap = [];
    for(var i = 0; i < children.length; i++){
      var child = getTop(children[i]);
      var childRecord = {'name' : child.name};
      if(child.info !== undefined){
        childRecord.info = child.info;
      }
      childrenNameMap.push(childRecord);
    }

    var pages = [{'name' : par.name, 'page' : par.generator(childrenNameMap)}];
    for(var i = 0; i < children.length; i++){
      pages = pages.concat(connect(children[i]));
    }
    return pages;
  }
}
