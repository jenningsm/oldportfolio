
var svgs = [pbr.svgs[0](), pbr.svgs[1]()];
var movers = [];

for(var i = 0; i < svgs.length; i++){
  var a = svgs[i].getBoundingClientRect();
  var dims = [a.right - a.left, a.bottom - a.top];
  var num = 110;
  for(var j = 0; j < num; j++){
    var xp = ((j % Math.floor(num / 2)) * (100 / Math.floor(num / 2)));
    xp += (Math.random() - .5) * 7;
    var point = [xp, Math.random() * 100];
    if(i === 1){
      point[1] = 100 - point[1];
    }
    var axis = (Math.random() > .5 ? 'horz' : 'vert');
    length = Math.max(dims[0], dims[1]) / 20;
    taper = length / 4;
    var line = genTaperedLine(point[0], point[1], axis, length, Math.random() * 3.5, taper, pbr.tcolor)
    svgs[i].appendChild(line.line);
    movers.push(line.mover);
  }
}


var pos = 0;
function translate(){
  pos += 1;
  for(var i = 0; i < lines.length; i++){
    lines[i].setAttribute("transform", "translate(" + pos + ", 0)");
  }
  requestAnimationFrame(translate);
}

//translate();

var bb = svgs[0].getBoundingClientRect(svgs[0]);
var dims = [bb.right - bb.left, bb.bottom - bb.top];
console.log(dims);
function moveEm(){
  for(var i = 0; i < movers.length; i++){
    movers[i](dims);
  }
  requestAnimationFrame(moveEm);
}

moveEm();
