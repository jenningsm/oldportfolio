
var Element = require('/home/mjennings/pagebuilder/html.js');
var arrow = require('../arrow.js')

module.exports.pageContainer = function(){
  return new Element('div').style({
    'display' :'none',
    'width' : '100%',
    'height' : '100%',
    'position' : 'absolute',
    'text-align' : 'center',
  })
  .style(font(1.3))
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

var breadth = 21;
module.exports.arrow = function(dir, onclick){
  var pe = (onclick !== undefined ? 'auto' : 'none')
  var a = flexBox().content(
    arrow(dir, '', 90)
    .attribute('onclick', onclick)
    .style('pointer-events', pe)
  ).style({
    'position': 'absolute',
    'pointer-events' : 'none'
  })

  if(dir === 'left' || dir === 'right'){
    a.style({
      'height' : '100%',
      'width' : breadth + '%'
    })
    a.style(dir, 0)
  } else {
    a.style({
      'width' : '100%',
      'height' : breadth + '%'
    })
    a.style(dir === 'up' ? 'top' : 'bottom', 0)
  }
  return a
}

module.exports.link = function(text, page, dir, action){
  return new Element('span')
  .content(text)
  .attribute('onclick', transition(page, dir, action))
  .style({
    'cursor' : 'pointer',
    'border-bottom' : '1px solid',
  })
}

module.exports.transition = transition;
function transition(to, dir, action){
  return 'toPage(&quot;' + to + '&quot;,&quot;' + dir + '&quot;,&quot;' + action + '&quot;)'
}

module.exports.font = font;
function font(size, unit, weight){
  if(weight === undefined){
    weight = '400'
  }
  if(unit === undefined){
    unit = 'em'
  }
  return {
    'font-weight' : weight,
    'font-size': size + unit
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

