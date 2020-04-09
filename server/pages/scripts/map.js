document.addEventListener("DOMContentLoaded", function (e) {
  var countries = document.getElementsByTagName("path");

  for (var i = 0; i < countries.length; i++) {
    countries[i].addEventListener("mousemove", function (event) {
      document.getElementById("box").style.display = "block";
      var data = "<div>" + this.getAttribute("data-name") + "</div>";
      data += "<div>" + this.getAttribute("data-capital") + "</div>";
      document.getElementById("box").innerHTML = data;
      document.getElementById("box").style.top = event.offsetY - 30 + "px";
      document.getElementById("box").style.left = event.offsetX + "px";
      fetch(
        "https://api.covid19api.com/dayone/country/romania/status/confirmed"
      )
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          console.log(res);
        });
    });
    countries[i].addEventListener("mouseleave", function (event) {
      document.getElementById("box").style.display = "none";
    });
  }
});
