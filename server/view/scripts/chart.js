var minYear = d3.min(birthData, function (d) {
  return parseInt(d.Description);
});
var maxYear = d3.max(birthData, function (d) {
  return parseInt(d.Description);
});
var width = 600;
var height = 600;
var barPadding = 20;
var numBars = 6;
var barWidth = width / numBars - barPadding;
var maxBirths = d3.max(birthData, function (d) {
  return parseFloat(d.Data_Value);
});
var yscale = d3.scaleLinear().domain([0, maxBirths]).range([height, 0]);

d3.select("input")
  .property("min", minYear)
  .property("max", maxYear)
  .property("value", minYear);

d3.select("section")
  .selectAll("text")
  .data(
    birthData.filter(function (d) {
      return (
        parseInt(d.Description) === minYear && d.Stratification1 === "18 - 24"
      );
    })
  )
  .enter()
  .append("text")
  .text(function (d) {
    return parseInt(d.Description);
  });

d3.select("svg")
  .attr("width", width)
  .attr("height", height)
  .selectAll("rect")
  .data(
    birthData.filter(function (d) {
      return parseInt(d.Description) === minYear;
    })
  )
  .enter()
  .append("rect")
  .attr("width", barWidth)
  .attr("height", function (d) {
    return height - yscale(parseFloat(d.Data_Value));
  })
  .attr("y", function (d) {
    return yscale(parseFloat(d.Data_Value));
  })
  .attr("x", function (d, i) {
    return (barWidth + barPadding) * i;
  })
  .attr("fill", "purple");

d3.select("svg")
  .attr("width", width)
  .attr("height", height)
  .selectAll("text")
  .data(
    birthData.filter(function (d) {
      return parseInt(d.Description) === minYear;
    })
  )
  .enter()
  .append("text")
  .text(function (d) {
    return parseFloat(d.Data_Value);
  })
  .attr("text-anchor", "middle")
  .attr("x", function (d, i) {
    return i * (width / 6) + (width / 6 - barPadding) / 2;
  })
  .attr("y", function (d) {
    return height - parseFloat(d.Data_Value) * 4;
  })
  .attr("font-size", "20px")
  .attr("fill", "white");

d3.select("input").on("input", function () {
  var year = +d3.event.target.value;

  d3.select("section")
    .select("text")
    .data(
      birthData.filter(function (d) {
        return (
          parseInt(d.Description) === year && d.Stratification1 === "18 - 24"
        );
      })
    )
    .text(function (d) {
      return parseInt(d.Description);
    });

  d3.selectAll("rect")
    .data(
      birthData.filter(function (d) {
        return parseInt(d.Description) === year;
      })
    )
    .attr("height", function (d) {
      return height - yscale(parseFloat(d.Data_Value));
    })
    .attr("y", function (d) {
      return yscale(parseFloat(d.Data_Value));
    });

  d3.select("svg")
    .selectAll("text")
    .data(
      birthData.filter(function (d) {
        return parseInt(d.Description) === year;
      })
    )
    .text(function (d) {
      return parseFloat(d.Data_Value);
    });
});
