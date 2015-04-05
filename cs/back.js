
var svgs = [pbr.svg1(), pbr.svg2()];

for(var i = 0; i < svgs.length; i++){
  var a = svgs[i].getBoundingClientRect();
  var dims = [a.right - a.left, a.bottom - a.top];
  var num = 110;
  for(var j = 0; j < num; j++){
    var xp = ((j % Math.floor(num / 2)) * (100 / Math.floor(num / 2)));
    xp += (Math.random() - .5) * 7;
    var point = [xp, Math.random() * 100];
    var axis = (Math.random() > .5 ? 'horz' : 'vert');
    var length = 8000 / dims[(axis === 'horz' ? 0 : 1)];
    var taper = 900 / dims[(axis === 'horz' ? 0 : 1)];
    svgs[i].appendChild(genTaperedLine(axis, point[0], point[1], length, Math.random() * 3, taper, pbr.tcolor, '%'));
  }
}
