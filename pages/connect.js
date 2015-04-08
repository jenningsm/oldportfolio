
/*

  connectPages takes a page tree composed of page objects, and connects
  the page objects. Each of these terms is defined below.

  TERMS:

  a page element is an object with a generate() function which will 
  return the actual html for that page.

  A page object represents a page. It may come in two forms. The first form
  is an object with the following properties:
 
   generator: A function which takes info about the page's
              siblings and children, and returns a page element.

   name     : The name of the page, as a string. if this property is not
              included, one will be automatically created.

   info     : This property is entirely optional, and may take any form
              (ie function, string, object). If it exists, it will be passed,
              along with name, to the page object's parent's generator.
              The parent may use this information to determine how to
              link to it (ie you may include a short description of the page
              that the parent will include below the link to it)

  The second form is a single function. If it comes in this form, the function
  will be interpreted as the generate property of a page object of the first
  form, without name or info properties.

  A page record is the same as a page object, except that it does not have the
  generator property.

  A page tree represents a page hierarchy. It is passed in the form of
  an array. The first element of this array must be a page object, and
  this object is the root of the tree. The rest of the elements in the array are the
  children of this node, and may be either page objects, or page trees
  themselves. The order of these elements are preserved. The siblings passed
  to the generator functions (described below) of each child will be those
  adjacent to each child within this array.



  the generator functions are expected to return a page element, and will
  be passed the following parameters, in this order:

    children    : an array of page records, each one belonging to one of the
                  page's children, and arranged in order.

    name        : The name this page.

    nextSibling : The page record of the next sibling. If page being generated
                  is the last sibling, then this will be the page record of
                  the page's parent.

    prevSibling : The page record of the previous sibling. If the page being
                  generated is the first sibling, then this will be the page
                  record of the page's parent.
  
  The information contained in these arguments is used to generate links. 

*/

var Element = require('/home/mjennings/pagebuilder/html.js');

module.exports = connectPages;
function connectPages(tree){

  //replace functions in the page tree with page objects
  tree = formatted(tree);

  //assign names to those page objects that don't already have them
  assignNames(tree);

  //set the neighbors of the root node to null
  tree[0].neighbors = [null, null];

  //connect the pages
  var pageList = connect(tree);

  //turn the returned list of pages into a set of pages to be returned
  var pageSet = {};
  for(var i = 0; i < pageList.length; i++){
    pageSet[pageList[i].name] = pageList[i].page;
  }
  return pageSet;
}


////////////////////////////////////////////////


//returns an iterator that iterates through
//each of the page objects in a page tree
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

//takes a page tree and returns that tree with all
//bare generator functions replaced by page objects
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

//takes a page object and returns its page record
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

//takes a page tree, connects all the page objects,
//and returns an array of name, page element pairs
function connect(tree){
  // the parent, or root node of the tree
  var par;
  //the children
  var children;
  if(Array.isArray(tree)){
    par = tree[0];
    children = tree.slice(1);
  } else {
    par = tree;
    children = [];
  }
  if(children.length === 0){ //leaf node, no children
    return [{
             'name' : par.name,
             'page' : par.generator([], par.name, par.neighbors[0], par.neighbors[1])
           }]
  } else {
    //set the neighbors of each child
    for(var i = 0; i < children.length; i++){
      var child = getTop(children[i]);
      var prevChild = (i === 0 ? par : getTop(children[i-1]));
      var nextChild = (i === children.length - 1 ? par : getTop(children[i+1]));
      child.neighbors = [getPageRecord(prevChild), getPageRecord(nextChild)];
    }
    
    //collect all the child records, to be passed to the generator
    var childrenRecords = [];
    for(var i = 0; i < children.length; i++){
      childrenRecords.push(getPageRecord(children[i]));
    }

    var pages =
      [{
        'name' : par.name,
        'page' : par.generator(childrenRecords, par.name, par.neighbors[0], par.neighbors[1])
      }];
    for(var i = 0; i < children.length; i++){
      pages = pages.concat(connect(children[i]));
    }
    return pages;
  }
}
