
var Element = require('/home/mjennings/pagebuilder/html.js')
var coms = require('./components.js')
var temp = require('./templates.js')

module.exports.experience = function(){
  var info = new Element('div').content(
     new Element('p').content(
      "I have ",
     coms.link("worked at Amazon", 'amazon', 'up'),
     " as a Software Engineering Intern, ",
     coms.link("worked at ViaSat", 'viasat', 'up'),
     " as a Software Engineering Intern, and ",
     coms.link("worked at D&B Credibility Corp.", 'dandb', 'up'),
     ' as a Web Development Intern.'
     ),
     new Element('p').content(
      "Admittedly, none of my work experience thus far has been front-end work,\
       but I've been working on ",
       coms.link("personal projects", 'projects', 'up'),
      " to develop my skills."
     )
  )
  return temp.linkedContainer('experience', info, false, true, 100)
}

module.exports.amazon = function(){
  var div = temp.titledInfo(
    'Amazon',
    "I worked at Amazon during the Summer of 2013 as a Software Engineering Intern.",
    'At Amazon I developed a text advertisement data model and implemented an API in Java for ' + 
    "creating and updating advertisements within that model."
  )
  return temp.linkedContainer('amazon', div, true, false, 85)
}

module.exports.dandb = function(){
  var div = temp.titledInfo(
    'D&B Credibility Corp.',
    "I worked at D&B during the Summer of 2011 as a Web Development Intern.",
    'At D&B I worked in PHP maintaining the backend of the company\'s website. I also worked with various public ' + 
    "API's to gather and validate business information."
  )
  return temp.linkedContainer('dandb', div, true, false, 85)
}

module.exports.viasat = function(){
  var div = temp.titledInfo(
    'ViaSat',
    "I worked at ViaSat during the Summer of 2012 as a Software Engineering Intern.",
    'At ViaSat I worked on a team of three interns to develop a prototype for a home security ' + 
    "and automation system. I worked primarily in Java."
  )
  return temp.linkedContainer('viasat', div, true, false, 85)
}
