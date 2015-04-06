
module.exports = pages;


var coms = require('./components.js');
var Element = require('/home/mjennings/pagebuilder/html.js');

function pages(){
  var front =  title()
  var onep = test('| ONE |', ['one', 'front', 'two']);
  var twop = test('| TWO |', ['two', 'one', 'front']);
  var pages = {'front' : front, 'one' : onep, 'two' : twop};
  return pages;
}


function title(){
  return coms.full().content(
    new Element('div').style({
      'display' :'flex',
      'justify-content' : 'center',
      'align-items':'center',
      'top' : '50%',
      'left' : '50%',
      'transform' : 'translate(-50%, -50%)',
      'position' : 'absolute'
      },
      coms.font(1.7)
    ).content(
      '| MICHAEL JENNINGS |'
    ),
    coms.browseButtons('front', 'two', 'one')
  )
}

function test(content, pages){
  return coms.full().content(
    new Element('div').style({
      'display' :'flex',
      'justify-content' : 'center',
      'align-items':'center',
      'top' : '50%',
      'left' : '50%',
      'transform' : 'translate(-50%, -50%)',
      'position' : 'absolute'
      },
      coms.font(1.7)
    ).content(
      content
    ),
    coms.browseButtons(pages[0], pages[1], pages[2])
  ).style('display', 'none');
}

