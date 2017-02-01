(function(){

var margin = {top: 90, right: 40, bottom: 20, left: 90},
    width = 560 - margin.left - margin.right,
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

// Define these so we have room for the y-axis label.
// The axisLabelX negative value ensure we dont overlap the y-axis tick labels.
var axisLabelX = -50;
var axisLabelY = height / 2;


var chart3 = d3.select("#chart3area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("data/ad_click_rates.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.User_Type; }));
  y.domain([0, d3.max(data, function(d) { return d.Percent; })]);

  chart3.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart3.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  chart3.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.User_Type); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Percent); })
      .attr("height", function(d) { return height - y(d.Percent); });

  // Add y-axis label
  chart3.append('g')
    .attr('transform', 'translate(' + axisLabelX + ', ' + axisLabelY + ')')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('CTR (%)');

// Add Title
  chart3.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("CTR for Different User Types");


});

function type(d) {
  d.Percent = +d.Percent;
  return d;
}

}());
