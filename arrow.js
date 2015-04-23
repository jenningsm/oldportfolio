var Element = require('/home/mjennings/pagebuilder/html.js')
var colors = require('./colors.js')
var color = colors.colorString(colors.scolor)

function truncate(number, precision){
  number = number * Math.pow(10, precision)
  number = Math.round(number)
  return number / Math.pow(10, precision)
}

module.exports = function(dir, unit, size){

  var ratio = 5;
  var width = size / 30;

  var insize = size - 2 * width;

  var dims;
  if(dir === 'left' || dir === 'right'){
    dims = [insize / ratio, insize]
  } else {
    dims = [insize, insize / ratio]
  }

  var points = []
  for(var i = 0; i < 3; i++){
    points.push(i / 2);
    points.push(i % 2); 
  }
  for(var i = 0; i < 3; i++){
    if(dir === 'left' || dir === 'up'){
      points[i * 2 + 1] = 1 - points[i * 2 + 1];
    }
    if(dir === 'left' || dir === 'right'){
      var hold = points[i * 2];
      points[i * 2] = points[i * 2 + 1];
      points[i * 2 + 1] = hold;
    }
  }

  var pointString = '';
  for(var i = 0; i < 3; i++){
    pointString += truncate(points[i * 2] * dims[0] + width, 1) + ',' + truncate(points[i * 2 + 1] * dims[1] + width, 1) + ' ';
  }

  var line = new Element('polyline/').attribute({
    'fill' : 'none',
    'stroke' : color,
    'stroke-width' : truncate(width, 1),
    'stroke-linecap' : 'round',
    'stroke-linejoin' : 'round',
    'points' : pointString 
  })

  return new Element('svg').attribute({
    'xmlns' : 'http://www.w3.org/2000/svg',
    'version' : '1.1',
    'height' : truncate(2 * width + dims[1], 1) + unit,
    'width' : truncate(2 * width + dims[0], 1) + unit,
  })
  .content(line)
  .style({
    'cursor': 'pointer',
    'padding': '7px'
  })
}
