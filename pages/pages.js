
module.exports = pages;


var coms = require('./components.js');
var Element = require('/home/mjennings/pagebuilder/html.js');

function pages(color){
  var front = coms.full(color)
  .content(
    title(),
    coms.browseButtons()
  );
  var pages = {'front' : front};
  return pages;
}


function title(){
  return new Element('div').style({
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
  )
}

