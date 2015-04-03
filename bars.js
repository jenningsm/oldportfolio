
var Element = require('/home/mjennings/pagebuilder/html.js');

function bar(dir, size, color){
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
  }).style(positioning);

  var gradient = new Element('div')
  .style(linearGradient(dir, color, 'rgba(0, 0, 0, 0)'))
  .style(positioning)
  .style('z-index', '1');

  return [div.content(svg, gradient), {'svg': svg}];
}


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

module.exports = bar;
