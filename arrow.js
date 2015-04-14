var Element = require('/home/mjennings/pagebuilder/html.js')
var colors = require('./colors.js')
var color = colors.colorString(colors.scolor)

module.exports = function(dir, unit, size){

  var ratio = 5;
  var width = 3;

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
    pointString += (points[i * 2] * dims[0] + width) + ',' + (points[i * 2 + 1] * dims[1] + width) + ' ';
  }

  var line = new Element('polyline/').attribute({
    'fill' : 'none',
    'stroke' : color,
    'stroke-width' : width,
    'stroke-linecap' : 'round',
    'stroke-linejoin' : 'round',
    'points' : pointString 
  })

  return new Element('svg').attribute({
    'xmlns' : 'http://www.w3.org/2000/svg',
    'version' : '1.1',
    'height' : (2 * width + dims[1]) + unit,
    'width' : (2 * width + dims[0]) + unit,
  })
  .content(line)
}
