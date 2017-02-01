(function(){

var margin = {top: 40, right: 40, bottom: 70, left: 90},
    width = 480 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var axisLabelX = -60;
var axisLabelY = height / 2;


var chart = d3.select("#chart4area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("../data/top_queries_count.csv", type, function(error, data) {
  console.log(data)
  x.domain(data.map(function(d) { return d.Item; }));
  y.domain([0, d3.max(data, function(d) { return d.Count; })]);

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .attr("y", 2)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start")
      .style("font-weight","bold");


  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em");

  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Item); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Count); })
      .attr("height", function(d) { return height - y(d.Count); });

  chart.append('g')
    .attr('transform', 'translate(' + axisLabelX + ', ' + axisLabelY + ')')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Count');
});

function type(d) {
  d.Count = +d.Count;
  return d;
}

}());
