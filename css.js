
module.exports.linearGradient = function(dir, start, stop){
  return prefix('background', 'linear-gradient(to ' + dir + ', ' + start + ', ' + stop + ')');
}
module.exports.userSelect = function(value){
  return prefix('user-select', value, ['moz', 'webkit', 'ms', 'o'])
}

module.exports.prefix = prefix
function prefix(style, value, prefixes){
  if(prefixes === undefined){
    prefixes = ['webkit', 'o', 'moz'];
  }
  var prefixed = {};
  for(var i = 0; i < prefixes.length; i++){
    prefixed['-' + prefixes[i] + '-' + style] = value;
  }
  prefixed[style] = value;
  return prefixed;
}
