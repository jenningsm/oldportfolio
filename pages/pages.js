var coms = require('./components.js')
var Element = require('/home/mjennings/pagebuilder/html.js')
var connectPages = require('./connect.js')
var colors = require('../colors.js')
var css = require('../css.js')

module.exports = function(){
  var structure = [
    title(),
      dummy('projects'),
      about(),
      contact(),
      dummy('experience'),
      dummy('education'),
  ]
  return connectPages(structure);
}


/////////////////////////////////////////////////


function contact(){

  var content = new Element('div').content(

    new Element('div')
    .style('margin-bottom', '10px')
    .content("Want to chat?<br> Shoot me an email:"),

    new Element('span')
    .content('mpjngs@gmail.com')

  )

  return flatInfo('contact', content)
}

function about(){
  var content = new Element('div').content(
    'My name is Michael Jennings. This is my site. You ' +
    'are now looking at my site. I like to make websites now.'
  )

  return flatInfo('about', content)
}


function flatInfo(name, content){

  return {
    'generator' :
    function(){
      return coms.pageContainer().content(
        coms.backArrow(),
        coms.flexBox().content(
          content.style('max-width', '30%')
        )
        .style('pointer-events', 'none')
      )
    },
    'name' : name
  }
}

function title(){
  return {
  'generator' :
    function(children, currPage){
      var topText = 'MICHAEL JENNINGS'
      var text = [[new Element('span')
                   .content(topText)
                   .style(
                     {'cursor': 'default'}
                   )
                 ]]
      var lineLength = 1000;
      for(var i = 0; i < children.length; i++){
        if(lineLength + children[i].name.length > 1.3 * topText.length){
          text.push([]);
          lineLength = 0;
        } else {
          text[text.length-1].push(new Element('span').content('-'));
        }
        var span = new Element('span')
        .content(children[i].name.toUpperCase())
        .attribute('onclick', coms.transition(children[i].name, 'up', 'push'))
        .style({
          'cursor' : 'pointer'
        })
        text[text.length-1].push(span);
        lineLength += children[i].name.length;
      }
      return coms.pageContainer().content(
        box(text, [1.8, 1.1], [8, 1.5]).style(css.userSelect('none'))
      ).style(
        {'display': 'block'}
      )
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
      coms.font(fontSizes[i], 'rem')
    )
    if(i === 0){
      d.style('border-bottom', '1px solid');
    }
    
    for(var j = 0; j < content[i].length; j++){
      d.content(content[i][j])
    }
    divs.push(
      new Element('div')
      .style('display', 'table-row')
      .content(d)
    )
  }
  return coms.flexBox().content(new Element('div').style('display', 'table').content(divs));
}

function dummy(name){
  return {
    'generator':
    function(){
      return coms.pageContainer().content(
        coms.flexBox().content(
          new Element('div').content(name)
        )
      )
    },
    'name' : name
  }
}
