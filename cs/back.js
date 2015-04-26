

var canvases = [pbr.canvases[0](), pbr.canvases[1]()];
var context = [canvases[0].getContext("2d"), canvases[1].getContext("2d")]
var lines = []
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
    lines.push(line(context[i], dims,  point, axis, length, width, pbr.tcolor))
  }
}

context[0].save()
context[1].save()

var speed = .5
function move(){
  for(var i = 0; i < 2; i++){
    context[i].clearRect(0, 0, canvases[i].width, canvases[i].height)
  }
  for(var i = 0; i < lines.length; i++){
    lines[i](speed)
  }
//  requestAnimationFrame(move)
}

move()

function line(context, dims, center, axis, length, width, color){
  var xspan = (axis === 'horz' ? length : width)
  var yspan = (axis === 'vert' ? length : width)
  axis = (axis === 'horz' ? 0 : 1)
  var dir = (Math.random() > .5 ? 1 : -1)
  var path = new Path2D()
  path.rect(0,0, xspan, yspan) 

   var gradient = context.createLinearGradient(0, 0, xspan, yspan)
   var transparent = colorString(color.slice(0, 3).concat([0]))
   var colored = colorString(color)
   gradient.addColorStop(0, transparent)
   gradient.addColorStop(.25, colored)
   gradient.addColorStop(.75, colored)
   gradient.addColorStop(1, transparent)

  return function(step){
    center[axis] += dir * step
    if(center[axis] < -length / 2)
      center[axis] = dims[axis] + length/2
    if(center[axis] > dims[axis] + length/2)
      center[axis] = -length/2


    context.save()
    context.translate(center[0] - xspan/2, center[1]- yspan/2)
    //context.fillStyle = colorString(color)
    context.fillStyle = gradient
    //context.fillRect(center[0] - xspan / 2, center[1] - yspan / 2, xspan, yspan)
    context.fill(path)
    context.restore()
  }
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
