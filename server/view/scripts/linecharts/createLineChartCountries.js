createLineChartCountries("age", "18 - 24", [
  "Alaska",
  "California",
  "Virginia",
  "Texas",
]);
function sortByProperty(property) {
  return function (a, b) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;

    return 0;
  };
}
async function createLineChartCountries(seriesName, seriesValue, types) {
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
      data.sort(sortByProperty("Description"));
      console.log(data);

      var maxPercent = d3.max(data, function (d) {
        return parseFloat(d.Data_Value);
      });
      maxPercent += 10;
      var margin = { left: 100, right: 100, top: 10, bottom: 100 };
      var width = 500 - margin.left - margin.right;
      var height = 350 - margin.top - margin.bottom;
      var svg = d3
        .select("#chart-area")
        .append("svg")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scaleTime().domain([2011, 2018]).range([0, width]);
      let xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));
      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", "10")
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
        .attr("y", height + margin.bottom - 30)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text(function () {
          return seriesName + " " + seriesValue;
        });

      svg
        .append("text")
        .attr("class", "y-axis-label")
        .attr("x", -(height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Obesity Percentage (%)");

      var sumstat = d3
        .nest() // nest function allows to group the calculation per level of a factor
        .key(function (d) {
          return d.LocationDesc;
        })
        .entries(data);

      var color = d3
        .scaleOrdinal()
        .domain(types)
        .range([
          "#e41a1c",
          "#377eb8",
          "#4daf4a",
          "#984ea3",
          "#ff7f00",
          "#ffff33",
          "#a65628",
          "#f781bf",
          "#999999",
        ]);
      console.log(sumstat);
      svg
        .selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", function (d) {
          return color(d.key);
        })
        .attr("stroke-width", 1.5)
        .attr("d", function (d) {
          return d3
            .line()
            .x(function (d) {
              return x(parseFloat(d.Description));
            })
            .y(function (d) {
              if (d.Data_Value === "~") {
                d.Data_Value = 0;
              }
              return y(parseFloat(d.Data_Value));
            })(d.values);
        });

      console.log(types);
      svg
        .selectAll("mydots")
        .data(sumstat)
        .enter()
        .append("circle")
        .attr("cx", width + 15)
        .attr("cy", function (d, i) {
          return i * 20;
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 3.5)
        .style("fill", function (d) {
          return color(d.key);
        });
      svg
        .selectAll("mylabels")
        .data(sumstat)
        .enter()
        .append("text")
        .attr("x", width + 20)
        .attr("y", function (d, i) {
          return i * 20;
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function (d) {
          return color(d.key);
        })
        .text(function (d) {
          return d.key;
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");

      var legend = d3
        .select("#chart-area")
        .append("div")
        .style("margin", "0 auto")
        .append("table")
        .attr("id", "legend")
        .append("thead");
      legend
        .append("tr")
        .selectAll("th")
        .data(sumstat)
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
          return color(d.key);
        });
      legend
        .append("tr")
        .selectAll("th")
        .data(sumstat)
        .enter()
        .append("th")
        .attr("id", function (d, i) {
          return types[i];
        })
        .style("padding", "5px")
        .style("text-align", "center")
        .style("font-size", "14px")
        .text(function (d, i) {
          return sumstat[i].key;
        });
      downloads(svg, data);
    })
    .catch((error) => {
      console.log(error);
    });
}
