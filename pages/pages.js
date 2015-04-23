var Element = require('/home/mjennings/pagebuilder/html.js')
var coms = require('./components.js')
var connectPages = require('./connect.js')
var colors = require('../colors.js')
var box = require('./box.js')
var exp = require('./experience.js')
var temp = require('./templates.js')

//////////////////////////////////////////////////


module.exports = function(){
  var structure = [
    title(),
      [projects(),
        dummy('deftly'),
        dummy('electrodynamics'),
        dummy('charlibeck')],
      about(),
      contact(),
      [exp.experience(),
         exp.amazon(),
         exp.viasat(),
         exp.dandb()],
      education(),
  ]
  return connectPages(structure, 'loop');
}


/////////////////////////////////////////////////

function projects(){
  var content = new Element('div').content(
    new Element('p').content(
      "Here's some things I've been working on lately:"
    ),
    new Element('p').content(
      coms.link("Deftly", 'deftly', 'up', 'push'),
      ", a website I built to display some of my generative sketches.",
      "<br/>",
      coms.link("Electrodynamics", 'electrodynamics', 'up', 'push'),
      ", an Android app that creates lightning bolt visuals.",
      "<br/>",
      coms.link("A porfolio website", 'charlibeck', 'up', 'push'),
      " for an illustrator, Charli Beck."
    )
  )
  return temp.linkedContainer('projects', content, false, true, 50)
}

function education(){
  var div = temp.titledInfo(
    'University of California, Los Angeles',
    new Element().content(
      "B.S. Computer Science",
      "<br/>",
      "Graduated March 2014",
      "<br/>",
      "GPA: 3.19"
    )
  )
  return temp.linkedContainer('education', div, false, false, 100)
}

function contact(){

  var content = new Element('div').content(
    "Want to chat?<br>" + 
    "Shoot me an email:<br>" + 
    "mpjngs@gmail.com"
  )

  return temp.linkedContainer('contact', content)
}


function about(){
  var content = new Element('div').content(
    'My name is Michael Jennings. This is my site. You ' +
    'are now looking at my site. I like to make websites now.'
  )

  return temp.linkedContainer('about', content)
}


function title(){
  return {
  'generator' :
    function(children, par){
      return coms.pageContainer().content(

        box('MICHAEL JENNINGS', children, [1.8, 1.1], [8, 1.5])

      )
      .style('font-family', '\'Quicksand\', sans serif')
    },
  'name' : 'front'
  }
}


function dummy(name){
  return temp.linkedContainer(name, new Element('div').content(name));
}


////////////////////////////////////////////


