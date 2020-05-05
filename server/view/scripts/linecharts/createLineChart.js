function sortByProperty(property) {
  return function (a, b) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;

    return 0;
  };
}
async function createLineChart(seriesName, country, seriesValue) {
  url =
    "http://localhost:3001/api/" +
    seriesName +
    "?country=" +
    country +
    "&" +
    seriesName +
    "=" +
    seriesValue;
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then(async function (res) {
      data = res.data;
      data.sort(sortByProperty("Description"));
      var maxPercent = d3.max(data, function (d) {
        return parseFloat(d.Data_Value);
      });
      maxPercent += 10;
      var margin = { left: 100, right: 100, top: 10, bottom: 180 };
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

      var bisectLeft = d3.bisector(function (d) {
        return d.Description;
      }).left;

      var focus = svg
        .append("g")
        .append("circle")
        .style("fill", "none")
        .attr("stroke", "steelblue")
        .attr("r", 5)
        .style("opacity", 0)
        .style("fill", function (d) {
          return "steelblue";
        });

      var focusText = d3
        .select("#chart-area")
        .data(data)
        .append("div")
        .style("position", "absolute")
        .style("color", "#ffffff")
        .style("z-index", "10")
        .style("display", "none")
        .style("background", "#125682")
        .style("border", "0px solid #ffffff")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("font-size", "14px")
        .text(function (d) {
          return d.Data_Value;
        });

      svg
        .append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 100)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text(function () {
          return country + "-" + seriesName + " " + seriesValue;
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

      /*----create line chart---- */

      var linepath = svg
        .append("path")
        .datum(data)
        .style("pointer-events", "all")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout)
        .attr("id", "pathID")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(parseFloat(d.Description));
            })
            .y(function (d) {
              if (d.Data_Value === "~") {
                d.Data_Value = 0;
              }
              return y(parseFloat(d.Data_Value));
            })
        );
      var pathbox = linepath.node().getBBox();

      function mouseover() {
        focus.style("opacity", 1);
        focusText.style("opacity", 1);
        focusText.style("display", "block");
      }

      function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]);
        var i = bisectLeft(data, x0, 1);
        console.log(d3.mouse(this)[0]);
        if (d3.mouse(this)[0] >= 270) selectedData = data[7];
        else if (i > 0) {
          (d0 = data[i - 1]), (d1 = data[i]);
          selectedData = x0 - d0.Description > d1.Description - x0 ? d1 : d0;
        } else {
          selectedData = data[0];
        }
        focus
          .attr("cx", x(selectedData.Description))
          .attr("cy", y(selectedData.Data_Value));
        focusText
          .text(
            selectedData.Description + " - " + selectedData.Data_Value + "%"
          )
          .style("top", d3.event.pageY - 30 + "px")
          .style("left", d3.event.pageX + 10 + "px");
      }
      function mouseout() {
        focus.style("opacity", 0);
        focusText.style("opacity", 0);
        focusText.style("display", "none");
      }

      downloads(d3.select("svg"), data);
    })
    .catch((error) => {
      console.log(error);
    });
}
