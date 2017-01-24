(function(){

var margin = {top: 80, right: 80, bottom: 80, left: 80},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
var y00 = d3.scale.linear().domain([height, 1100]).range([height, 0]);
var y11 = d3.scale.linear().range([height, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y00).ticks(4).orient("left");

// create right yAxis
var yAxisRight = d3.svg.axis().scale(y11).ticks(6).orient("right");

var CTRchart = d3.select("#chart5area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
d3.csv("../data/top_bike_ads_data.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.AdID; }));
  y00.domain([0, d3.max(data, function(d) { return d.Impressions; })]);
  y11.domain([0, d3.max(data, function(d) { return d.CTR; })]);
  
  CTRchart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  CTRchart.append("g")
	  .attr("class", "y axis axisLeft")
	  .attr("transform", "translate(0,0)")
	  .call(yAxisLeft)
	.append("text")
	  .attr("y", 6)
	  .attr("dy", "-2em")
	  .style("text-anchor", "end")
	  .style("text-anchor", "end")
	  .text("Impressions");
	
  CTRchart.append("g")
	  .attr("class", "y axis axisRight")
	  .attr("transform", "translate(" + (width) + ",0)")
	  .call(yAxisRight)
	.append("text")
	  .attr("y", 6)
	  .attr("dy", "-2em")
	  .attr("dx", "2em")
	  .style("text-anchor", "end")
	  .text("CTR (%)");

  bars = CTRchart.selectAll(".bar").data(data).enter();
  bars.append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.AdID); })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y00(d.Impressions); })
	  .attr("height", function(d,i,j) { return height - y00(d.Impressions); }); 
  bars.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.AdID) + x.rangeBand()/2; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y11(d.CTR); })
	  .attr("height", function(d,i,j) { return height - y11(d.CTR); }); 
});
function type(d) {
  d.Impressions = +d.Impressions;
  return d;
}

}());
