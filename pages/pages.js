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
  return {
  'generator' :
    function(children, currPage, prevPage, nextPage){
      return coms.full().content(
        new Element('div').style({
            'width' : '100%',
            'height' : '100%',
            'position' : 'absolute'
          }
        ).content(
          box(
            [
              ['| MICHAEL JENNINGS |'],
              ['ABOUT', '-', 'PROJECTS', '-', 'CONTACT'],
              ['EXPERIENCE', '-', 'EDUCATION']
            ],
            [1.85, 1.1, 1.1]
          )
        )
      ).style('display', (name === 'front' ? 'block' : 'none'));
    },
  'name' : name
  }
}

function box(content, fontSizes){
  var divs = [];
  for(var i = 0; i < content.length; i++){
    var d = new Element('div')
      .style(coms.font(fontSizes[i]))
    for(var j = 0; j < content[i].length; j++){
      d.content(
        new Element('span')
         .style('position', 'absolute')
         .content(content[i][j])
      )
    }
    divs.push(d)
  }
  return divs;
}
