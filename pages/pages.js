var Element = require('/home/mjennings/pagebuilder/html.js')
var coms = require('./components.js')
var connectPages = require('./connect.js')
var colors = require('../colors.js')
var box = require('./box.js')
var exp = require('./experience.js')
var proj = require('./projects.js')
var temp = require('./templates.js')

//////////////////////////////////////////////////


module.exports = function(){
  var structure = [
    title(),
      about(),
      [proj.projects(),
        proj.deftly(),
        proj.electrodynamics(),
        proj.charlibeck()],
      contact(),
      [exp.experience(),
         exp.amazon(),
         exp.viasat(),
         exp.dandb()],
      education(),
  ]
  var pages = connectPages(structure, 'loop')
  pages['404'] = {'url' : '404', 'page' : fourohfour()}
  return pages
}


/////////////////////////////////////////////////

function fourohfour(){
  return coms.pageContainer().content(
           coms.flexBox().content(
             "Sorry, there's no page here."
           )
         )
}

function education(){
  var div = new Element('div').content(
    "I attended the University of California, Los Angeles, from which I received a Bachelor of Science \
     in Computer Science. I graduated in March of 2014 with a GPA of 3.19."
  )
  return temp.linkedContainer('education', div, false, false, 40)
}

function contact(){

  var content = new Element('div').content(
    "Want to chat?<br>",
    "Shoot me an email:<br>",
    coms.outLink("mpjngs@gmail.com", "mailto:mpjngs@gmail.com")
  )

  return temp.linkedContainer('contact', content)
}


function about(){
  var content = new Element('div').content(
    new Element('p').content(
      "My name is Michael Jennings, and I'm looking for work as a front-end web developer. \
       I like working with javascript. I like making sites move. I like to build single-page sites. \
       My style is minimalist."
    ),
    new Element('p').content(
      "I've been programming for years now, but only recently started working with the front-end. I'm learning fast."
    ),
    new Element('p').content(
      "Check out my ",
       coms.link("projects", "projects", 'up'),
      " or shoot me an ",
       coms.outLink("email", "mailto:mpjngs@gmail.com"),
      "."
    )
  )

  return temp.linkedContainer('about', content, false, false, 50)
}


function title(){
  return {
  'generator' :
    function(children, lineage){
      var url = [];
      for(var i = 0; i < lineage.length - 1; i++){
        url.unshift(lineage[i].name)
      }
      url = url.join('/');
      var page = coms.pageContainer().content(

        box('MICHAEL JENNINGS', children, [1.8, 1.1], [8, 1.5])

      )
      .style('font-family', '\'Quicksand\', sans serif')

      return {'page' : page, 'url' : url }
    },
  'name' : 'front'
  }
}


function dummy(name){
  return temp.linkedContainer(name, new Element('div').content(name));
}


////////////////////////////////////////////


