
var Element = require('/home/mjennings/pagebuilder/html.js');

module.exports.pageContainer = function(){
  return new Element('div').style({
    'display' :'none',
    'width' : '100%',
    'height' : '100%',
    'position' : 'absolute',
  })
}

module.exports.flexBox = function(){
  return new Element('div').style({
    'display' : 'flex',
    'justify-content' : 'center',
    'align-items' : 'center',
    'flex-direction' : 'column',
    'width' : '100%',
    'height' : '100%',
    'position' : 'absolute'
  })
}

module.exports.backButton = function(){
  return edgeButton(false).content(
    "- BACK -"
  ).attribute('onclick', 'history.back()')
}

module.exports.browseButtons = function(curr, prev, next){
  var prevButton = new Element('span').content('PREV');
  var nextButton = new Element('span').content('NEXT');
  
  var buttons = [prevButton, nextButton];
  var targets = [];
  for(var i = 1 ; i < 3; i++){
    if(arguments[i] === null){
      targets.push(null)
    } else {
      targets.push(arguments[i].name)
    }
  }

  for(var i = 0; i < buttons.length; i++){
    if(targets[i] !== null){
      buttons[i].attribute('onclick', transition(targets[i], (i === 1 ? 'right' : 'left')))
    } else {
      buttons[i].style('opacity', '.5')
    }
  }

  return edgeButton(true).content(
    '-&nbsp;',
    prevButton,
    '&nbsp;|&nbsp;',
    nextButton,
    '&nbsp;-'
  )
}

module.exports.transition = transition;
function transition(to, dir){
  return 'toPage(&quot;' + to + '&quot;,&quot;' + dir + '&quot;)'
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
    'height' : '15%',
    'display' : 'flex',
    'align-items' : 'center',
    'justify-content' : 'center',
    'position' : 'absolute'
    },
    font(1.3)
  ).style((pos ? 'top' : 'bottom'), '0%');
}

