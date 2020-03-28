document.addEventListener("DOMContentLoaded", function(e) {
  var countries = document.getElementsByTagName("path");

  for (var i = 0; i < countries.length; i++) {
    countries[i].addEventListener("mousemove", function(event) {
      document.getElementById("box").style.display = "block";
      document.getElementById("box").innerHTML = this.getAttribute("data-name");
      document.getElementById("box").style.top = event.offsetY - 10 + "px";
      document.getElementById("box").style.left = event.offsetX + "px";
    });
    countries[i].addEventListener("mouseleave", function(event) {
      document.getElementById("box").style.display = "none";
    });
  }
});
