
var Element = require('/home/mjennings/pagebuilder/html.js');

var pcolor = 'rgb(180, 20, 20)';
var scolor = 'rgb(255, 255, 235)';

var tops = { 
  'margin' : '0',
  'padding' : '0',
  'background' : scolor,
  'font-family':"'Quicksand', sans serif"
};


var html = new Element('html').style(tops);

var head = new Element('head').content(
  new Element('link', {'rel' : 'stylesheet', 'type' : 'text/css', 'href' : 'o.css'}),
  new Element('link', {'rel' : 'stylesheet', 'type' : 'text/css', 'href' : 'http://fonts.googleapis.com/css?family=Open+Sans:300'}),
  new Element('link', {'rel' : 'stylesheet', 'type' : 'text/css', 'href' : 'http://fonts.googleapis.com/css?family=Rajdhani:300,400'}),
  new Element('link', {'rel' : 'stylesheet', 'type' : 'text/css', 'href' : 'http://fonts.googleapis.com/css?family=Quicksand:300,400'})
);

var body = new Element('body').style(tops);

var red = new Element('div');
var height = 62;
red.style({
  'position': 'absolute',
  'width':'100%',
  'height': height + '%',
  'top' : (50 - height/2) + '%',
  'background-color': pcolor
});


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

html.content(
  head,
  body.content(
    red.content(
      title.content(
        '| MICHAEL JENNINGS |'
      )
    )
  )
);

var fs = require('fs');

var p = html.generate({}, true);
fs.writeFileSync('o.css', p.css);
fs.writeFileSync('index.html', p.html);
