var coms = require('./components.js');
var Element = require('/home/mjennings/pagebuilder/html.js');
var connectPages = require('./connect.js');


module.exports = function(){
  var structure = 
  [ midContent('one', '| ONE |'),
      midContent('front', '| MICHAEL JENNINGS |'),
      midContent('two', '| TWO |'),
  ]

  var a = connectPages(structure);
  var ret = {};
  for (var i = 0; i < a.length; i++){
    ret[a[i][0]] = a[i][1];
  }
  return ret;
}


/////////////////////////////////////////////////

var dummy = 
{
  'generator' : function(){
    return function(){
      return new Element("dummy")
    }
  },
  'name' : 'dummy'
}

function midContent(name, content){
  return {
    'generator' :
    function(currPage, prevPage, nextPage){
      return function(children){
        return coms.full().content(
          new Element('div').style({
            'display' :'flex',
            'justify-content' : 'center',
            'align-items':'center',
            'width' : '100%',
            'height' : '100%',
            'position' : 'absolute'
            },
            coms.font(1.7)
          ).content(
            content
          ),
          coms.browseButtons(currPage, prevPage, nextPage),
          coms.backButton()
        ).style('display', (name === 'front' ? 'block' : 'none'));
      }
    },
    'name' : name
  }
}

