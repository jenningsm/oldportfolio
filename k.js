var embed = false;
var legible = false;

var Element = require('/home/mjennings/pagebuilder/html.js');


var colors = require('./colors.js');

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
  })
)
if(!embed){
  head.content(
    new Element('link/').attribute({
      'rel' : 'stylesheet',
      'type' : 'text/css',
      'href' : '/dr/o.css'
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
var svgs = [];
for(var i = 0; i < dirs.length; i++){
  var a = bargen(dirs[i], 50 - height / 2, colors.scolor, colors.tcolor);
  barContent.push(a.svg, a.gradient);
  svgs.push(a.svg);
}

var scripts = [
  new Element('script', 'src', '/dr/cs/motion.js'),
  new Element('script', 'src', '/dr/cs/paging.js'),
  new Element('script', 'src', '/dr/cs/taperedline.js'),
  new Element('script', 'src', '/dr/cs/back.js'),
];
if(!embed){
  scripts.unshift(new Element('script', 'src', '/dr/o.js'));
}

var pages = require('./pages/pages.js')();
var pageList = [];
var keys = Object.keys(pages);
for(var i = 0; i < keys.length; i++){
  pageList.push(pages[keys[i]]);
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
  'svgs': svgs,
  'tcolor' : colors.colorString(colors.tcolor),
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
