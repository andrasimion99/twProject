groupedBarchart("age", "Alaska", ["18 - 24", "25 - 34", "45 - 54"]);

async function groupedBarchart(seriesName, country, types) {
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
