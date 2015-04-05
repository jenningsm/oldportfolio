
/*
  Transitions to a page

  from : the current page to transition from
  to : the page to transition to
  dir : a boolean specifying if the page should transition up (true) or down (false)
*/
function toPage(from, to, dir){
  var move = motion(3, 3);

  var speed = .01;
  var time = 0;

  var toStart = (dir ? 1 : -1) * 100;
  function transition(){
    time += speed;
    var pos = move(time);
    if(pos < 1){
      var shift = (dir ? -1 : 1) * pos * 100;
      from.style.transform = "translate3d(0, " + shift + '%, 0)';
      to.style.transform = "translate3d(0, " + (toStart + shift) + '%, 0)';
      requestAnimationFrame(transitionFrom);
    } else {
      from.style.transform = "translate3d(0, " + (dir ? -100 : 100) + '%, 0)';
      from.style.display = "none";
      to.style.transform = null;
    }
  }

  to.style.transform = "translate3d(0, " + toStart + '%, 0)';
  to.style.display = null;
  requestAnimationFrame(transition);
}
