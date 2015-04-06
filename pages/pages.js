
module.exports = pages;


var coms = require('./components.js');
var Element = require('/home/mjennings/pagebuilder/html.js');

function pages(){
  var front = midContent('| MICHAEL JENNINGS |')('front', 'two', 'one').style('display', 'block');
  var onep = midContent('| ONE |')('one', 'front', 'two');
  var twop = midContent('| TWO |')('two', 'one', 'front');
  var pages = {'front' : front, 'one' : onep, 'two' : twop};
  return pages;
}


function midContent(content){
  return function(currPage, prevPage, nextPage){
    return coms.full().content(
      new Element('div').style({
        'display' :'flex',
        'justify-content' : 'center',
        'align-items':'center',
        'width' : '100%',
        'height' : '100%',
        'position' : 'absolute'
        },
        coms.font(1.7)
      ).content(
        content
      ),
      coms.browseButtons(currPage, prevPage, nextPage),
      coms.backButton()
    ).style('display', 'none');
  }
}

