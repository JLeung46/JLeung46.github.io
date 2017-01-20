var margin4 = {top: 40, right: 40, bottom: 30, left: 40},
    width4 = 460 - margin4.left - margin4.right,
    height4 = 300 - margin4.top - margin4.bottom;


var x4 = d3.scale.ordinal()
    .rangeRoundBands([0, width4], .1);

var y4 = d3.scale.linear()
    .range([height4, 0]);

var xAxis4 = d3.svg.axis()
    .scale(x4)
    .orient("bottom");

var yAxis4 = d3.svg.axis()
    .scale(y4)
    .orient("left");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Percentage:</strong> <span style='color:red'>" + d.Count + "</span>";
  })

var chart4 = d3.select("#chart4area").append("svg")
    .attr("width", width4 + margin4.left + margin4.right)
    .attr("height", height4 + margin4.top + margin4.bottom)
  .append("g")
    .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

chart4.call(tip);

d3.csv("data/top_queries_count.csv", type, function(error, data) {
  x4.domain(data.map(function(d) { return d.Item; }));
  y4.domain([0, d3.max(data, function(d) { return d.Count; })]);

  chart4.append("g")
      .attr("class", "x axis4")
      .attr("transform", "translate(0," + height4 + ")")
      .call(xAxis4);

  chart4.append("g")
      .attr("class", "y axis4")
      .call(yAxis4)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")

  chart4.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar4")
      .attr("x", function(d) { return x4(d.Item); })
      .attr("width", x4.rangeBand())
      .attr("y", function(d) { return y4(d.Count); })
      .attr("height", function(d) { return height4 - y4(d.Count); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

});

function type(d) {
  d.Count = +d.Count;
  return d;
}