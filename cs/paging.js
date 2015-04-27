
var root = pbr.root;

var p = pbr.pages;
var keys = Object.keys(p);
var pages = {};

for (var i = 0; i < keys.length; i++){
  pages[keys[i]] = {'page' : p[keys[i]].page(), 'url' : p[keys[i]].url}
  if(p[keys[i]].container !== undefined){
    pages[keys[i]].container = p[keys[i]].container()
  }
}

var frontPage = 'front'
var currPageName

var url = window.location.pathname.split('/')
if(url.length === 2 || url[2] === ''){
  currPageName = 'front'
} else {
  currPageName = url[url.length - 1]
}

if(pages[currPageName] === undefined){
  currPageName = '404'
}

function sizeContainer(){
  var width = window.innerWidth
  var conWidth = Math.min(width * .9, Math.pow(width, .45) * 30)
  var keys = Object.keys(pages)
  for(var i = 0; i < keys.length; i++){
    if(pages[keys[i]].container !== undefined){
      pages[keys[i]].container.style.maxWidth = p[keys[i]].width * conWidth + 'px'
    }
  }
}
sizeContainer()
window.addEventListener('resize', sizeContainer)

pages[currPageName].page.style.display = 'block';

//the history
var hist = [currPageName]

//go up in the hierarchy, from which ever page the current
//page was linked from
function up(backup){
  hist.pop()
  if(hist.length > 0){
    toPage(hist[hist.length-1], 'down', true)
  } else {
    backup()
  }
}

/*
  Transitions to a page

  from : the current page to transition from
  to : the page to transition to
  dir : a boolean specifying if the page should transition up (true) or down (false)
*/
var queue = null;
var lock = false;

function toPage(page, dir, back){
  if(lock){
    queue = {'page' : page, 'dir': dir}
    return
  } else {
    lock = true;
  }

  if(back !== true){
    if(dir !== 'left' && dir !== 'right'){
      hist.push(page)
    } else {
      hist[hist.length-1] = page
    }
  }
  history.replaceState(null, '', root + pages[page].url)

  var to = pages[page].page
  var from = pages[currPageName].page

  var move = motion(3, 3);

  var speed = .017;
  var time = 0;

  var transforms = {
    'right' : function(x) { return (x * 100) + '%,0,0' },
    'left' : function(x) { return (-1 * x * 100) + '%,0,0' },
    'up' : function(x) { return '0,' + (-1 * x * 100) + '%,0' },
    'down' : function(x) { return '0,' + (x * 100) + '%,0' }
  }
  var transform = transforms[dir];

  function transition(){
    time += speed;
    var pos = move(time);
    if(pos < 1){
      var pro = .5;
      if(time < pro + speed){
        if(time < pro){
          from.style.opacity = 1 - time / pro
          from.style.transform = "translate3d(" + transform(pos) + ')';
        } else {
          from.style.display = 'none';
        }
      }
      if(time > (1 - pro)){
        to.style.transform = "translate3d(" + transform(pos-1) + ')';
        to.style.opacity = Math.max(0, (time - 1 + pro) / pro);
      }
      requestAnimationFrame(transition);
    } else {
      to.style.transform = "translate3d(0, 0, 0)";
      to.style.opacity = 1;
      currPageName = page;

      lock = false;
      if(queue !== null){
        var hold = queue
        queue = null
        toPage(hold.page, hold.dir)
      }
    }
  }

  to.style.transform = "translate3d(" + transform(-1) + ')';
  to.style.display = 'block';
  to.style.opacity = 0;
  requestAnimationFrame(transition);
}
