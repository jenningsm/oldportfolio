var embed = false;

var Element = require('/home/mjennings/pagebuilder/html.js');
var util = require('./tools/util.js');
var pages = require('./pages/pages.js');

//primary, secondary, and tertiary colors, respectively
var pcolor = [190, 20, 20];
var scolor = [255, 255, 205];
var tcolor = [220, 190, 120, .8];

/////////////////////////////////

var tops = { 
  'margin' : '0',
  'padding' : '0',
  'background' : util.colorString(scolor),
  'font-family':"'Quicksand', sans serif"
};

var html = new Element('html').style(tops);
var body = new Element('body').style(tops);
var head;
if(!embed){
  head = new Element('head').content(
    new Element('link', {'rel' : 'stylesheet', 'type' : 'text/css', 'href' : 'o.css'}),
    new Element('link', {'rel' : 'stylesheet', 'type' : 'text/css', 'href' : 'http://fonts.googleapis.com/css?family=Quicksand:300,400'})
  )
} else {
  head = new Element('head').embedJS().embedCSS().content(
    new Element('link', {'rel' : 'stylesheet', 'type' : 'text/css', 'href' : 'http://fonts.googleapis.com/css?family=Quicksand:300,400'})
  )
}


var height = 62;
var red = new Element('div').style({
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
var bars = [];
var svgs = [];
for(var i = 0; i < dirs.length; i++){
  var a = bargen(dirs[i], 50 - height / 2, scolor, tcolor);
  bars.push(a[0]);
  svgs.push(a[1]['svg']);
}

var scripts = [
  new Element('script', 'src', 'cs/util.js'),
  new Element('script', 'src', 'cs/motion.js'),
  new Element('script', 'src', 'cs/paging.js'),
  new Element('script', 'src', 'cs/taperedline.js'),
  new Element('script', 'src', 'cs/back.js'),
  new Element('script', 'src', 'cs/boxtext.js')
];
if(!embed){
  scripts.unshift(new Element('script', 'src', 'o.js'));
}

pages = pages(util.colorString(scolor));

//////////////////////////////////////

html.content(
  head,
  body.content(
    bars[0],
    bars[1],
    red.content(
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
}, true);

var fs = require('fs');
if(p.css !== undefined){
  fs.writeFileSync('o.css', p.css);
}
if(p.js !== undefined){
  fs.writeFileSync('o.js', p.js);
}
fs.writeFileSync('index.html', p.html);
