document.addEventListener("DOMContentLoaded", function (e) {
  var countries = document.getElementsByTagName("path");
  var valuesObj = {};
  (async () => {
    const years = await document.getElementById("years");
    var year = years.options[years.selectedIndex].value;

    years.addEventListener("change", async function (event) {
      year = years.options[years.selectedIndex].value;
      await apiReq(year);
    });

    await apiReq(year);

    return valuesObj;
  })().then((valuesData) => {
    for (var i = 0; i < countries.length; i++) {
      countries[i].addEventListener("mouseover", function (event) {
        this.style.opacity = 0.5;
      });
      countries[i].addEventListener("mouseout", function (event) {
        this.style.opacity = 1;
      });
      countries[i].addEventListener("mousemove", function (event) {
        document.getElementById("box").style.display = "block";
        var data = "<div>" + this.getAttribute("data-name") + "</div>";
        data += "<div>" + valuesData[this.getAttribute("data-name")] + "%" +  "</div>";
        document.getElementById("box").innerHTML = data;
        document.getElementById("box").style.top = event.offsetY - 30 + "px";
        document.getElementById("box").style.left = event.offsetX + "px";
      });
      countries[i].addEventListener("mouseleave", function (event) {
        document.getElementById("box").style.display = "none";
      });
    }
  });

  var apiReq = async function (year) {
    for (const country of countries) {
      await (async () => {
        var countryName = await country.getAttribute("data-name");
        await fetch(
          "http://localhost:3001/api/states?country=" +
            countryName +
            "&year=" +
            year
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
      if (20 > valuesObj[country.getAttribute("data-name")]) {
        country.style.fill = "#cbe9f7";
      } else if (
        25 > valuesObj[country.getAttribute("data-name")] &&
        valuesObj[country.getAttribute("data-name")] >= 20
      ) {
        country.style.fill = "#a4d8eb";
      } else if (
        30 > valuesObj[country.getAttribute("data-name")] &&
        valuesObj[country.getAttribute("data-name")] >= 25
      ) {
        country.style.fill = "#71cef0";
      } else if (
        35 > valuesObj[country.getAttribute("data-name")] &&
        valuesObj[country.getAttribute("data-name")] >= 30
      ) {
        country.style.fill = "#1ca4d6";
      } else if (valuesObj[country.getAttribute("data-name")] >= 35) {
        country.style.fill = "#027fad";
      }
    }
  };
});
