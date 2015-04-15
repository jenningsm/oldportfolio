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
      dummy('experience'),
      dummy('education'),
  ]
  return connectPages(structure);
}


/////////////////////////////////////////////////


function contact(){

  var content = new Element('div').content(

    new Element('div')
    .style('margin-bottom', '10px')
    .content("Want to chat?<br> Shoot me an email:"),

    new Element('span')
    .content('mpjngs@gmail.com')

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
    },
  'name' : 'front'
  }
}


function dummy(name){
  return {
    'generator':
    function(){
      return coms.pageContainer().content(
        coms.flexBox().content(
          new Element('div').content(name)
        )
      )
    },
    'name' : name
  }
}


////////////////////////////////////////////


function plainInfo(name, content){

  return {
    'generator' :
    function(){
      return coms.pageContainer().content(
        coms.arrow('up', 'history.back()').style('z-index', '1'),
        coms.flexBox().content(
          content.style('max-width', '30%')
        )
      )
    },
    'name' : name
  }
}
