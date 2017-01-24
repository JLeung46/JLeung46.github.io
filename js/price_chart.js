(function(){

var margin6 = {top: 80, right: 80, bottom: 80, left: 80},
    width6 = 600 - margin6.left - margin6.right,
    height6 = 400 - margin6.top - margin6.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width6], .1);

var y00 = d3.scale.linear().domain([height6, 1100]).range([height6, 0]);

var y11 = d3.scale.linear().range([height6, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
// create left yAxis
var yAxisLeft2 = d3.svg.axis().scale(y00).ticks(6).orient("left");

// create right yAxis
var yAxisRight2 = d3.svg.axis().scale(y11).ticks(6).orient("right");

var pricechart = d3.select("#chart6area").append("svg");
  console.log("svg",pricechart)
    pricechart
    .attr("width", width6 + margin6.left + margin6.right)
    .attr("height", height6 + margin6.top + margin6.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin6.left + "," + margin6.top + ")");

d3.csv("../data/price_bin_data.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.price_bin; }));
  y00.domain([0, d3.max(data, function(d) { return d.count; })]);
  y11.domain([0, d3.max(data, function(d) { return d.clicks; })]);
  
  pricechart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height6 + ")")
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
    .call(yAxisLeft2)
  .append("text")
    .attr("y", 6)
    .attr("dy", "-2em")
    .style("text-anchor", "end")
    .style("text-anchor", "end")
    .text("Impressions");
  
  pricechart.append("g")
    .attr("class", "y axis AxisRight2")
    .attr("transform", "translate(" + (width6) + ",0)")
    .call(yAxisRight2)
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
      .attr("y", function(d) { return y00(d.count); })
    .attr("height", function(d,i,j) { return height6 - y00(d.count); }); 

  bars2.append("rect")
      .attr("class", "bar3")
      .attr("x", function(d) { return x(d.price_bin) + x.rangeBand()/2; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y11(d.clicks); })
    .attr("height", function(d,i,j) { return height6 - y11(d.clicks); }); 


});
function type(d) {
  d.count = +d.count;
  d.clicks = +d.clicks
  return d;
}

}());
