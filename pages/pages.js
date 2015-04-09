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
          'display' : 'table',
        }).content(
          box(
            [
              ['| MICHAEL JENNINGS |'],
              ['ABOUT', '-', 'PROJECTS', '-', 'CONTACT'],
              ['EXPERIENCE', '-', 'EDUCATION']
            ],
            [1.85, 1.1, 1.1]
          )
        ).style('display', (name === 'front' ? 'table' : 'none'))
      )},
  'name' : name
  }
}

function box(content, fontSizes){
  var divs = [];
  for(var i = 0; i < content.length; i++){
    var d = new Element('div')
      .style(coms.font(fontSizes[i]))
      .style({
        'display' : 'flex',
        'justify-content' : 'space-between'
      })
    for(var j = 0; j < content[i].length; j++){
      d.content(
        new Element('span')
         .content(content[i][j])
      )
    }
    divs.push(new Element('div').style('display', 'table-row').content(d))
  }
  return divs;
}
