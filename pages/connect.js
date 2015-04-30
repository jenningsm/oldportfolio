
/*

  connectPages takes a page hierarchy. Each page in this hierarchy contains
  a function called a generator. Each generator, when passed information
  about that page's neighboring siblings, ancestors, and children within the
  hierarchy, returns a page element for that page. connectPages calls each
  generator in the hierarchy with the relevant arguments and returns a set
  of the generated page elements.

  A page element is any object that will convert directly to the html for
  that page.

  Each page in the hierarchy is an object with the following properties:

   generator: As described above.

   name     : The name of the page, as a string. if this property is not
              included, one will be automatically created. Will be passed
              to neighboring pages' generators.

   info     : This property is optional, and may take any form (ie function,
              string, object) and may contain any information. If it exists,
              it will be passed to neighboring pages' generators.
  
  A page may also be just a single function, in which case that function will
  be interpreted as the page's generator, and the name and info fields will
  be assumed to have been omitted.

  The hierarchy takes the form of a page tree.

  A page tree is an array with the following structure: The first element of
  the array is a page, and this page is interpreted as the root of the tree.
  The rest of the elements in the array are the children of this page, and 
  may be either pages or page trees. Children that are immediately
  adjacent to each other within this array will be interpreted as neighboring
  siblings. 


  the generator functions are expected to return a page element, and will
  be passed the following parameters, in this order:

    children    : an array of pages, each one belonging to one of the
                  page's children, and arranged in order.

    lineage     : An array containing the lineage of this page. The first
                  element will be this page itself, the second element its
                  parent, the third element its grandparent, and so on up
                  to the root.

    prevSibling : The previous neighboring sibling page. If the current page
                  is the first child, then the value of this argument
                  depends on the loop parameter, described below.

    nextSibling : The next neighboring sibling page. If the current page
                  is the last child, then the value of this argument
                  depends on the loop parameter, described below.
  
  
  The loop parameter determines which pages will be passed as the next
  neighboring sibling to the last child and the previous neighboring 
  sibling to the first child.

  If the value of loop is 'stop', then null will be passed to each.
  If the value of loop is 'parent', then the parent will be passed to each.
  if the value of loop is 'loop', then the sibling at the opposite end will
    be passed to each.

*/

var Element = require('/home/mjennings/pagebuilder/html.js');

module.exports = connectPages;
function connectPages(tree, loop){

  //replace functions in the page tree with page objects
  tree = formatted(tree);

  //assign names to those page objects that don't already have them
  assignNames(tree);

  //set the siblings and parent of the root node to null
  //this must be done because the function connect begins with the
  //children, rather than the parent
  tree[0].siblings = [null, null];
  tree[0].par = null

  //connect the pages
  var pageList = connect(tree, [], loop);

  //turn the returned list of pages into a set of pages to be returned
  var pageSet = {};
  for(var i = 0; i < pageList.length; i++){
    pageSet[pageList[i].name] = pageList[i].page;
  }
  return pageSet;
}


////////////////////////////////////////////////


//takes a page tree and returns that tree with all
//bare generator functions replaced by page objects
function formatted(tree){
  if(Array.isArray(tree)){
    var ret = [];
    for(var i = 0; i < tree.length; i++){
      ret.push(formatted(tree[i]));
    }
    return ret;
  } else {
    if(typeof tree === 'function'){
      return {'generator' : tree}
    } else {
      return tree
    }
  }
}

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

//when called on a child, n, get's the direct child, without any of that
//child's descendents, if it has any
function getTop(n){
  if(Array.isArray(n)){
    return n[0];
  } else {
    return n;
  }
}

/*
  takes a page tree, tree, and returns an array of pairs of generated pages
  and their names.

  The function first goes through each of the children
  and notes each child's neighboring siblings. It then passes all the
  children's records, along with the parent's siblings, which should have been 
  noted in the last iteration, to the parent's generator. It returns the page
  generated by the parent's generator concatenated with the return values of
  itself called recursively on each of the children.
*/
function connect(tree, lineage, loop){
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

  lineage = lineage.slice(0);
  lineage.unshift(getPageRecord(par));

  if(children.length === 0){ //leaf node, no children
    return [{
      'name' : par.name,
      'page' : par.generator([], lineage, par.siblings[0], par.siblings[1])
    }]
  } else {

    //this variable is indexed by the value of loop. the function indexed by loop is used to
    //determine the siblings of the two outermost children. The function returns the first sibling
    //of the first child when passed an argument of 0, and the second sibling of the last child
    //when passed an argument of 1.
    var loopValues = {
      'stop' : function () { return null },
      'parent' : function() { return getTop(par) },
      'loop' : function(i) { return getTop(children[(children.length - 1 + i) % children.length]) }
    }
    //note the neighboring siblings of each child
    for(var i = 0; i < children.length; i++){
      var child = getTop(children[i]);
      var prevChild = (i === 0 ? loopValues[loop](0) : getTop(children[i-1]));
      var nextChild = (i === children.length - 1 ? loopValues[loop](1) : getTop(children[i+1]));
      child.siblings = [getPageRecord(prevChild), getPageRecord(nextChild)];
      child.par = getPageRecord(par)
    }
    
    //collect all the child records, to be passed to the generator
    var childrenRecords = [];
    for(var i = 0; i < children.length; i++){
      childrenRecords.push(getPageRecord(getTop(children[i])));
    }

    //generate the page
    var pages = [{
      'name' : par.name,
      'page' : par.generator(childrenRecords, lineage, par.siblings[0], par.siblings[1])
    }];
    //concatenate the page with the pages of all the children
    for(var i = 0; i < children.length; i++){
      pages = pages.concat(connect(children[i], lineage, loop));
    }
    return pages;
  }
}
