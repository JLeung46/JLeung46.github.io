var width2 = 760,
    height2 = 300,
    radius = Math.min(width2, height2) / 2;

var color = d3.scale.ordinal()
    .range(["#dc3912", "#109618"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.Percent; });

var chart2 = d3.select("#chart2area").append("svg")
    .attr("width", width2)
    .attr("height", height2)
  .append("g")
    .attr("transform", "translate(" + width2 / 3.5 + "," + height2 / 2 + ")");

d3.csv("data/search_filter_percent.csv", type, function(error, data) {
  if (error) throw error;

  var g = chart2.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.User_Type); })
      .attr("data-legend", function(d){return d.data.User_Type})
      .style("fill", function (d) { return color(d.data.User_Type); });


  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.Percent + "%"; })
      .style("font-size", "20px")


  legend = chart2.append("g")
      .attr("class", "legend")
      .attr("transform", "translate(70,30)")
      .style("font-size", "18px")
      .call(d3.legend)
});


function type(d) {
  d.Percent = +d.Percent;
  return d;
}