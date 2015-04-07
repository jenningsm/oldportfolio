var coms = require('./components.js');
var Element = require('/home/mjennings/pagebuilder/html.js');
var connectPages = require('./connect.js');


module.exports = function(){
  var structure = 
  [ midContent('one', '| ONE |'),
      midContent('front', '| MICHAEL JENNINGS |'),
      midContent('two', '| TWO |'),
  ]

  return connectPages(structure);
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
  return function(children, currPage, prevPage, nextPage){
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
}

