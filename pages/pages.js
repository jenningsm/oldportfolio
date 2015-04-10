var coms = require('./components.js');
var Element = require('/home/mjennings/pagebuilder/html.js');
var connectPages = require('./connect.js');


module.exports = function(){
  var structure = [
    title(),
      dummy('ABOUT'),
      dummy('PROJECTS'),
      contact(),
      dummy('EXPERIENCE'),
      dummy('EDUCATION')
  ]
  return connectPages(structure);
}


/////////////////////////////////////////////////


function dummy(name){
  return {
    'generator':
    function(){
      return coms.pageContainer().content(
        new Element('div').content(name)
      )
    },
    'name' : name
  }
}

function contact(){
  return {
    'generator' :
    function(){
      return coms.pageContainer().content(
        new Element('span').style(
          coms.font(1.7),
          {
            'border-bottom': '1px solid',
            'margin-bottom': '10px',
            'text-align': 'center'
          }
        ).content('CONTACT'),
        new Element('div')
        .style(coms.font(1.4))
        .content('mpjngs@gmail.com')
      )
    },
    'name' : 'CONTACT'
  }
}

function title(){
  return {
  'generator' :
    function(children, currPage){

      var text = [[['| MICHAEL JENNINGS |', null]]]
      var lineLength = 100;
      for(var i = 0; i < children.length; i++){
        if(lineLength + children[i].name.length > text[0][0][0].length){
          text.push([]);
          lineLength = 0;
        } else {
          text[text.length-1].push(['-', null]);
        }
        text[text.length-1].push([children[i].name, coms.transition(currPage, children[i].name, true)]);
        lineLength += children[i].name.length;
      }

      return coms.pageContainer().content(
        box(text, [1.85, 1.1], [4, 1])
      ).style('display', 'block')
    },
  'name' : 'what'
  }
}

function box(content, fontSizes, spacing){
  var divs = [];
  while(fontSizes.length < content.length){
    fontSizes.push(fontSizes[fontSizes.length-1]);
  }
  while(spacing.length < content.length - 1){
    spacing.push(spacing[spacing.length - 1]);
  }
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
      var span = new Element('span')
      .content(content[i][j][0])
  
      if(content[i][j][1] !== null){
        span.attribute('onclick', content[i][j][1])
      }
      d.content(span)
    }
    divs.push(
      new Element('div')
      .style('display', 'table-row')
      .content(d)
    )
  }
  return new Element('div').style('display', 'table').content(divs);
}
