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
      [experience(),
         amazon(),
         viasat(),
         dandb()],
      dummy('education'),
  ]
  return connectPages(structure, 'loop');
}


/////////////////////////////////////////////////

function experience(){
  var div = new Element('div').content(
     new Element('p').content(
      "I have ",
     coms.link("worked at Amazon", 'amazon', 'up', 'push'),
     " as a Software Engineering Intern, ",
     coms.link("worked at ViaSat", 'viasat', 'up', 'push'),
     " as a Software Engineering Intern, and ",
     coms.link("worked at D&B Credibility Corp.", 'dandb', 'up', 'push'),
     ' as a Web Development Intern.'
     ),
     new Element('p').content(
      "Admittedly, none of my work experience thus far has been front-end work.\
       I hope my ",
       coms.link("personal projects", 'projects', 'up', 'push'),
      " make up for this deficit."
     )
  )
  return indexPage('experience', div, 50)
}

function amazon(){
  var div = titledInfo(
    'Amazon',
    "I worked at Amazon during the Summer of 2013 as a Software Engineering Intern.",
    'At Amazon I developed a text advertisement data model and implemented an API in Java for ' + 
    "creating and updating advertisements within that model."
  )
  return plainInfo('amazon', div, 40)
}

function dandb(){
  var div = titledInfo(
    'D&B Credibility Corp.',
    "I worked at D&B during the Summer of 2011 as a Web Development Intern.",
    'At D&B I worked in PHP maintaining the backend of the company\'s website. I also worked with various public ' + 
    "API's to gather and validate business information."
  )
  return plainInfo('dandb', div, 40)
}

function viasat(){
  var div = titledInfo(
    'ViaSat',
    "I worked at ViaSat during the Summer of 2012 as a Software Engineering Intern.",
    'At ViaSat I worked on a team of three interns to develop a prototype for a home security ' + 
    "and automation system. I worked primarily in Java."
  )
  return plainInfo('viasat', div, 40)
}
function dab(){
  var divs = paragraphs
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

      )
      .style('font-family', 'Quicksand')
    },
  'name' : 'front'
  }
}


function dummy(name){
  return plainInfo(name, new Element('div').content(name));
}


////////////////////////////////////////////


function titledInfo(){
  var div = new Element('div')
  div.content(coms.underline(arguments[0]).style('font-size', '1.2em'))
  for(var i = 1; i < arguments.length; i++){
    div.content(new Element('p').content(arguments[i]))
  }
  return div
}

function indexPage(name, content, width){
  if(width === undefined)
    width = 30

  return {
    'generator' :
    function(children){
      return coms.pageContainer().content(
        coms.arrow('up', 'history.back()').style('z-index', '1'),
        coms.flexBox().content(
          content.style('max-width', width + '%')
        ),
        coms.arrow('down', coms.transition(children[0].name, 'up', 'push')).style('z-index', '1')
      )
    },
    'name' : name
  }

}

function plainInfo(name, content, width){

  if(width === undefined)
    width = 30

  return {
    'generator' :
    function(children, currpage, prev, next){
      var page = coms.pageContainer().content(
        coms.arrow('up', 'history.back()').style('z-index', '1'),
        coms.flexBox().content(
          content.style('max-width', width + '%')
        )
      )
      if(prev !== null){
        page.content(coms.arrow('left', coms.transition(prev.name, 'right', 'replace')).style('z-index' , 1))
      }
      if(next !== null){
        page.content(coms.arrow('right', coms.transition(next.name, 'left', 'replace')).style('z-index' , 1))
      }
      return page
    },
    'name' : name
  }
}
