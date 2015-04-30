
//primary, secondary, and tertiary colors, respectively
module.exports.pcolor = [190, 20, 20];
module.exports.scolor = [255, 255, 205];
module.exports.tcolor = [220, 190, 120, .9];

module.exports.colorString = function(color){
  var ret = 'rgb';
  if(color.length > 3){
    ret += 'a';
  }
  ret += '(';
  for(var i = 0; i < color.length; i++){
    ret += color[i] + ',';
  }
  ret = ret.substring(0, ret.length - 1);
  ret += ')';
  return ret;
}
