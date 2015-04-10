var coms = require('./components.js');
var Element = require('/home/mjennings/pagebuilder/html.js');
var connectPages = require('./connect.js');


module.exports = function(){
  var structure = [ title() ]
  return connectPages(structure);
}


/////////////////////////////////////////////////

function title(){
  return {
  'generator' :
    function(children, currPage, prevPage, nextPage){
      return coms.pageContainer().content(
        new Element('div').style('display', 'table')
        .content(
          box(
            [
              ['| MICHAEL JENNINGS |'],
              ['ABOUT', '-', 'PROJECTS', '-', 'CONTACT'],
              ['EXPERIENCE', '-', 'EDUCATION']
            ],
            [1.85, 1.1, 1.1],
            [4, 1]
          )
        )
      )
    },
  'name' : 'what'
  }
}

function box(content, fontSizes, spacing){
  var divs = [];
  spacing.push(0);
  for(var i = 0; i < content.length; i++){
    var d = new Element('div')
    .style(
      {
        'display' : 'flex',
        'margin-bottom' : spacing[i] + 'px',
        'justify-content' : 'space-between'
      },
      coms.font(fontSizes[i])
    )
    
    for(var j = 0; j < content[i].length; j++){
      d.content(
        new Element('span')
       .content(content[i][j])
      )
    }
    divs.push(
      new Element('div')
      .style('display', 'table-row')
      .content(d)
    )
  }
  return divs;
}
