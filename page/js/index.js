window.onload = function(){
  var c = document.getElementById("canv");
  var $ = c.getContext("2d");
  c.width = window.innerWidth;
  c.height = window.innerHeight;


var px = 0;
var py = 0;
var blend = 100;

function splotch(x, y, r, col) {
  $.fillStyle = 'rgba(' + col.r + ', ' + col.g + ', ' + col.b + ', ' + col.a + ')';
  $.beginPath();
  $.arc(x, y, r, 0, Math.PI * 2, false);
  $.fill();
}

function bleed(px, py, pr, pcol) {
  var i = 0;
  var x = px;
  var y = py;
  var r = pr;
  var col = pcol;

  function inv(){
    window.requestAnimationFrame(inv);
    splotch(x, y, r * (i / blend), col);
    if (i == blend) window.cancelAnimationFrame(inv);
    i++;
  }
  inv();
}
function anim() {
  window.requestAnimationFrame(anim);
  var px = Math.floor(Math.random() * c.width);
  var py = Math.floor(Math.random() * c.height);
  var pr = Math.floor(Math.random() * 50);
  var pcol = {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255),
    a: 1 / blend
  }
  bleed(px, py, pr, pcol);
}
anim();

/*___Resize___*/
window.addEventListener('resize',function(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}, false);

}