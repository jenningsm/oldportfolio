
var Element = require('/home/mjennings/pagebuilder/html.js');
var arrow = require('../arrow.js')
var colors = require('../colors.js')

module.exports.titledInfo = function(){
  var div = new Element('div')
  div.content(underline(arguments[0], true).style('font-size', '1.2em'))
  for(var i = 1; i < arguments.length; i++){
    div.content(new Element('p').content(arguments[i]))
  }
  return div
}

module.exports.plainInfo = function(name, content, siblings, child, width){

  if(width === undefined)
    width = 30

  return {
    'generator' :
    function(children, par, prev, next){
      var page = pageContainer().content(
        arrowBox('up', conditionalBack(par.name)).style('z-index', '1'),
        flexBox().content(
          content.style('max-width', width + '%')
        )
      )
      if(siblings === true){
        page.content(arrowBox('left', transition(prev.name, 'right', 'replace')).style('z-index' , 1))
        page.content(arrowBox('right', transition(next.name, 'left', 'replace')).style('z-index' , 1))
      }
      if(child === true){
        page.content(arrowBox('down', transition(children[0].name, 'up', 'push')).style('z-index', '1'))
      }
      return page
    },
    'name' : name
  }
}
module.exports.pageContainer = pageContainer
function pageContainer(){
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

var breadth = [21, 12]
var length = [90, 55]
module.exports.arrowBox = arrowBox
function arrowBox(dir, onclick){
  var dim = (dir === 'left' || dir === 'right' ? 1 : 0)

  var pe = (onclick !== undefined ? 'auto' : 'none')
  var a = flexBox().content(
    arrow(dir, '', length[dim])
    .attribute('onclick', onclick)
    .style('pointer-events', pe)
    .style('padding', (30 - breadth[dim]) + 'px')
  ).style({
    'position': 'absolute',
    'pointer-events' : 'none'
  })

  if(dim === 1){
    a.style({
      'height' : '100%',
      'width' : breadth[1] + '%',
    })
    a.style(dir, 0)
  } else {
    a.style({
      'width' : '100%',
      'height' : breadth[0] + '%',
    })
    a.style(dir === 'up' ? 'top' : 'bottom', 0)
  }
  return a
}

var underlineDist = .17
module.exports.underline = underline
function underline(text, spaced){
  var opacity, spacing
  if(spaced !== undefined){
    opacity = 1
    spacing = underlineDist * .7
  } else {
    opacity = .65
    spacing = underlineDist
  }
  var style = {'position':'relative', 'display':'inline-block'}
  return new Element('span')
  .style(
    {
      'top': '-' + spacing + 'em',
      'border-bottom': '1px solid ' + colors.colorString(colors.scolor.concat([opacity]))
    },
    style
  ).content(
    new Element('span').style('top', spacing + 'em').content(
      text
    )
    .style(style)
  )
}

module.exports.link = function(text, page, dir, action){
  return underline(text)
  .attribute('onclick', transition(page, dir, action))
  .style('cursor', 'pointer')
}

module.exports.conditionalBack = conditionalBack
function conditionalBack(par){
  return 'conditionalBack(function() {' + transition(par, 'down', 'replace') + '})'
}

module.exports.transition = transition;
function transition(to, dir, action){
  return 'toPage(&quot;' + to + '&quot;,&quot;' + dir + '&quot;,&quot;' + action + '&quot;)'
}

module.exports.font = font;
function font(size, unit, weight){
  if(weight === undefined){
    weight = '300'
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

