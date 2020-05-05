function sortByProperty(property) {
  return function (a, b) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;

    return 0;
  };
}
async function createLineChartAll(seriesName, country) {
  d3.select("svg").remove();
  d3.select("table").remove();
  fetch("http://localhost:3001/api/" + seriesName + "?country=" + country)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      data = res.data;
      data.sort(sortByProperty("Stratification1"));
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
      var yearsArr = [];
      var width = 500 - margin.left - margin.right;
      var height = 450 - margin.top - margin.bottom;

      var svg = d3
        .select("#chart-area")
        .append("svg")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = d3
        .scalePoint()
        .domain(
          data.map(function (d) {
            return d.Stratification1;
          })
        )
        .range([0, width]);

      x.invert = function (x) {
        var domain = this.domain();
        var range = this.range();
        var scale = d3.scaleQuantize().domain(range).range(domain);
        return scale(x);
      };

      let xAxis = d3.axisBottom(x);
      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

      var y = d3.scaleLinear().domain([0, maxPercent]).range([height, 0]);
      let yAxis = d3.axisLeft(y).tickFormat(function (d) {
        return d + "%";
      });
      svg.append("g").call(yAxis);
      svg
        .append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 40)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text(country + "-" + seriesName);

      svg
        .append("text")
        .attr("class", "y-axis-label")
        .attr("x", -(height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Obesity Percentage (%)");

      /* create line */

      var linepath = svg
        .append("path")
        .datum(
          data.filter(function (d) {
            return parseInt(d.Description) === minYear;
          })
        )
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.Stratification1);
            })
            .y(function (d) {
              if (d.Data_Value === "~") {
                d.Data_Value = 0;
              }
              return y(d.Data_Value);
            })
        );

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

        linepath
          .datum(
            data
              .filter(function (d) {
                return parseInt(d.Description) === year;
              })
              .sort(sortByProperty("Stratification1"))
          )
          .transition()
          .duration(1000)
          .attr(
            "d",
            d3
              .line()
              .x(function (d) {
                return x(d.Stratification1);
              })
              .y(function (d) {
                if (d.Data_Value === "~") {
                  d.Data_Value = 0;
                }
                return y(d.Data_Value);
              })
          );

        xText.text(country + " - " + seriesName + "( " + year + " )");
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
          linepath
            .datum(
              data
                .filter(function (d) {
                  return parseInt(d.Description) === year;
                })
                .sort(sortByProperty("Stratification1"))
            )
            .transition()
            .duration(1000)
            .attr(
              "d",
              d3
                .line()
                .x(function (d) {
                  return x(d.Stratification1);
                })
                .y(function (d) {
                  if (d.Data_Value === "~") {
                    d.Data_Value = 0;
                  }
                  return y(d.Data_Value);
                })
            );
          year++;
          if (year > maxYear + 1) {
            clearInterval(timer);
          }
          if (year <= maxYear + 1) {
            xText.text(country + " - " + seriesName + "( " + (year - 1) + " )");
          }
        }, 1000);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
