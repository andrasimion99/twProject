fetch("http://localhost:3001/api/age?country=Alaska&age=18 - 24")
  .then((data) => {
    return data.json();
  })
  .then((res) => {
    data = res.data;
    var maxPercent = d3.max(data, function (d) {
      return parseFloat(d.Data_Value);
    });

    var numBars = 8;
    var margin = { left: 100, right: 10, top: 10, bottom: 100 };
    var width = 500 - margin.left - margin.right;
    var height = 450 - margin.top - margin.bottom;
    var barPadding = 20;
    var barWidth = width / numBars - barPadding;

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
      .text("Time(years)");

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
        }
        return height - yscale(parseFloat(d.Data_Value));
      })
      .attr("y", function (d) {
        return yscale(parseFloat(d.Data_Value));
      })
      .attr("x", function (d, i) {
        // return (barWidth + barPadding) * i;
        return xscale(d.Description);
      })
      .attr("fill", "grey")
      .on("mouseover", function (d) {
        valueBox.text(d.Data_Value);
        this.style.opacity = 0.5;
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
