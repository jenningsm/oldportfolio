var coms = require('./components.js')
var Element = require('/home/mjennings/pagebuilder/html.js')
var connectPages = require('./connect.js')
var colors = require('../colors.js')
var css = require('../css.js')
var box = require('./box.js')

//////////////////////////////////////////////////


module.exports = function(){
  var structure = [
    title(),
      dummy('projects'),
      about(),
      contact(),
      experience(),
      dummy('education'),
  ]
  return connectPages(structure);
}


/////////////////////////////////////////////////

function experience(){
  var div = new Element('div').content(
     new Element('p').content(
      "I have ",
     coms.link("worked at Amazon", 'front', 'down', 'push'),
     " as a Software Engineering Intern, ",
     coms.link("worked at Viasat", 'front', 'down', 'push'),
     " as a Software Engineering Intern, and ",
     coms.link("worked at D&B Credibility Corp.", 'front', 'down', 'push'),
     ' as a Web Development Intern.'
     ),
     new Element('p').content(
      "Admittedly, none of my work experience thus far has been front-end work.\
       I hope my personal projects make up for this deficit."
     )
  )
  return plainInfo('experience', div, 50)
}

function amazon(){
  var div = new Element('div').content(
    new Element('p')
  )
}

function contact(){

  var content = new Element('div').content(
    "Want to chat?<br>" + 
    "Shoot me an email:<br>" + 
    "mpjngs@gmail.com"
  )

  return plainInfo('contact', content)
}



function about(){
  var content = new Element('div').content(
    'My name is Michael Jennings. This is my site. You ' +
    'are now looking at my site. I like to make websites now.'
  )

  return plainInfo('about', content)
}

function title(){
  return {
  'generator' :
    function(children, currPage){
      return coms.pageContainer().content(

        box('MICHAEL JENNINGS', children, [1.8, 1.1], [8, 1.5])

      ).style('display', 'block')
      .style('font-family', 'Quicksand')
    },
  'name' : 'front'
  }
}


function dummy(name){
  return plainInfo(name, new Element('div').content(name));
}


////////////////////////////////////////////


function plainInfo(name, content, width){

  if(width === undefined)
    width = 30

  return {
    'generator' :
    function(){
      return coms.pageContainer().content(
        coms.arrow('up', 'history.back()').style('z-index', '1'),
        coms.flexBox().content(
          content.style('max-width', width + '%')
        )
      )
    },
    'name' : name
  }
}
