
var Element = require('/home/mjennings/pagebuilder/html.js')
var coms = require('./components.js')
var css = require('../css.js')

//Takes a two dimensional array of elements and
//returns an element containing these elements
//justified
module.exports = function(title, children, fontSizes, spacing){

  var content = textTable(title,children);

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
      coms.font(fontSizes[i], 'rem')
    )
    
    for(var j = 0; j < content[i].length; j++){
      d.content(content[i][j])
    }
    divs.push(
      new Element('div')
      .style('display', 'table-row')
      .content(d)
    )
  }

  return coms.flexBox()
  .content(
    new Element('div')
    .style('display', 'table')
    .content(divs)
  )
  .style(
    {'cursor': 'default'},
    css.userSelect('none')
  )
}
function textTable(title, children){
  //divide the children into a two dimensional grid to be displayed
  //as a box

  var table = [[
               new Element('span')
               .content(title)
               .style('border-bottom', '1px solid')
             ]]

  var lineLength = -1
  for(var i = 0; i < children.length; i++){
    //when the length of a line exceeds the length of the title line
    //start a new line
    if(lineLength < 0 || lineLength + children[i].name.length > 1.5 * title.length){
      table.push([]);
      lineLength = 0;
    } else {
      table[table.length-1].push(new Element('span').content('-'));
    }

    var span = new Element('span')
    .content(children[i].name.toUpperCase())
    .attribute('onclick', coms.transition(children[i].name, 'up'))
    .style('cursor', 'pointer')

    table[table.length-1].push(span);
    lineLength += children[i].name.length;
  }
  return table;
}

