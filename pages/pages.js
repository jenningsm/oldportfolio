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
      contact(),
      about(),
      education(),
      [exp.experience(),
         exp.amazon(),
         exp.viasat(),
         exp.dandb()],
      dummy('skills'),
      [projects(),
        deftly(),
        dummy('electrodynamics'),
        dummy('charlibeck')],
  ]
  return connectPages(structure, 'loop');
}


/////////////////////////////////////////////////


function deftly(){
  var div = new Element('div').content(
    new Element('p').content(
      coms.outLink('Deftly', 'http://www.deftsketches.com', true)
    ).style(coms.font(1.3)),
    new Element('p').content(
      'Deftly is a website I built to display some of my generative sketches. ',
      'You can check it out at ',
      coms.outLink("deftsketches.com", 'http://www.deftsketches.com')
    ),
    new Element('p').content(
      "I'm pretty happy with how the site turned out. However, it has one major flaw, and ",
      "that is that its implemention is very complicated and almost unmaintainable. ",
      "I've learned from this mistake, and I think if I were to do it again, I could do it much ",
      "more simply."
    ),
    new Element('p').content(
      "Take a look at the code on ",
      coms.outLink("Github", "https://github.com/jenningsm/deft"),
      "."
    )
  )
  return temp.linkedContainer('deftly', div, true, false, 50)
}

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
      ", an Android app that generates lightning bolt visuals.",
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


