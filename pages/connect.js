
/*

  connectPages takes a page tree composed of page objects, and connects
  the page objects. Each of these terms is defined below.

  A page object represents a page. It has the following properties:
 
   generator: a function which takes info about the page's
              siblings and children, and returns a page element.
              The page element is the actual Element object that
              will generate the page's html.

   name     : the name of the page, as a string. if this property is not
              included, one will be automatically created.

   info     : this property is entirely optional, and may take any form
              (ie function, string, object). If it exists, it will be passed,
              along with name, to the page object's parent's generator.
              The parent may use this information to determine how to
              link to it (ie you may include a short description of the page
              that the parent will include below the link to it)

  A page tree represents a page hierarchy. It is passed in the form of
  an array. The first element of this array must be a page object, and
  this object is the root of the tree. The rest of the elements in the array are the
  children of this node, and may be either page objects, or page trees
  themselves.

  Additionally at any point where a page object would be passed in, a
  single function may be passed in instead, in which case the function
  will be interpreted as the generator of a page object with no name
  or info properties.

  generator functions will be passed the following parameters, in this order:

    children    : an array of child objects. Each of these child objects will
                  be the same as that child's page object, except that it will
                  not have the generator property. The data in each child
                  object is used to determine how to link to that child.

    name        : The name this page.

    nextSibling : The name of the next sibling. If the page being generated
                  is the last sibling, then this will be the name of the
                  page's parent.

    prevSibling : The name of the previous sibling. If the page being
                  generated is the first sibling, then this will be the name
                  of the page's parent.
  
  The information contained in these arguments is used to generate links. 

*/

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

function getPageRecord(page){
  var record = {'name' : page.name};
  if(page.info !== undefined){
    record.info = page.info;
  }
  return record;
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
      var prevChild = (i === 0 ? par : getTop(children[i-1]));
      var nextChild = (i === children.length - 1 ? par : getTop(children[i+1]));
      child.neighbors = [getPageRecord(prevChild), getPageRecord(nextChild)];
    }
    
    var childrenNameMap = [];
    for(var i = 0; i < children.length; i++){
      childrenNameMap.push(getPageRecord(children[i]));
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
