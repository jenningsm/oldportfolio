
function colorString(color){
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

module.exports.colorString = colorString;
