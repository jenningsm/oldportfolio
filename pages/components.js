
var Element = require('/home/mjennings/pagebuilder/html.js');

module.exports.full = function(){
  return new Element('div').style({
    'width' : '100%',
    'height' : '100%',
    'position' : 'absolute'
  });
}

module.exports.backButton = function(){
  return edgeButton(false).content(
    "- BACK -"
  )
}

module.exports.browseButtons = function(curr, prev, next){
  return edgeButton(true).content(
    '-&nbsp;',
    new Element('span').content('PREV').attribute('onclick', 'toPage(pages.' + curr + ',pages.' + prev + ',false)'),
    '&nbsp;|&nbsp;',
    new Element('span').content('NEXT').attribute('onclick', 'toPage(pages.' + curr + ',pages.' + next + ',true)'),
    '&nbsp;-'
  );
}

module.exports.font = font;
function font(size, weight){
  if(weight === undefined){
    weight = '400';
  }
  return {
    'font-weight' : weight,
    'font-size': size + 'em',
  }
}


// pos specifies whether the button should be at the top (true) or bottom (false) of the page
function edgeButton(pos){
  return new Element('div').style({
    'width' : '100%',
    'height' : '12%',
    'display' : 'flex',
    'align-items' : 'center',
    'justify-content' : 'center',
    'position' : 'absolute'
    },
    font(1.4)
  ).style((pos ? 'top' : 'bottom'), '0%');
}

