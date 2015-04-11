
var root = '/dr';

var p = pbr.pages;
var keys = Object.keys(p);
var pages = {};

for (var i = 0; i < keys.length; i++){
  pages[keys[i]] = p[keys[i]]();
}

window.addEventListener('popstate', function(e) { toPage(e.state.page, 'down', 'pop') });

var frontPage = 'front';

var currPage = frontPage;
currPage.display = 'block';
history.replaceState({page : currPage}, '', root + '/');

/*
  Transitions to a page

  from : the current page to transition from
  to : the page to transition to
  dir : a boolean specifying if the page should transition up (true) or down (false)
*/
var queue = null;
var lock = false;

function toPage(page, dir, action){
  if(lock){
    queue = {'page' : page, 'dir': dir, 'action' : action}
    return
  } else {
    lock = true;
  }

  var urlEnd = (page === frontPage ? '' : page);
  if(action === 'push'){
    history.pushState({page : page}, '', root + '/' + urlEnd);
  } else if(action === 'replace'){
    history.replaceState({page : page}, '', root + '/' + urlEnd);
  }

  var to = pages[page]
  var from = pages[currPage]

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
      currPage = page;

      lock = false;
      if(queue !== null){
        var hold = queue
        queue = null
        toPage(hold.page, hold.dir, hold.action)
      }
    }
  }

  to.style.transform = "translate3d(" + transform(-1) + ')';
  to.style.display = 'block';
  to.style.opacity = 0;
  requestAnimationFrame(transition);
}
