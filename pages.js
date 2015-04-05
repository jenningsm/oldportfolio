
module.exports =  pages;


var Element = require('/home/mjennings/pagebuilder/html.js');

function pages(color){
  var front = full(color).content( title());
  var pages = {'front' : front};
  return pages;
}

function full(color){
  return new Element('div').style({
    'width' : '100%',
    'height' : '100%',
    'position' : 'absolute',
    'color' : color
  });
}

function font(size, weight){
  if(weight === undefined){
    weight = '400';
  }
  return {
    'font-weight' : weight,
    'font-size': size + 'em',
  }
}

function title(){
  return new Element('div').style({
    'display' :'flex',
    'justify-content' : 'center',
    'align-items':'center',
    'top' : '50%',
    'left' : '50%',
    'transform' : 'translate(-50%, -50%)',
    'position' : 'absolute'
    },
    font(1.7)
  ).content(
    '| MICHAEL JENNINGS |'
  )
}

function backButton(){
  return edgeButton('bottom').content(
    "- BACK -"
  )
}

function browseButtons(){
  return edgeButton('top').content(
    '- PREV | NEXT -'
  )
}

function edgeButton(dir){
  return new Element('div').style({
    'width' : '100%',
    'height' : '12%',
    'display' : 'flex',
    'align-items' : 'center',
    'justify-content' : 'center',
    'position' : 'absolute'
    },
    font(1.4)
  ).style(dir, '0%');
}
