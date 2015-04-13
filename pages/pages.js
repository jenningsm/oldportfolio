var coms = require('./components.js')
var Element = require('/home/mjennings/pagebuilder/html.js')
var connectPages = require('./connect.js')
var arrow = require('../arrow.js')

module.exports = function(){
  var structure = [
    title(),
      dummy('projects'),
      dummy('about'),
      contact(),
      dummy('experience'),
      dummy('education'),
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

  var content = [
    coms.flexBox().style('justify-content', 'space-between').content(
      new Element('div'),
      arrow('up', '', 100).attribute('onclick', 'history.back()'),
      new Element('div').content(
        new Element('div')
        .style(coms.font(1.3))
        .style('margin-bottom', '10px')
        .style('text-align' , 'center')
        .content("Want to chat?<br> Shoot me an email:<br>"),
        new Element('span')
        .style(coms.font(1.2))
        .content('mpjngs@gmail.com')
      ).style({
        'text-align' : 'center',
        'line-height' : '1.5em'
      }),
      new Element('div'),
      new Element('div')
    )
  ]

  return flatInfo('contact', content)
}

function flatInfo(name, content){
  return {
    'generator' :
    function(){
      return coms.pageContainer().content(
        new Element('div').content(content)
      )
    },
    'name' : name
  }
}

function title(){
  return {
  'generator' :
    function(children, currPage){

      var text = [[['MICHAEL JENNINGS', null]]]
      var lineLength = 100;
      for(var i = 0; i < children.length; i++){
        if(lineLength + children[i].name.length > 1.3 * text[0][0][0].length){
          text.push([]);
          lineLength = 0;
        } else {
          text[text.length-1].push(['-', null]);
        }
        text[text.length-1].push([children[i].name.toUpperCase(), coms.transition(children[i].name, 'up', 'push')]);
        lineLength += children[i].name.length;
      }

      return coms.pageContainer().content(
        box(text, [1.85, 1.1], [8, 1.5])
      ).style('display', 'block')
    },
  'name' : 'front'
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
    if(i === 0){
      d.style('border-bottom', '1px solid');
    }
    
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
  return coms.flexBox().content(new Element('div').style('display', 'table').content(divs));
}
