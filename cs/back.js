
var svgs = [pbr.svg1(), pbr.svg2()];

for(var i = 0; i < svgs.length; i++){
  var a = svgs[i].getBoundingClientRect();
  var dims = [a.right - a.left, a.bottom - a.top];
  var num = 100;
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
    svgs[i].appendChild(genTaperedLine(point[0], point[1], axis, length, Math.random() * 3.5, taper, pbr.tcolor));
  }
}
