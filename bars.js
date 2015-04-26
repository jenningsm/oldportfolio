
var Element = require('/home/mjennings/pagebuilder/html.js');
var css = require('./css.js');
var colors = require('./colors.js')

module.exports = function(dir, size){
  var positioning = {
    'width' : '100%',
    'height' : size + '%',
    'position' : 'absolute'
  }
  positioning[dir] = '0%';

  var canvas = new Element('canvas')
  .style(positioning)

  var gradient = new Element('div')
  .style(
     css.linearGradient(dir, colors.colorString(colors.scolor.concat([.5])), 'rgba(0, 0, 0, 0)'),
     positioning,
     {'z-index': '1'}
  );

  return {'canvas': canvas, 'gradient' : gradient}
}



