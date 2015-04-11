
/*
  returns a tapered line

  x: x coordinate, in percentage, of the center of the line
  y: y coordinate, in percentage, of the center of the line
  axis: direction of the line, either 'horz' for horizontal or 'vert' for vertical
  length: the length, in pixels, of the line
  width: the width, in pixels, of the line
  taperLength: the length, in pixels, of the taper
  color: the color, as a css string,  of the line
*/
function genTaperedLine (x, y, axis, length, width, taperLength, color){
  var group = document.createElementNS('http://www.w3.org/2000/svg','g');
  group.setAttribute('stroke', 'none');
  group.setAttribute('fill', color);

  var line = genLine(x, y, axis, length, width);
  group.appendChild(line);
  for(var i = 0; i < 2; i++){
    var taper = genTaper(x, y, axis, length, width, i === 0, taperLength);
    group.appendChild(taper);
  }
 
  var move = mover(x, y, axis, length, width, taperLength, group, (Math.random() - .5) * 3);

  return {'line' : group, 'mover' : move};
}

function mover(x, y, axis, length, width, taperLength, line, speed){
  var pos = 0;
  var translate, di, start
  if(axis === 'horz'){
    translate = function(x){ return x + ",0" }
    dimindex = 0;
    start = x / 100;
  } else {
    translate = function(x){ return "0," + x }
    dimindex = 1;
    start = y / 100;
  }
  var dir = (speed > 0 ? 1 : -1);
  var wrapAt = (speed > 0 ? 1 : 0);

  return function(dims){
    pos += speed;
    var center = start * dims[dimindex] + pos
    var stretch = taperLength + (length / 2)
    if(dir * (center - stretch * dir) > wrapAt * dims[dimindex]){
      pos -= dir * (dims[dimindex] + length + 2 * taperLength);
    }
    line.setAttribute("transform", "translate(" + translate(pos) + ")");
  }
}

/*
  returns a line without a tapers
  the arguments are the same as the first five for genTaperedLine
*/
function genLine(x, y, axis, length, width){

  x = x + '%';
  y = y + '%';

  var line = document.createElementNS('http://www.w3.org/2000/svg','rect');
  line.setAttribute("x", x);
  line.setAttribute("y", y);
  var transform = [];
  if(axis === 'horz'){
    line.setAttribute("width", length);
    line.setAttribute("height", width);
    transform = [-length / 2, -width / 2];
  } else {
    line.setAttribute("width", width);
    line.setAttribute("height", length);
    transform = [-width / 2, -length / 2];
  }
  line.setAttribute('transform', 'translate(' + transform[0] + ',' + transform[1] + ')');
  return line;
}

/*
  returns a taper
  the first five arguments are the same as the first five of genTaperedLine and 
  are the dimensions of the line this taper will be at the end of

  dir is a boolean specifying whether the taper should be at the positive (true) or negative (false) end of the line
  taperLength is the length, in pixels, for the taper
*/
function genTaper(x, y, axis, length, width, dir, taperLength){

  width = width / 2;
  x = x + '%';
  y = y + '%';

  var taper = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
  taper.setAttribute('cx', x );
  taper.setAttribute('cy', y);

  var transform = [];
  if(axis === 'horz'){
    taper.setAttribute('ry', width );
    taper.setAttribute('rx', taperLength );
    taper.setAttribute('fill', 'url(#' + (dir ? 'right' : 'left') + '-horz-grad)');
    transform = [ length / 2, 0];
    transform[0] *= (dir ? 1 : -1);
  } else {
    taper.setAttribute('rx', width );
    taper.setAttribute('ry', taperLength );
    taper.setAttribute('fill', 'url(#' + (dir ? 'bottom' : 'top') + '-vert-grad)');
    transform = [ 0, length / 2];
    transform[1] *= (dir ? 1 : -1);
  }
  taper.setAttribute('transform', 'translate(' + transform[0] + ',' + transform[1] + ')');

  return taper;
}

