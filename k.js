var embed = true;
var legible = true;

var Element = require('/home/mjennings/pagebuilder/html.js');
var colors = require('./colors.js');

var root = '/dr/'

/////////////////////////////////

var html = new Element('html').style({
  'margin' : '0',
  'padding' : '0',
  'background' : colors.colorString(colors.scolor),
  'font-family':"'Open Sans', sans serif"
})

var body = new Element('body').style({
  'margin' : '0',
  'padding' : '0'
})

var head = new Element('head').content(
  new Element('link/').attribute({
    'rel' : 'stylesheet', 
    'type' : 'text/css', 
    'href' : 'http://fonts.googleapis.com/css?family=Quicksand:400'
  }),
  new Element('link/').attribute({
    'rel' : 'stylesheet', 
    'type' : 'text/css', 
    'href' : 'http://fonts.googleapis.com/css?family=Open+Sans:300'
  }),
  new Element('title').content(
    'Michael Jennings'
  )
)
if(!embed){
  head.content(
    new Element('link/').attribute({
      'rel' : 'stylesheet',
      'type' : 'text/css',
      'href' : root + 'o.css'
    })
  )
} else {
  head.embedJS().embedCSS()
}

var height = 62;
var main = new Element('div').style({
  'position': 'absolute',
  'width':'100%',
  'height': height + '%',
  'top' : (50 - height/2) + '%',
  'background-color': colors.colorString(colors.pcolor),
  'color' : colors.colorString(colors.scolor),
  'overflow' : 'hidden'
})


var bargen = require('./bars.js');
var dirs = ['top', 'bottom'];
var barContent = [];
var canvases = [];
for(var i = 0; i < dirs.length; i++){
  var a = bargen(dirs[i], 50 - height / 2, colors.scolor, colors.tcolor);
  barContent.push(a.canvas, a.gradient);
  canvases.push(a.canvas);
}

var scripts = [
  new Element('script', 'src', root + 'cs/util.js'),
  new Element('script', 'src', root + 'cs/motion.js'),
  new Element('script', 'src', root + 'cs/paging.js'),
  new Element('script', 'src', root + 'cs/back.js'),
];
if(!embed){
  scripts.unshift(new Element('script', 'src', root + 'o.js'));
}

var pages = require('./pages/pages.js')();
var pageList = [];
var keys = Object.keys(pages);
for(var i = 0; i < keys.length; i++){
  pageList.push(pages[keys[i]].page);
}

//////////////////////////////////////

html.content(
  head,
  body.content(
    barContent,
    main.content(
      pageList
    )
  ),
  scripts
);

///////////////////////////////////

var p = html.generate({
  'root' : root,
  'canvases': canvases,
  'tcolor' : colors.tcolor,
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
