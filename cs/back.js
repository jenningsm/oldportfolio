

var canvases = [pbr.canvases[0](), pbr.canvases[1]()];
var context = [canvases[0].getContext("2d"), canvases[1].getContext("2d")]

for(var i = 0; i < canvases.length; i++){
  var a = canvases[i].getBoundingClientRect();
  var dims = [a.right - a.left, a.bottom - a.top];
  context[i].canvas.width = dims[0]
  context[i].canvas.height = dims[1]
  var num = 600;

  for(var j = 0; j < num; j++){
    var xp = ((j % Math.floor(num / 2)) * (dims[0] / Math.floor(num / 2)));
    xp += (Math.random() - .5) * 7;
    var point = [xp, Math.random() * dims[1]];
    if(i === 1){
      point[1] = dims[1] - point[1];
    }
    var axis = (Math.random() > .5 ? 'horz' : 'vert');
    length = (.5 + Math.random() * .5) * Math.max(dims[0], dims[1]) / 15;
    taper = length / 4;
    width = Math.random() * 2
    line(context[i], point, axis, length, width, pbr.tcolor)
  }
}


function line(context, center, axis, length, width, color){
  var xspan = (axis === 'horz' ? length : width)
  var yspan = (axis === 'vert' ? length : width)
  axis = (axis === 'horz' ? 0 : 1)
  var dir = (Math.random() > .5 ? 1 : -1)

  var ends = [];
  ends[axis] = center[axis] - length / 2
  ends[axis + 2] = center[axis] + length / 2
  ends[(1 + axis)%2] = center[(1+axis)%2]
  ends[2 + (1 + axis)%2] = center[(1+axis)%2]

  var gradient = context.createLinearGradient(ends[0], ends[1], ends[2], ends[3])
  var transparent = colorString(color.slice(0, 3).concat([0]))
  var colored = colorString(color)
  gradient.addColorStop(0, transparent)
  gradient.addColorStop(.25, colored)
  gradient.addColorStop(.75, colored)
  gradient.addColorStop(1, transparent)

  context.fillStyle = gradient
  context.fillRect(center[0] - xspan / 2, center[1] - yspan / 2, xspan, yspan)
}

function colorString(color){
  var str = "rgba(";
  for(var i = 0; i < color.length; i++){
    str += color[i] + ','
  }
  str = str.substring(0, str.length -1)
  str += ')'
  return str
}
