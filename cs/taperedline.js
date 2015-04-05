
function genTaperedLine (x, y, axis, length, width, taperLength, color){
  var group = document.createElementNS('http://www.w3.org/2000/svg','g');
  group.setAttribute('stroke', 'none');
  group.setAttribute('fill', color);
  var dirs = [];
  if(axis === 'vert'){
    dirs = ['bottom', 'top'];
  } else {
    dirs = ['right', 'left'];
  }
  var line = genLine(x, y, axis, length, width);
  group.appendChild(line);
  for(var i = 0; i < 2; i++){
    var taper = genTaper(x, y, dirs[i], length, width, taperLength);
    group.appendChild(taper);
  }
 
  return group;
}

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
  Here, the first five arguments are the dimensions of the line the taper belongs to,
  while the last argument, taper, is the actual length of the taper.
*/
function genTaper(x, y, dir, length, width, taperLength){

  console.log(x, y, dir, length, width, taperLength);
  width = width / 2;
  x = x + '%';
  y = y + '%';

  var taper = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
  taper.setAttribute('cx', x );
  taper.setAttribute('cy', y);

  var transform = [];
  if(dir === 'left' || dir === 'right'){
    taper.setAttribute('ry', width );
    taper.setAttribute('rx', taperLength );
    taper.setAttribute('fill', 'url(#' + dir + '-horz-grad)');
    transform = [ length / 2, 0];
    transform[0] *= (dir === 'left' ? -1 : 1);
  } else {
    taper.setAttribute('rx', width );
    taper.setAttribute('ry', taperLength );
    taper.setAttribute('fill', 'url(#' + dir + '-vert-grad)');
    transform = [ 0, length / 2];
    transform[1] *= (dir === 'top' ? -1 : 1);
  }
  taper.setAttribute('transform', 'translate(' + transform[0] + ',' + transform[1] + ')');

  return taper;
}

