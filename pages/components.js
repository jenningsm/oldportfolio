
var Element = require('/home/mjennings/pagebuilder/html.js');
var arrow = require('../arrow.js')
var colors = require('../colors.js')


module.exports.pageContainer = pageContainer
function pageContainer(){
  return new Element('div').style({
    'display' :'none',
    'width' : '100%',
    'height' : '100%',
    'position' : 'absolute',
    'text-align' : 'center'
  })
  .style(font(1.3))
}

module.exports.flexBox = flexBox
function flexBox(){
  return new Element('div').style({
    'display ' : '-webkit-flex',
    '-webkit-justify-content' : 'center',
    '-webkit-align-items' : 'center',
    '-webkit-flex-direction' : 'column',
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
var length = [90, 50]
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

module.exports.link = function(text, page, dir){
  return underline(text)
  .attribute('onclick', transition(page, dir))
  .style('cursor', 'pointer')
}

module.exports.outLink = function(text, link, emphasis){
  return new Element('a').content(
    underline(text, emphasis)
  )
  .style({
    'text-decoration' : 'none',
    'outline' : 'none',
    'color' : colors.colorString(colors.scolor)
  })
  .attribute('href', link)
}

module.exports.transition = transition;
function transition(to, dir){
  return 'toPage(&quot;' + to + '&quot;,&quot;' + dir + '&quot;)'
}

//goes up in the history
//transition is the transition that will take place if there is no history
module.exports.up = function(transition){
  return "up(function(){" + transition + "})"
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
