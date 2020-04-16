document.addEventListener("DOMContentLoaded", function (e) {
  var countries = document.getElementsByTagName("path");
  var valuesObj = {};

  for (var i = 0; i < countries.length; i++) {
    (async () => {
      var countryName = await countries[i].getAttribute("data-name");
      await fetch(
        "http://localhost:3001/api/states?country=" + countryName + "&year=2018"
      )
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          valuesObj[countryName] = res.data[0].Data_Value;
        })
        .catch((error) => {
          console.log(error);
        });
    })();
    countries[i].addEventListener("mousemove", function (event) {
      document.getElementById("box").style.display = "block";
      var data = "<div>" + this.getAttribute("data-name") + "</div>";
      data += "<div>" + this.getAttribute("data-capital") + "</div>";
      data += "<div>" + valuesObj[this.getAttribute("data-name")] + "</div>";
      document.getElementById("box").innerHTML = data;
      document.getElementById("box").style.top = event.offsetY - 70 + "px";
      document.getElementById("box").style.left = event.offsetX + "px";
    });
    countries[i].addEventListener("mouseleave", function (event) {
      document.getElementById("box").style.display = "none";
    });
  }
});
