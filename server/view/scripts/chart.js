fetch("http://localhost:3001/api/ethnicity?country=Alaska")
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
    var numBars = d3.set(data, function (d) {
      return d.Stratification1;
    }).size();
    console.log(numBars);

    var margin = { left: 100, right: 10, top: 10, bottom: 180 };
    var yearsArr = [];
    var width = 600 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;
    var barPadding = 20;
    if(numBars <= 4){
      barPadding = 40;
    }
    var barWidth = width / numBars - barPadding;

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
      .text("Age Category(years)");

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
          d.Data_Value = 1;
        }
        console.log(height - yscale(parseFloat(d.Data_Value)));
        return height - yscale(parseFloat(d.Data_Value));
      })
      .attr("y", function (d) {
        return yscale(parseFloat(d.Data_Value));
      })
      .attr("x", function (d, i) {
        // return (barWidth + barPadding) * i;
        return xscale(d.Stratification1);
      })
      .attr("fill", "grey");

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
          ].style["background-color"] = "grey";
        }

        if (year <= maxYear) {
          document.getElementsByClassName("time-cell")[
            yearsArr.indexOf(year)
          ].style["background-color"] = "rgb(90, 87, 87)";
        }
        rects
          .data(
            data.filter(function (d) {
              return parseInt(d.Description) === year;
            })
          )
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
