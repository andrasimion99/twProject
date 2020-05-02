(async () => {
  await addCountries();
  var charts = document.getElementsByClassName("Chart");
  var chart = "";

  var series = document.getElementsByClassName("Series");
  var seriesValue = "";
  var seriesName = "";

  var countries = document.getElementsByClassName("Country");
  var country = "";

  /*-----Event listener for countries check box------*/
  for (var i = 0; i < countries.length; i++) {
    countries[i].addEventListener("change", function () {
      if (this.checked) {
        country = this.value;
        disableAll(this, "Country");
        if (chart == "column-chart" && seriesValue == "All") {
          if (seriesName === "gender") {
            groupedBarchart(seriesName, country, ["Female", "Male"]);
          } else {
            createChart(seriesName, country);
          }
        } else if (chart == "column-chart" && seriesValue == "Total") {
          createBarchart("states", country);
        } else if (chart == "column-chart") {
          createBarchart(seriesName, country, seriesValue);
        }
      } else {
        country = "";
        removeDisable(this, "Country");
        d3.select("svg").remove();
        d3.select("table").remove();
      }
    });
  }

  /*-----Event listener for chart tipe------*/

  for (var i = 0; i < charts.length; i++) {
    charts[i].addEventListener("click", function () {
      chart = this.value;
      this.style.border = "5px solid #2980b9";
      unclickAll(this);
      if (chart == "column-chart" && country != "" && seriesValue == "All") {
        if (seriesName === "gender") {
          groupedBarchart(seriesName, country, ["Female", "Male"]);
        } else {
          createChart(seriesName, country);
        }
      } else if (chart == "column-chart" && seriesValue == "Total") {
        createBarchart("states", country);
      } else if (chart == "column-chart") {
        createBarchart(seriesName, country, seriesValue);
      } else {
        d3.select("svg").remove();
        d3.select("table").remove();
      }
    });
  }

  /*-----Event listener for series check box------*/
  for (var i = 0; i < series.length; i++) {
    series[i].addEventListener("change", function () {
      if (this.checked) {
        seriesValue = this.value;
        seriesName = this.name;
        disableAll(this, "Series");
        if (chart == "column-chart" && country != "" && seriesValue == "All") {
          if (seriesName === "gender") {
            groupedBarchart(seriesName, country, ["Female", "Male"]);
          } else {
            createChart(seriesName, country);
          }
        } else if (chart == "column-chart" && seriesValue == "Total") {
          createBarchart("states", country);
        } else if (chart == "column-chart") {
          createBarchart(seriesName, country, seriesValue);
        }
      } else {
        seriesValue = "";
        seriesName = "";
        removeDisable(this, "Series");
        d3.select("svg").remove();
        d3.select("table").remove();
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

function disableAll(currentChecked, id) {
  var elements = document.getElementsByClassName(id);
  for (var i = 0; i < elements.length; i++) {
    {
      if (elements[i] != currentChecked)
        elements[i].setAttribute("disabled", "");
    }
  }
}

function removeDisable(currentChecked, id) {
  var elements = document.getElementsByClassName(id);
  for (var i = 0; i < elements.length; i++) {
    {
      if (elements[i] != currentChecked)
        elements[i].removeAttribute("disabled");
    }
  }
}

async function addCountries() {
  await fetch("http://localhost:3001/api/states?year=2018")
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      var data = res.data;
      var countryArr = [];
      for (var i = 0; i < data.length; i++) {
        countryArr.push(data[i].LocationDesc);
      }
      var countries = d3
        .select("#dropdown-countries")
        .selectAll("div")
        .data(countryArr)
        .enter()
        .append("div")
        .attr("class", "checkbox");
      countries
        .append("input")
        .attr("class", "Country")
        .attr("type", "checkbox")
        .attr("name", "Country")
        .attr("value", function (d, i) {
          return countryArr[i];
        });

      countries
        .append("label")
        .attr("for", "country")
        .text(function (d, i) {
          return countryArr[i];
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

function createChart(seriesName, country) {
  d3.select("svg").remove();
  d3.select("table").remove();
  fetch("http://localhost:3001/api/" + seriesName + "?country=" + country)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      data = res.data;
      var minYear = d3.min(data, function (d) {
        return parseInt(d.Description);
      });
      var maxYear = d3.max(data, function (d) {
        return parseInt(d.Description);
      });
      var maxPercent = d3.max(data, function (d) {
        return parseFloat(d.Data_Value);
      });
      var numBars = d3
        .set(data, function (d) {
          return d.Stratification1;
        })
        .size();

      var margin = { left: 100, right: 10, top: 10, bottom: 180 };
      if (seriesName === "age") {
        margin.bottom = 100;
      }
      var yearsArr = [];
      var width = 500 - margin.left - margin.right;
      var height = 450 - margin.top - margin.bottom;
      var barPadding = 20;
      if (numBars <= 4) {
        barPadding = 40;
      }
      var barWidth = width / numBars - barPadding;
      var color = d3
        .scaleOrdinal()
        .domain(
          data.map(function (d) {
            return d.Stratification1;
          })
        )
        .range(["#00a8cc", "#005082", "#ffa41b"]);
      var xscale = d3
        .scaleBand()
        .domain(
          data.map(function (d) {
            return d.Stratification1;
          })
        )
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);
      var yscale = d3.scaleLinear().domain([0, maxPercent]).range([height, 0]);

      var svg = d3
        .select("#chart-area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      var g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      g.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 20)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text(country + " - " + seriesName);

      g.append("text")
        .attr("class", "y-axis-label")
        .attr("x", -(height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Obesity Percentage (%)");

      var xAxis = d3.axisBottom(xscale);
      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

      var yAxis = d3.axisLeft(yscale).tickFormat(function (d) {
        return d + "%";
      });
      g.append("g").attr("class", "y-axis").call(yAxis);

      var valueBox = d3
        .select("#chart-area")
        .data(
          data.filter(function (d) {
            return parseInt(d.Description) === minYear;
          })
        )
        .append("div")
        .style("position", "absolute")
        .style("color", "#ffffff")
        .style("z-index", "10")
        .style("display", "none")
        .style("background", "#212121")
        .style("border", "0px solid #ffffff")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("font-size", "14px")
        .text(function (d) {
          return d.Data_Value;
        });

      var rects = g
        .selectAll("rect")
        .data(
          data.filter(function (d) {
            return parseInt(d.Description) === minYear;
          })
        )
        .enter()
        .append("rect")
        .attr("width", barWidth)
        .attr("height", function (d) {
          if (d.Data_Value === "~") {
            d.Data_Value = 0;
          }
          return height - yscale(parseFloat(d.Data_Value));
        })
        .attr("y", function (d) {
          return yscale(parseFloat(d.Data_Value));
        })
        .attr("x", function (d, i) {
          // return (barWidth + barPadding) * i;
          return xscale(d.Stratification1);
        })
        .attr("fill", function (d) {
          return color(d.Stratification1);
        })
        .on("mouseover", function (d) {
          valueBox.text(d.Data_Value);
          this.style.opacity = 0.7;
          return valueBox.style("display", "block");
        })
        .on("mousemove", function () {
          return valueBox
            .style("top", d3.event.pageY - 30 + "px")
            .style("left", d3.event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          this.style.opacity = 1;
          return valueBox.style("display", "none");
        });

      var timeBar = d3
        .select("#chart-area")
        .append("table")
        .attr("id", "time-bar")
        .attr("width", width + margin.left + margin.right)
        .append("thead")
        .append("tr");

      var timeImg = timeBar.append("th").attr("id", "time-img");
      var playIcon = timeImg.append("i").attr("class", "far fa-play-circle");

      var timeTable = timeBar.append("th").attr("id", "time-table");
      var timeCells = timeTable
        .append("table")
        .attr("id", "time-cells")
        .attr("width", width + margin.right)
        .append("thead");

      var timeCell = timeCells
        .append("tr")
        .attr("id", "cells-row")
        .selectAll("th")
        .data(function (d, i) {
          for (let j = minYear; j <= maxYear; j++) {
            yearsArr.push(j);
          }
          return yearsArr;
        })
        .enter()
        .append("th")
        .attr("class", "time-cell")
        .attr("data-cellvalue", function (d, i) {
          return yearsArr[i];
        });

      var yearCell = timeCells
        .append("tr")
        .attr("id", "years-row")
        .selectAll("th")
        .data(yearsArr)
        .enter()
        .append("th")
        .attr("class", "year-cell")
        .text(function (d, i) {
          return yearsArr[i];
        });

      timeCell.on("click", function () {
        let year = parseInt(this.getAttribute("data-cellvalue"));

        rects
          .data(
            data.filter(function (d) {
              return parseInt(d.Description) === year;
            })
          )
          .transition()
          .duration(1000)
          .attr("height", function (d) {
            return height - yscale(parseFloat(d.Data_Value));
          })
          .attr("y", function (d) {
            return yscale(parseFloat(d.Data_Value));
          });
      });

      playIcon.on("click", function () {
        let year = minYear;
        let timer = setInterval(async function () {
          if (year != minYear) {
            document.getElementsByClassName("time-cell")[
              yearsArr.indexOf(year - 1)
            ].style["background-color"] = "#005082";
          }

          if (year <= maxYear) {
            document.getElementsByClassName("time-cell")[
              yearsArr.indexOf(year)
            ].style["background-color"] = "#000839";
          }
          rects
            .data(
              data.filter(function (d) {
                return parseInt(d.Description) === year;
              })
            )
            .transition()
            .duration(1000)
            .attr("height", function (d) {
              return height - yscale(parseFloat(d.Data_Value));
            })
            .attr("y", function (d) {
              return yscale(parseFloat(d.Data_Value));
            });
          year++;
          if (year > maxYear + 1) {
            clearInterval(timer);
          }
        }, 1000);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function createBarchart(seriesName, country, seriesValue) {
  d3.select("svg").remove();
  var url = "";
  if (seriesValue) {
    url =
      "http://localhost:3001/api/" +
      seriesName +
      "?country=" +
      country +
      "&" +
      seriesName +
      "=" +
      seriesValue;
  } else {
    url = "http://localhost:3001/api/" + seriesName + "?country=" + country;
  }
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      data = res.data;
      var maxPercent = d3.max(data, function (d) {
        if (d.Data_Value === "~") {
          d.Data_Value = 0;
        }
        return parseFloat(d.Data_Value);
      });

      var numBars = 8;
      var margin = { left: 100, right: 10, top: 10, bottom: 100 };
      var width = 500 - margin.left - margin.right;
      var height = 450 - margin.top - margin.bottom;
      var barPadding = 20;
      var barWidth = width / numBars - barPadding;
      var color = d3
        .scaleOrdinal()
        .domain(
          data.map(function (d) {
            return d.Description;
          })
        )
        .range(["#88e1f2", "#ff7c7c", "#21243d"]);
      var xscale = d3
        .scaleBand()
        .domain(
          data.map(function (d) {
            return d.Description;
          })
        )
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);
      var yscale = d3.scaleLinear().domain([0, maxPercent]).range([height, 0]);

      var svg = d3
        .select("#chart-area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      var g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      g.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 20)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text(function () {
          if (seriesName === "states") {
            return country + " - total";
          } else {
            return country + " - " + seriesValue;
          }
        });

      g.append("text")
        .attr("class", "y-axis-label")
        .attr("x", -(height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Obesity Percentage (%)");

      var xAxis = d3.axisBottom(xscale);
      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

      var yAxis = d3.axisLeft(yscale).tickFormat(function (d) {
        return d + "%";
      });
      g.append("g").attr("class", "y-axis").call(yAxis);

      var valueBox = d3
        .select("#chart-area")
        .data(data)
        .append("div")
        .style("position", "absolute")
        .style("color", "#ffffff")
        .style("z-index", "10")
        .style("display", "none")
        .style("background", "#212121")
        .style("border", "0px solid #ffffff")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("font-size", "14px")
        .text(function (d) {
          return d.Data_Value;
        });

      var rects = g
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", barWidth)
        .attr("height", function (d) {
          if (d.Data_Value === "~") {
            d.Data_Value = 0;
            return 0;
          } else {
            return height - yscale(parseFloat(d.Data_Value));
          }
        })
        .attr("y", function (d) {
          if (d.Data_Value === "~") {
            d.Data_Value = 0;
            return 0;
          } else {
            return yscale(parseFloat(d.Data_Value));
          }
        })
        .attr("x", function (d, i) {
          // return (barWidth + barPadding) * i;
          return xscale(d.Description);
        })
        .attr("fill", function (d) {
          return color(d.Description);
        })
        .on("mouseover", function (d) {
          valueBox.text(d.Data_Value);
          this.style.opacity = 0.7;
          return valueBox.style("display", "block");
        })
        .on("mousemove", function () {
          return valueBox
            .style("top", d3.event.pageY - 30 + "px")
            .style("left", d3.event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          this.style.opacity = 1;
          return valueBox.style("display", "none");
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function groupedBarchart(seriesName, country, types) {
  d3.select("svg").remove();
  d3.select("div").remove();
  fetch("http://localhost:3001/api/" + seriesName + "?country=" + country)
    .then((data) => {
      return data.json();
    })
    .then(async function (res) {
      var datares = res.data;
      var data = [];
      for (let item of datares) {
        await (async () => {
          for (let type of types) {
            if (item.Stratification1 == type) {
              await data.push(item);
            }
          }
        })();
      }

      var maxPercent = d3.max(data, function (d) {
        return parseFloat(d.Data_Value);
      });
      var color = d3
        .scaleOrdinal()
        .domain(types)
        .range(["#543864", "#ffbd69", "#ff6363"]);

      var numBars = 8 + (types.length - 1) * 2;
      var margin = { left: 100, right: 10, top: 10, bottom: 100 };
      var width = 500 - margin.left - margin.right;
      var height = 450 - margin.top - margin.bottom;
      var barPadding = 20;
      var barWidth = width / numBars - barPadding;

      var bars = d3
        .scaleOrdinal()
        .domain(types)
        .range([0, barWidth, barWidth * 2]);

      var xscale = d3
        .scaleBand()
        .domain(
          data.map(function (d) {
            return d.Description;
          })
        )
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);
      var yscale = d3.scaleLinear().domain([0, maxPercent]).range([height, 0]);

      var svg = d3
        .select("#chart-area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      var g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      g.append("text")
        .attr("class", "x-axis-label")
        .attr("x", (width + margin.right) / 2)
        .attr("y", height + margin.bottom - 20)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text(country + " - " + seriesName);

      g.append("text")
        .attr("class", "y-axis-label")
        .attr("x", -(height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Obesity Percentage (%)");

      var xAxis = d3.axisBottom(xscale);
      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

      var yAxis = d3.axisLeft(yscale).tickFormat(function (d) {
        return d + "%";
      });
      g.append("g").attr("class", "y-axis").call(yAxis);

      var valueBox = d3
        .select("#chart-area")
        .data(
          data.filter(function (d) {
            return parseInt(d.Description);
          })
        )
        .append("div")
        .style("position", "absolute")
        .style("color", "#ffffff")
        .style("z-index", "10")
        .style("display", "none")
        .style("background", "#212121")
        .style("border", "0px solid #ffffff")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("font-size", "14px")
        .text(function (d) {
          return d.Data_Value;
        });

      var rects = g.selectAll("rect").data(
        data.filter(function (d) {
          return parseInt(d.Description);
        })
      );

      var rect = rects
        .enter()
        .append("rect")
        .attr("width", barWidth)
        .attr("height", function (d) {
          if (d.Data_Value === "~") {
            d.Data_Value = 0;
          }
          return height - yscale(parseFloat(d.Data_Value));
        })
        .attr("y", function (d) {
          return yscale(parseFloat(d.Data_Value));
        })
        .attr("x", function (d, i) {
          return xscale(d.Description) + bars(d.Stratification1);
        })
        .attr("fill", function (d) {
          return color(d.Stratification1);
        })
        .attr("class", function (d) {
          return "type" + types.indexOf(d.Stratification1);
        })
        .on("mouseover", function (d) {
          valueBox.text(d.Data_Value);
          this.style.opacity = 0.7;
          return valueBox.style("display", "block");
        })
        .on("mousemove", function () {
          return valueBox
            .style("top", d3.event.pageY - 30 + "px")
            .style("left", d3.event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          this.style.opacity = 1;
          return valueBox.style("display", "none");
        });

      var legend = d3
        .select("#chart-area")
        .append("div")
        .style("margin", "0 auto")
        .style("padding-left", margin.left + "px")
        .append("table")
        .attr("id", "legend")
        .attr("width", width / 2)
        .append("thead");

      legend
        .append("tr")
        .selectAll("th")
        .data(types)
        .enter()
        .append("th")
        .attr("id", function (d, i) {
          return types[i];
        })
        .style("width", function () {
          return 100 / types.length + "%";
        })
        .style("padding", "10px")
        .style("background-color", function (d, i) {
          return color(types[i]);
        })
        .style("cursor", "pointer")
        .on("mouseover", function (d, i) {
          this.style.opacity = 0.7;
          for (let j = 0; j < types.length; j++) {
            if (types[j] != types[i]) {
              d3.selectAll(".type" + j)
                .style("opacity", "0.2")
                .style("fill", "grey");
            }
          }
        })
        .on("mouseout", function (d, i) {
          this.style.opacity = 1;
          for (let j = 0; j < types.length; j++) {
            if (types[j] != types[i]) {
              d3.selectAll(".type" + j)
                .style("opacity", "1")
                .style("fill", color(types[j]));
            }
          }
        });

      legend
        .append("tr")
        .selectAll("th")
        .data(types)
        .enter()
        .append("th")
        .attr("id", function (d, i) {
          return types[i];
        })
        .style("padding", "5px")
        .style("text-align", "center")
        .style("font-size", "14px")
        .text(function (d, i) {
          return types[i];
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function groupedBarchartByCountry(seriesName, seriesValue, types) {
  fetch(
    "http://localhost:3001/api/" +
      seriesName +
      "?" +
      seriesName +
      "=" +
      seriesValue
  )
    .then((data) => {
      return data.json();
    })
    .then(async function (res) {
      var datares = res.data;
      var data = [];
      for (let item of datares) {
        await (async () => {
          for (let type of types) {
            if (item.LocationDesc == type) {
              await data.push(item);
            }
          }
        })();
      }
      console.log(data);
      var maxPercent = d3.max(data, function (d) {
        return parseFloat(d.Data_Value);
      });
      var color = d3
        .scaleOrdinal()
        .domain(types)
        .range(["#f9c6ba", "#dd6892", "#3c6f9c", "#512c96"]);

      var numBars = 8 + (types.length - 1) * 2;
      var margin = { left: 100, right: 10, top: 10, bottom: 100 };
      var width = 500 - margin.left - margin.right;
      var height = 450 - margin.top - margin.bottom;
      var barPadding = 20;
      var barWidth = width / numBars - barPadding;

      var bars = d3
        .scaleOrdinal()
        .domain(types)
        .range([0, barWidth, barWidth * 2, barWidth * 3]);

      var xscale = d3
        .scaleBand()
        .domain(
          data.map(function (d) {
            return d.Description;
          })
        )
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);
      var yscale = d3.scaleLinear().domain([0, maxPercent]).range([height, 0]);

      var svg = d3
        .select("#chart-area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      var g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      g.append("text")
        .attr("class", "x-axis-label")
        .attr("x", (width + margin.right) / 2)
        .attr("y", height + margin.bottom - 20)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text(seriesValue + " - " + seriesName);

      g.append("text")
        .attr("class", "y-axis-label")
        .attr("x", -(height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Obesity Percentage (%)");

      var xAxis = d3.axisBottom(xscale);
      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

      var yAxis = d3.axisLeft(yscale).tickFormat(function (d) {
        return d + "%";
      });
      g.append("g").attr("class", "y-axis").call(yAxis);

      var valueBox = d3
        .select("#chart-area")
        .data(
          data.filter(function (d) {
            return parseInt(d.Description);
          })
        )
        .append("div")
        .style("position", "absolute")
        .style("color", "#ffffff")
        .style("z-index", "10")
        .style("display", "none")
        .style("background", "#212121")
        .style("border", "0px solid #ffffff")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("font-size", "14px")
        .text(function (d) {
          return d.Data_Value;
        });

      var rects = g.selectAll("rect").data(
        data.filter(function (d) {
          return parseInt(d.Description);
        })
      );

      var rect = rects
        .enter()
        .append("rect")
        .attr("width", barWidth)
        .attr("height", function (d) {
          if (d.Data_Value === "~") {
            d.Data_Value = 0;
          }
          return height - yscale(parseFloat(d.Data_Value));
        })
        .attr("y", function (d) {
          return yscale(parseFloat(d.Data_Value));
        })
        .attr("x", function (d, i) {
          return xscale(d.Description) + bars(d.LocationDesc);
        })
        .attr("fill", function (d) {
          return color(d.LocationDesc);
        })
        .attr("class", function (d) {
          return "type" + types.indexOf(d.LocationDesc);
        })
        .on("mouseover", function (d) {
          valueBox.text(d.Data_Value);
          this.style.opacity = 0.7;
          return valueBox.style("display", "block");
        })
        .on("mousemove", function () {
          return valueBox
            .style("top", d3.event.pageY - 30 + "px")
            .style("left", d3.event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          this.style.opacity = 1;
          return valueBox.style("display", "none");
        });

      var legend = d3
        .select("#chart-area")
        .append("div")
        .style("margin", "0 auto")
        .style("padding-left", margin.left + "px")
        .append("table")
        .attr("id", "legend")
        .attr("width", width / 2)
        .append("thead");

      legend
        .append("tr")
        .selectAll("th")
        .data(types)
        .enter()
        .append("th")
        .attr("id", function (d, i) {
          return types[i];
        })
        .style("width", function () {
          return 100 / types.length + "%";
        })
        .style("padding", "10px")
        .style("background-color", function (d, i) {
          return color(types[i]);
        })
        .style("cursor", "pointer")
        .on("mouseover", function (d, i) {
          this.style.opacity = 0.7;
          for (let j = 0; j < types.length; j++) {
            if (types[j] != types[i]) {
              d3.selectAll(".type" + j)
                .style("opacity", "0.2")
                .style("fill", "grey");
            }
          }
        })
        .on("mouseout", function (d, i) {
          this.style.opacity = 1;
          for (let j = 0; j < types.length; j++) {
            if (types[j] != types[i]) {
              d3.selectAll(".type" + j)
                .style("opacity", "1")
                .style("fill", color(types[j]));
            }
          }
        });

      legend
        .append("tr")
        .selectAll("th")
        .data(types)
        .enter()
        .append("th")
        .attr("id", function (d, i) {
          return types[i];
        })
        .style("padding", "5px")
        .style("text-align", "center")
        .style("font-size", "14px")
        .text(function (d, i) {
          return types[i];
        });
    })
    .catch((error) => {
      console.log(error);
    });
}
