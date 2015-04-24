
var root = '/dr/';

var p = pbr.pages;
var keys = Object.keys(p);
var pages = {};

for (var i = 0; i < keys.length; i++){
  pages[keys[i]] = {'page' : p[keys[i]].page(), 'url' : p[keys[i]].url}
}


var opposites = {
  'up' : 'down',
  'down' : 'up',
  'right' : 'left',
  'left' : 'right'
}

//we keep track of the direction of each page transition, so
//when the user goes back or forward we know which direction to go
var historyIndex = -1
var dirs = []

window.addEventListener('popstate',
  function(e) {
    var dir
    if(e.state.historyIndex > historyIndex){
      dir = dirs[e.state.historyIndex]
    } else {
      dir = opposites[dirs[historyIndex]]
    }
    historyIndex = e.state.historyIndex
    toPage(e.state.page, dir, true)
  }
);

var frontPage = 'front'
var currPageName

var url = window.location.pathname.split('/')
if(url.length === 2 || url[2] === ''){
  currPageName = 'front'
} else {
  currPageName = url[url.length - 1]
}

pages[currPageName].page.style.display = 'block';

history.replaceState({page : currPageName, historyIndex: -1}, '', window.location.pathname);


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
    historyIndex++;
    history.pushState({page : page, historyIndex : historyIndex}, '', root + pages[page].url)
    dirs[historyIndex] = dir
  }

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
