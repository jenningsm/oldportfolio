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
      about(),
      [projects(),
        deftly(),
        electrodynamics(),
        charlibeck(),
        portfolio()],
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
      "I'm proud of this site, but I realize now that the implementation may be more complicated than \
       it needs to be. Since building the site, I've learned to be much more careful about adding complexity \
       to an application."
    ),
    new Element('p').content(
      "You can take a look at the code on ",
      coms.outLink("Github", "https://github.com/jenningsm/deft"),
      "."
    )
  )
  return temp.linkedContainer('deftly', div, true, false, 50)
}

function electrodynamics(){
  var div = new Element('div').content(
    new Element('p').content(
      coms.outLink('Electrodynamics', 'http://www.mjngs.com', true)
    ).style(coms.font(1.3)),
    new Element('p').content(
      'Electrodynamics is a very simple Android app that generates lightning bolt visuals when the screen is touched. \
       You can download it from the play store ',
      coms.outLink("here", 'http://www.mjngs.com'),
      "."
    ),
    new Element('p').content(
      'The app was built in Java and uses OpenGL for the graphics.' 
    )
  )
  return temp.linkedContainer('electrodynamics', div, true, false, 50)
}

function charlibeck(){
  var div = new Element('div').content(
    new Element('p').content(
      coms.outLink('Charli Beck', 'http://www.mjngs.com/cb', true)
    ).style(coms.font(1.3)),
    new Element('p').content(
      'A portfolio site I built for an illustrator. \
       You can check it out at ',
      coms.outLink("mjngs.com/cb", 'http://www.mjngs.com/cb'),
      "."
    ),
    new Element('p').content(
      "The illustrator ended up deciding not to use the site (which is why it's hosted on one my domains). \
       This was the first full website I'd ever built, and I think I learned a lot from it."
    ),
    new Element('p').content(
      "You can take a look at the code on ",
      coms.outLink("Github", "https://github.com/jenningsm/cb"),
      "."
    )
  )
  return temp.linkedContainer('charlibeck', div, true, false, 50)
}

function portfolio(){
  var div = new Element('div').content(
    new Element('p').content(
      coms.underline('This Site', true)
    ).style(coms.font(1.3)),
    new Element('p').content(
      "I only include this page to make a note about the css and html of this site. If you look at them, they look really \
       ugly, with a large number of tiny classes with incomprehensible names. The reason for this is that the html and css \
       were generated by a tool I'm developing. The code that generated the html and css is much more ordered than the html \
       and css themselves."
    ),
    new Element('p').content(
       "Unfortunately, I haven't yet documented this tool, as it's still changing, but if you take a look \
       at the ",
       coms.outLink("code", "https://github.com/jenningsm/portfolio/blob/master/k.js"),
       " for this site, you might be able to get a rough idea what's going on."
    )
  )
  return temp.linkedContainer('portfolio', div, true, false, 60)
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
      " for an illustrator, Charli Beck.",
      "<br/>",
      "And, of course, ",
      coms.link("this site", "portfolio", "up", "push"),
      "."
    )
  )
  return temp.linkedContainer('projects', content, false, true, 50)
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
      "Check out my ",
       coms.link("projects", "projects", 'up', "push"),
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


