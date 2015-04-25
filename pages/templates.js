

var Element = require('/home/mjennings/pagebuilder/html.js')
var coms = require('./components.js')

module.exports.titledInfo = function(){
  var div = new Element('div')
  div.content(coms.underline(arguments[0], true).style('font-size', '1.2em'))
  for(var i = 1; i < arguments.length; i++){
    div.content(new Element('p').content(arguments[i]))
  }
  return div
}

module.exports.linkedContainer = function(name, content, siblings, child, width){
  if(width === undefined)
    width = 30

  return {
    'generator' :
    function(children, lineage, prev, next){
      var page = coms.pageContainer().content(
        coms.arrowBox('up', coms.up(coms.transition(lineage[1].name, 'down'))).style('z-index', '1'),
        coms.flexBox().content(
          content.style('max-width', width + '%')
        )
      )
      if(siblings === true){
        page.content(coms.arrowBox('left', coms.transition(prev.name, 'right')).style('z-index' , 1))
        page.content(coms.arrowBox('right', coms.transition(next.name, 'left')).style('z-index' , 1))
      }
      if(child === true){
        page.content(coms.arrowBox('down', coms.transition(children[0].name, 'up')).style('z-index', '1'))
      }

      return {'page' : page, 'url' : getUrl(lineage) }
    },
    'name' : name
  }
}

function getUrl(lineage){
  var url = [];
  for(var i = 0; i < lineage.length - 1; i++){
    url.unshift(lineage[i].name)
  }
  return url.join('/')
}


