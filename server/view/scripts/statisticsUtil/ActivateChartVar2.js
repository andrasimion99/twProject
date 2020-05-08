(async () => {
  await addCountries();
  var charts = document.getElementsByClassName("Chart");
  var chart = "";

  var series = document.getElementsByClassName("Series");
  var seriesValue = [];
  var seriesName = "";

  var countries = document.getElementsByClassName("Country");
  var checkedCountries = [];

  var maxValue = 5;
  /*-----Event listener for countries check box------*/
  for (var i = 0; i < countries.length; i++) {
    countries[i].addEventListener("change", function () {
      if (this.checked) {
        document.getElementById("error-message").innerHTML = "";
        checkedCountries.push(this.value);
        if (chart == "line-chart" || chart == "column-chart") {
          createChart(checkedCountries, seriesName, seriesValue, chart);
          if (checkedCountries.length >= maxValue) {
            document.getElementById("error-message").innerHTML =
              "Can't select more than 5";
            disableAll(checkedCountries, "Country");
          }
        }
      } else {
        const index = checkedCountries.indexOf(this.value);
        if (index > -1) {
          checkedCountries.splice(index, 1);
        }
        if (chart == "line-chart" || chart == "column-chart") {
          if (checkedCountries.length < maxValue) {
            createChart(checkedCountries, seriesName, seriesValue, chart);
            document.getElementById("error-message").innerHTML = "";
            removeDisable(checkedCountries, "Country");
          }
          if (checkedCountries.length == maxValue) {
            disableAll(checkedCountries, "Country");
          }
        }
      }
    });
  }

  /*-----Event listener for chart tipe------*/

  for (var i = 0; i < charts.length; i++) {
    charts[i].addEventListener("click", function () {
      chart = this.value;
      this.style.border = "5px solid #2980b9";
      unclickAll(this);
      createChart(checkedCountries, seriesName, seriesValue, chart);
      if (this.value == "line-chart" || this.value == "column-chart") {
        if (checkedCountries.length > 5) {
          document.getElementById("error-message").innerHTML =
            "Can't select more than 5 for this type of chart";
        } else {
          document.getElementById("error-message").innerHTML = "";
        }
      }
    });
  }

  /*-----Event listener for series check box------*/
  for (var i = 0; i < series.length; i++) {
    series[i].addEventListener("change", function () {
      if (this.checked) {
        document.getElementById("error-message").innerHTML = "";
        seriesValue.push(this.value);
        seriesName = this.name;
        createChart(checkedCountries, seriesName, seriesValue, chart);
        if (this.value === "All") {
          disableAllUnlessThis(seriesName, seriesValue, "Series");
        } else {
          disableAllSeries(seriesName, "Series");
        }
      } else {
        const index = seriesValue.indexOf(this.value);
        if (index > -1) {
          seriesValue.splice(index, 1);
        }
        if (this.value === "All") {
          removeDisable(seriesValue, "Series");
        } else {
          if (seriesValue.length === 0) removeDisable(seriesValue, "Series");
        }
        createChart(checkedCountries, seriesName, seriesValue, chart);
      }
    });
  }
})();

function unclickAll(currentChart) {
  var charts = document.getElementsByClassName("Chart");
  for (var i = 0; i < charts.length; i++) {
    if (charts[i] != currentChart) {
      charts[i].style.border = "none";
    }
  }
}

function createChart(countries, seriesName, seriesValue, chart) {
  console.log(chart);
  if (chart == "line-chart") {
    if (countries.length == 1 && seriesValue.length == 1) {
      if (seriesValue[0] != "All")
        createLineChart(seriesName, countries[0], seriesValue[0]);
      else createLineChartAll(seriesName, countries[0]);
    } else if (countries.length > 1 && seriesValue.length == 1) {
      if (seriesValue[0] != "All")
        groupedBarChartCountries(seriesName, seriesValue[0], countries);
      else {
        document.getElementById("error-message").innerHTML =
          "Can't select more countries for all series";
        d3.select("svg").remove();
        d3.select("table").remove();
      }
    } else if (countries.length === 1 && seriesValue.length > 1) {
      createLineChartSeries(seriesName, countries[0], seriesValue);
    } else if (countries.length > 1 && seriesValue.length > 1) {
      document.getElementById("error-message").innerHTML =
        "Can't select more countries and more series for this type of chart";
      d3.select("svg").remove();
      d3.select("table").remove();
    }
  } else if (chart == "column-chart") {
    if (countries.length == 1 && seriesValue.length == 1) {
      if (seriesValue[0] != "All")
        createBarChartYear(seriesName, countries[0], seriesValue[0]);
      else createBarChartAll(seriesName, countries[0]);
    } else if (countries.length > 1 && seriesValue.length == 1) {
      if (seriesValue[0] != "All")
        groupedBarChartCountries(seriesName, seriesValue[0], countries);
      else {
        document.getElementById("error-message").innerHTML =
          "Can't select more countries for all series";
        d3.select("svg").remove();
        d3.select("table").remove();
      }
    } else if (countries.length === 1 && seriesValue.length > 1) {
      groupedBarChartSeries(seriesName, countries[0], seriesValue);
    } else if (countries.length > 1 && seriesValue.length > 1) {
      document.getElementById("error-message").innerHTML =
        "Can't select more countries and more series for this type of chart";
      d3.select("svg").remove();
      d3.select("table").remove();
    }
  }
}

function disableAll(checkedValues, id) {
  var elements = document.getElementsByClassName(id);
  console.log(elements[0]);
  for (var i = 0; i < elements.length; i++) {
    {
      if (checkedValues.includes(elements[i].value) === false)
        elements[i].setAttribute("disabled", "");
    }
  }
}

function disableAllUnlessThis(seriesName, seriesValue, id) {
  var elements = document.getElementsByClassName(id);
  console.log(elements[0]);
  for (var i = 0; i < elements.length; i++) {
    {
      if (elements[i].value != seriesValue || elements[i].name != seriesName)
        elements[i].setAttribute("disabled", "");
    }
  }
}

function disableAllSeries(seriesName, id) {
  var elements = document.getElementsByClassName(id);
  console.log(elements[0]);
  for (var i = 0; i < elements.length; i++) {
    {
      if (elements[i].name != seriesName)
        elements[i].setAttribute("disabled", "");
      if (elements[i].name == seriesName && elements[i].value == "All")
        elements[i].setAttribute("disabled", "");
    }
  }
}

function removeDisable(checkedValues, id) {
  var elements = document.getElementsByClassName(id);
  for (var i = 0; i < elements.length; i++) {
    {
      if (checkedValues.includes(elements[i].value) === false)
        elements[i].removeAttribute("disabled");
    }
  }
}
