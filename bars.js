
var Element = require('/home/mjennings/pagebuilder/html.js');

function bar(dir, size, scolor, tcolor){
  var s = {
    'width' : '100%',
    'height' : size + '%',
    'position' : 'absolute'
  }
  s[dir] = '0%';
  var div = new Element('div').style(
    s
  );
  
  var positioning = {
    'width' : '100%',
    'height' : '100%',
    'position' : 'absolute'
  }
  var svg = new Element('svg').attribute({
    'xmlns' : 'http://www.w3.org/2000/svg', 
    'version' : '1.1'
  }).style(positioning).content(
    new Element('defs').content(
      svgLinearGrad(tcolor)
    )
  );

  var gradient = new Element('div')
  .style(linearGradient(dir, scolor, 'rgba(0, 0, 0, 0)'))
  .style(positioning)
  .style('z-index', '1');

  return [div.content(svg, gradient), {'svg': svg}];
}

module.exports = bar;


function linearGradient(dir, start, stop){
  return prefix('background', 'linear-gradient(to ' + dir + ', ' + start + ', ' + stop + ')');
}

function prefix(style, value, prefixes){
  if(prefixes === undefined){
    prefixes = ['webkit', 'o', 'moz'];
  }
  var prefixed = {};
  for(var i = 0; i < prefixes.length; i++){
    prefixed['-' + prefixes[i] + '-' + style] = value;
  }
  prefixed[style] = value;
  return prefixed;
}

function svgLinearGrad(tcolor){
  return function(k){
    if(k === 4){
      return null;
    }
    var i = Math.floor(k / 2);
    var j = k % 2;
    function cstop(){
      return new Element('stop').style('stop-color', tcolor);
    };
  
    return new Element('linearGradient')
    .attribute('id', (i === 0 ? (j === 0 ? 'right' : 'left') : (j === 0 ? 'top' : 'bottom')) + '-' + (i === 0 ? 'horz' : 'vert') + '-grad')
    .attribute('x1', (i === 0 && j === 1 ? '100%' : 0))
    .attribute('y1', (i === 1 && j === 0 ? '100%' : 0))
    .attribute('x2', (i === 0 && j === 0 ? '100%' : 0))
    .attribute('y2', (i === 1 && j === 1 ? '100%' : 0))
    .content(
      cstop().attribute({'offset' : '0%', 'stop-opacity' : '1'}),
      cstop().attribute({'offset' : '100%', 'stop-opacity' : '0'})
    )
  }
}
