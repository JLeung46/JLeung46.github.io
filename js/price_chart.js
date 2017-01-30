(function(){

var margin = {top: 80, right: 80, bottom: 95, left: 80},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .2);

var y1 = d3.scale.linear().domain([height, 1100]).range([height, 0]);

var y2 = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y1).ticks(6).orient("left");

// create right yAxis
var yAxisRight = d3.svg.axis().scale(y2).ticks(6).orient("right");

var pricechart = d3.select("#chart6area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("../data/price_bin_data.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.price_bin; }));
  y1.domain([0, d3.max(data, function(d) { return d.count; })]);
  y2.domain([0, d3.max(data, function(d) { return d.clicks; })]);
  
  pricechart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");


  pricechart.append("g")
    .attr("class", "y axis axisLeft")
    .attr("transform", "translate(0,0)")
    .call(yAxisLeft)
  .append("text")
    .attr("y", 6)
    .attr("dy", "-2em")
    .style("text-anchor", "end")
    .style("text-anchor", "end")
    .text("Impressions");
  
  pricechart.append("g")
    .attr("class", "y axis AxisRight2")
    .attr("transform", "translate(" + (width) + ",0)")
    .call(yAxisRight)
  .append("text")
    .attr("y", 6)
    .attr("dy", "-2em")
    .attr("dx", "2em")
    .style("text-anchor", "end")
    .text("Clicks");

  bars2 = pricechart.selectAll(".bar").data(data).enter();

  bars2.append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.price_bin); })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y1(d.count); })
    .attr("height", function(d,i,j) { return height - y1(d.count); }); 

  bars2.append("rect")
      .attr("class", "bar3")
      .attr("x", function(d) { return x(d.price_bin) + x.rangeBand()/2; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y2(d.clicks); })
    .attr("height", function(d,i,j) { return height - y2(d.clicks); }); 


});
function type(d) {
  d.count = +d.count;
  d.clicks = +d.clicks
  return d;
}

}());
