
//creates the top and bottom bars of the page

var Element = require('/home/mjennings/pagebuilder/html.js');
var css = require('./tools/cssshortcuts.js');
var util = require('./tools/util.js');

function bar(dir, size, scolor, tcolor){
  var positioning = {
    'width' : '100%',
    'height' : size + '%',
    'position' : 'absolute'
  }
  positioning[dir] = '0%';

  var svg = new Element('svg').attribute({
    'xmlns' : 'http://www.w3.org/2000/svg', 
    'version' : '1.1'
  })
  .style(positioning)
  .content(
    new Element('defs').content(
      svgLinearGrad(tcolor)
    )
  );

  var gradient = new Element('div')
  .style(
     css.linearGradient(dir, util.colorString(scolor), 'rgba(0, 0, 0, 0)'),
     positioning,
     {'z-index': '1'}
  );

  return [[svg, gradient], {'svg': svg}];
}

module.exports = bar;




/////////////////////////////////////

function svgLinearGrad(tcolor){
  return function(k){
    if(k === 4){
      return null;
    }
    var i = Math.floor(k / 2);
    var j = k % 2;
    function cstop(){
      return new Element('stop').style('stop-color', util.colorString(tcolor));
    };
  
    return new Element('linearGradient')
    .attribute('id', (i === 0 ? (j === 0 ? 'right' : 'left') : (j === 0 ? 'top' : 'bottom')) + '-' + (i === 0 ? 'horz' : 'vert') + '-grad')
    .attribute('x1', (i === 0 && j === 1 ? '100%' : 0))
    .attribute('y1', (i === 1 && j === 0 ? '100%' : 0))
    .attribute('x2', (i === 0 && j === 0 ? '100%' : 0))
    .attribute('y2', (i === 1 && j === 1 ? '100%' : 0))
    .content(
      cstop().attribute({'offset' : '49.99%', 'stop-opacity' : '0'}),
      cstop().attribute({'offset' : '50%', 'stop-opacity' : '1'}),
      cstop().attribute({'offset' : '100%', 'stop-opacity' : '0'})
    )
  }
}

