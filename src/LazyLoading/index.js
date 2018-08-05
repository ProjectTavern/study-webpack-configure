var last_known_scroll_position = 0;
var ticking = false;

window.addEventListener('scroll', function(event) {
  console.log("SCROLLED");
  last_known_scroll_position = window.scrollY;
  if (!ticking) {

    window.requestAnimationFrame(function() {
      // doSomething(last_known_scroll_position);
      ticking = false;
    });
    ticking = true;
  }
});