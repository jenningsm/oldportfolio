
var root = '/dr';

var p = pbr.pages;
var keys = Object.keys(p);
var pages = {};

for (var i = 0; i < keys.length; i++){
  pages[keys[i]] = p[keys[i]]();
}

window.addEventListener('popstate', function(e) { toPage(e.state.page, 'down', 'pop') });

var currPage = 'front';
currPage.display = 'block';
history.replaceState({page : currPage}, '', root + '/');

/*
  Transitions to a page

  from : the current page to transition from
  to : the page to transition to
  dir : a boolean specifying if the page should transition up (true) or down (false)
*/
var lock = false;

function toPage(page, dir, action){
  if(lock){
    return
  } else {
    lock = true;
  }

  if(action === 'push'){
    history.pushState({page : page}, '', root + '/' + page);
  } else if(action === 'replace'){
    history.replaceState({page : page}, '', root + '/' + page);
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
      from.style.transform = "translate3d(" + transform(pos) + ')';
      to.style.transform = "translate3d(" + transform(pos-1) + ')';
      var pro = .5;
      if(time < pro + speed){
        if(time < pro){
          from.style.opacity = Math.max(0, (1 - time / pro))
        } else {
          from.style.opacity = 0;
        }
      }
      if(time > (1 - pro)){
        to.style.opacity = Math.max(0, (time - 1 + pro) / pro);
      }
      requestAnimationFrame(transition);
    } else {
      from.style.transform = "translate3d(" + transform(1) + ')';
      from.style.display = "none";
      to.style.transform = "translate3d(0, 0, 0)";
      to.style.opacity = 1;
      currPage = page;
      lock = false;
    }
  }

  to.style.transform = "translate3d(" + transform(-1) + ')';
  to.style.display = 'block';
  to.style.opacity = 0;
  requestAnimationFrame(transition);
}
