var embed = false;
var legible = true;

var Element = require('/home/mjennings/pagebuilder/html.js');
var util = require('./tools/util.js');

//primary, secondary, and tertiary colors, respectively
var pcolor = [190, 20, 20];
var scolor = [255, 255, 205];
var tcolor = [220, 190, 120, .8];

/////////////////////////////////

var html = new Element('html').style({
  'margin' : '0',
  'padding' : '0',
  'background' : util.colorString(scolor),
  'font-family':"'Quicksand', sans serif"
})

var body = new Element('body').style({
  'margin' : '0',
  'padding' : '0'
})

var head = new Element('head').content(
  new Element('link').attribute({
    'rel' : 'stylesheet', 
    'type' : 'text/css', 
    'href' : 'http://fonts.googleapis.com/css?family=Quicksand:300,400'
  })
)

if(!embed){
  head.content(
    new Element('link').attribute({
      'rel' : 'stylesheet',
      'type' : 'text/css',
      'href' : 'o.css'
    })
  )
} else {
  head.embedJS().embedCSS()
}

var height = 62;
var bulk = new Element('div').style({
  'position': 'absolute',
  'width':'100%',
  'height': height + '%',
  'top' : (50 - height/2) + '%',
  'background-color': util.colorString(pcolor),
  'color' : util.colorString(scolor),
  'overflow' : 'hidden'
})


var bargen = require('./bars.js');
var dirs = ['top', 'bottom'];
var barContent = [];
var svgs = [];
for(var i = 0; i < dirs.length; i++){
  var a = bargen(dirs[i], 50 - height / 2, scolor, tcolor);
  barContent.push(a.svg, a.gradient);
  svgs.push(a.svg);
}

var scripts = [
  new Element('script', 'src', 'cs/util.js'),
  new Element('script', 'src', 'cs/motion.js'),
  new Element('script', 'src', 'cs/paging.js'),
  new Element('script', 'src', 'cs/taperedline.js'),
  new Element('script', 'src', 'cs/back.js'),
];
if(!embed){
  scripts.unshift(new Element('script', 'src', 'o.js'));
}

var pages = require('./pages/pages.js')(util.colorString(scolor));

//////////////////////////////////////

html.content(
  head,
  body.content(
    barContent,
    bulk.content(
      pages
    )
  ),
  scripts
);

///////////////////////////////////

var p = html.generate({
  'svgs': svgs,
  'tcolor' : util.colorString(tcolor),
  'pages' : pages
}, legible);

var fs = require('fs');
if(p.css !== undefined){
  fs.writeFileSync('o.css', p.css);
}
if(p.js !== undefined){
  fs.writeFileSync('o.js', p.js);
}
fs.writeFileSync('index.html', p.html);
