
var Element = require('/home/mjennings/pagebuilder/html.js');

var pcolor = 'rgb(190, 20, 20)';
var scolor = 'rgb(255, 255, 205)';
var tcolor = 'rgb(220, 190, 120)';

/////////////////////////////////

var tops = { 
  'margin' : '0',
  'padding' : '0',
  'background' : scolor,
  'font-family':"'Quicksand', sans serif"
};

var html = new Element('html').style(tops);
var body = new Element('body').style(tops);
var head = new Element('head').content(
  new Element('link', {'rel' : 'stylesheet', 'type' : 'text/css', 'href' : 'o.css'}),
  new Element('link', {'rel' : 'stylesheet', 'type' : 'text/css', 'href' : 'http://fonts.googleapis.com/css?family=Quicksand:300,400'})
);


var height = 62;
var red = new Element('div').style({
  'position': 'absolute',
  'width':'100%',
  'height': height + '%',
  'top' : (50 - height/2) + '%',
  'background-color': pcolor
})

var title = new Element('div').style({
  'display' :'flex',
  'justify-content' : 'center',
  'align-items':'center',
  'font-weight' : '400',
  'font-size': '1.7em',
  'top' : '50%',
  'left' : '50%',
  'transform' : 'translate(-50%, -50%)',
  'color' : scolor,
  'position' : 'absolute'
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

//////////////////////////////////////

html.content(
  head,
  body.content(
    bars[0],
    bars[1],
    red.content(
      title.content(
        '| MICHAEL JENNINGS |'
      )
    )
  ),
  new Element('script', 'src', 'o.js'),
  new Element('script', 'src', 'back.js')
);

///////////////////////////////////

var fs = require('fs');
var p = html.generate({'svg1': svgs[0], 'svg2': svgs[1], 'tcolor' : tcolor}, true);
fs.writeFileSync('o.css', p.css);
fs.writeFileSync('o.js', p.js);
fs.writeFileSync('index.html', p.html);
