
function genTaperedLine (axis, x, y, length, width, taper, color, unit){
  var group = document.createElementNS('http://www.w3.org/2000/svg','g');
  group.setAttribute('stroke', 'none');
  group.setAttribute('fill', color);
  var ends = [];
  var dirs = [];
  if(axis === 'vert'){
    ends = [x, y + length / 2, x, y - length / 2];
    dirs = ['bottom', 'top'];
  } else {
    ends = [x + length / 2, y, x - length / 2, y];
    dirs = ['right', 'left'];
  }
  var line = genLine(ends[0], ends[1], ends[2], ends[3], width, unit);
  group.appendChild(line);
  for(var i = 0; i < 2; i++){
    group.appendChild(genTaper(ends[i*2], ends[(i*2)+1], dirs[i], taper, width));
  }
 
  return group;
}

function genLine(x1, y1, x2, y2, width, unit){
  if(unit === undefined)
    unit = '';
  var line = document.createElementNS('http://www.w3.org/2000/svg','rect');

  if(x1 === x2){
    line.setAttribute("x", x1 + unit);
    line.setAttribute("y", Math.min(y1, y2) + unit);
    line.setAttribute("width", width);
    line.setAttribute("height", Math.abs(y1 - y2) + unit);
    line.setAttribute("transform", "translate(-" + (width/ 2) + ", 0)");
  } else if (y1 === y2){
    line.setAttribute("x", Math.min(x1, x2) + unit);
    line.setAttribute("y", y1 + unit);
    line.setAttribute("width", Math.abs(x1 - x2) + unit);
    line.setAttribute("height", width);
    line.setAttribute("transform", "translate(0, -" + (width/2) + ")");
  }
  return line;
}

function genTaper(x, y, dir, length, width){
  var taper = document.createElementNS('http://www.w3.org/2000/svg','ellipse');

  length = length + '%';
  width = width / 2;
  x = x + '%';
  y = y + '%';

  taper.setAttribute('cx', x );
  taper.setAttribute('cy', y);

  if(dir === 'left' || dir === 'right'){
    taper.setAttribute('ry', width );
    taper.setAttribute('rx', length );
    taper.setAttribute('fill', 'url(#' + dir + '-horz-grad)');
  } else {
    taper.setAttribute('rx', width );
    taper.setAttribute('ry', length );
    taper.setAttribute('fill', 'url(#' + dir + '-vert-grad)');
  }

  return taper;
}

