
var Element = require('/home/mjennings/pagebuilder/html.js');

module.exports = connectPages;
function connectPages(tree){
  tree = formatted(tree);
  assignNames(tree);
  tree[0].neighbors = [null, null];
  var pageList = connect(tree);

  var pageSet = {};
  for(var i = 0; i < pageList.length; i++){
    pageSet[pageList[i].name] = pageList[i].page;
  }
  return pageSet;
}

//returns an iterator that iterates through
//each of the elements in a page tree
function iterator(tree){
  var items = [];
  (function collate(s){
    if(Array.isArray(s)){
      for(var i = 0; i < s.length; i++){
        collate(s[i]);
      }
    } else {
      items.push(s);
    }
  })(tree);

  var i = 0;
  return function(){
    if(i === items.length){
      return null;
    }
    return items[i++];
  }
}

//takes a page tree and returns that tree with
//all generators replaced by page objects
function formatted(tree){
  if(Array.isArray(tree)){
    var ret = [];
    for(var i = 0; i < tree.length; i++){
      ret = ret.concat(formatted(tree[i]));
    }
    return ret;
  } else {
    if(typeof tree === 'function'){
      return [{'generator' : tree}]
    } else {
      return [tree]
    }
  }
}

//goes through a page tree and assigns arbitrary names to those
//page objects that don't already have them
var count = 0;
function assignNames(tree){
  var iter, item;

  //get all the names that have already been assigned
  //so we can avoid collisions when assigning new names
  var names = {};
  iter = iterator(tree);
  while((item = iter()) !== null){
    names[item.name] = true;
  }
  
  //assign names to those that don't already have them
  iter = iterator(tree);
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
 
function connect(tree){
  var par;
  var children;
  if(Array.isArray(tree)){
    par = tree[0];
    children = tree.slice(1);
  } else {
    par = tree;
    children = [];
  }
  if(children.length === 0){
    return [{
             'name' : par.name,
             'page' : par.generator([], par.name, par.neighbors[0], par.neighbors[1])
           }]
  } else {
    for(var i = 0; i < children.length; i++){
      var child = getTop(children[i]);
      var prevChildName = (i === 0 ? par.name : getTop(children[i-1]).name);
      var nextChildName = (i === children.length - 1 ? par.name : getTop(children[i+1]).name);
      child.neighbors = [prevChildName, nextChildName];
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

    var pages =
      [{
        'name' : par.name,
        'page' : par.generator(childrenNameMap, par.name, par.neighbors[0], par.neighbors[1])
      }];
    for(var i = 0; i < children.length; i++){
      pages = pages.concat(connect(children[i]));
    }
    return pages;
  }
}
