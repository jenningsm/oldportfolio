
var Element = require('/home/mjennings/pagebuilder/html.js');
var arrow = require('../arrow.js')

module.exports.pageContainer = function(){
  return new Element('div').style({
    'display' :'none',
    'width' : '100%',
    'height' : '100%',
    'position' : 'absolute',
  })
}

module.exports.flexBox = flexBox
function flexBox(){
  return new Element('div').style({
    'display' : 'flex',
    'justify-content' : 'center',
    'align-items' : 'center',
    'flex-direction' : 'column',
    'position' : 'absolute',
    'width' : '100%',
    'height' : '100%',
  })
}

module.exports.backArrow = function(){
  return flexBox().content(
    arrow('up', '', 90)
    .attribute('onclick', 'history.back()')
  ).style({
    'width' : '100%',
    'height' : '21%',
    'top': '0',
    'position': 'absolute',
  })
}

module.exports.transition = transition;
function transition(to, dir, action){
  return 'toPage(&quot;' + to + '&quot;,&quot;' + dir + '&quot;,&quot;' + action + '&quot;)'
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
      buttons[i].attribute('onclick', transition(targets[i], (i === 1 ? 'right' : 'left'), 'replace'))
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

