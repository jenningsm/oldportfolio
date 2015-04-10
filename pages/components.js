
var Element = require('/home/mjennings/pagebuilder/html.js');

module.exports.pageContainer = function(){
  return new Element('div').style({
    'width' : '100%',
    'height' : '100%',
    'display' :'flex',
    'justify-content' : 'center',
    'align-items' : 'center',
    'position' : 'absolute'
  });
}

module.exports.backButton = function(){
  return edgeButton(false).content(
    "- BACK -"
  )
}

module.exports.browseButtons = function(curr, prev, next){
  var prevButton = new Element('span').content('PREV');
  var nextButton = new Element('span').content('NEXT');
  
  var buttons = [prevButton, nextButton];
  var targets = [];
  for(var i = 1 ; i < 3; i++){
    if(arguments[i] === null){
      targets.push(null)
    } else {
      targets.push(arguments[i].name)
    }
  }

  for(var i = 0; i < buttons.length; i++){
    if(targets[i] !== null){
      buttons[i].attribute('onclick', transition(curr, targets[i], i === 1))
    } else {
      buttons[i].style('opacity', '.5')
    }
  }

  return edgeButton(true).content(
    '-&nbsp;',
    prevButton,
    '&nbsp;|&nbsp;',
    nextButton,
    '&nbsp;-'
  )
}

module.exports.transition = transition;
function transition(from, to, dir){
  return 'toPage(pages[&quot;' +
          from + 
         '&quot;],pages[&quot;' + 
          to + 
         '&quot;],' + 
          dir + ')'
}

module.exports.font = font;
function font(size, weight){
  if(weight === undefined){
    weight = '400';
  }
  return {
    'font-weight' : weight,
    'font-size': size + 'em',
  }
}


// pos specifies whether the button should be at the top (true) or bottom (false) of the page
function edgeButton(pos){
  return new Element('div').style({
    'width' : '100%',
    'height' : '12%',
    'display' : 'flex',
    'align-items' : 'center',
    'justify-content' : 'center',
    'position' : 'absolute'
    },
    font(1.4)
  ).style((pos ? 'top' : 'bottom'), '0%');
}

