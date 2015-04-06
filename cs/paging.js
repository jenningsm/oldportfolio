

var p = pbr.pages;
var keys = Object.keys(p);
var pages = {};

for (var i = 0; i < keys.length; i++){
  pages[keys[i]] = p[keys[i]]();
}

/*
  Transitions to a page

  from : the current page to transition from
  to : the page to transition to
  dir : a boolean specifying if the page should transition up (true) or down (false)
*/
function toPage(from, to, dir){
  var move = motion(3, 3);

  var speed = .02;
  var time = 0;

  var toStart = (dir ? 1 : -1) * 100;
  function transition(){
    time += speed;
    var pos = move(time);
    if(pos < 1){
      var shift = (dir ? -1 : 1) * pos * 100;
      from.style.transform = "translate3d(0, " + shift + '%, 0)';
      to.style.transform = "translate3d(0, " + (toStart + shift) + '%, 0)';
      var pro = .6;
      from.style.opacity = Math.max(0, (1 - time / pro))
      to.style.opacity = Math.max(0, (time - 1 + pro) / pro);
      requestAnimationFrame(transition);
    } else {
      from.style.transform = "translate3d(0, " + (dir ? -100 : 100) + '%, 0)';
      from.style.display = "none";
      to.style.transform = "translate3d(0, 0, 0)";
      to.style.opacity = 1;
    }
  }

  to.style.transform = "translate3d(0, " + toStart + '%, 0)';
  to.style.display = 'block';
  to.style.opacity = 0;
  requestAnimationFrame(transition);
}
