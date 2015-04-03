
var svgs = [pbr.svg1(), pbr.svg2()];

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

function genTaperedLine (axis, x, y, length, width, taper, color, unit){
  var group = document.createElementNS('http://www.w3.org/2000/svg','g');
  group.setAttribute('stroke', 'none');
  group.setAttribute('fill', color);
  var ends = [];
  var taperends = []
  var taperurls = [];
  if(axis === 'vert'){
    ends = [x, y + length / 2, x, y - length / 2];
    taperends = [x , ends[1] + taper, x, ends[3] - taper];
    taperurls = ['bottom-vert-grad', 'top-vert-grad'];
  } else {
    ends = [x + length / 2, y, x - length / 2, y];
    taperends = [ends[0] + taper , ends[1], ends[2] - taper, ends[3]];
    taperurls = ['right-horz-grad', 'left-horz-grad'];
  }
  var line = genLine(ends[0], ends[1], ends[2], ends[3], width, unit);
  group.appendChild(line);
  for(var i = 0; i < 2; i++){
    var taper = genLine(taperends[i * 2], taperends[(i*2)+1], ends[i*2], ends[(i*2)+1], width, unit);
    taper.setAttribute('fill', 'url(#' + taperurls[i] + ')');
    group.appendChild(taper);
  }
 
  return group;
}

for(var i = 0; i < svgs.length; i++){
  var a = svgs[i].getBoundingClientRect();
  var dims = [a.right - a.left, a.bottom - a.top];
  for(var j = 0; j < 65; j++){
    var point = [Math.random() * 100, Math.random() * 100];
    var axis = (Math.random() > .5 ? 'horz' : 'vert');
    var length = 8000 / dims[(axis === 'horz' ? 0 : 1)];
    var taper = 900 / dims[(axis === 'horz' ? 0 : 1)];
    svgs[i].appendChild(genTaperedLine(axis, point[0], point[1], length, 2, taper, pbr.tcolor, '%'));
  }
}
