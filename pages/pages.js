var coms = require('./components.js');
var Element = require('/home/mjennings/pagebuilder/html.js');
var connectPages = require('./connect.js');


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
    coms.flexBox().content(
      new Element('p').content(
        new Element('span').style(
          coms.font(1.7),
          {'border-bottom': '1px solid'}
        ).content('CONTACT')
      ).style('text-align', 'center'),
      new Element('p').content(
        new Element('span')
        .style(coms.font(1.3))
        .content("Shoot me an email:"),
        new Element('br/'),
        new Element('span')
        .style(coms.font(1.2))
        .content('mpjngs@gmail.com')
      ).style({
        'line-spacing': '165%',
        'text-align' : 'center',
        'line-height' : '1.5em'
      }),
      new Element('p').content(
        '- BACK -'
      ).style({
        'text-align': 'center',
        'transform' : 'translate(0, 35px)'
      })
      .style(coms.font(1.15))
      .attribute('onclick', 'history.back()')
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
