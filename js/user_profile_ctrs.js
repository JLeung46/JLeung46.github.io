(function(){

var margin = {top: 40, right: 40, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


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


var chart3 = d3.select("#chart2area").append("svg")
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
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")

  chart3.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.User_Type); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Percent); })
      .attr("height", function(d) { return height - y(d.Percent); })

});

function type(d) {
  d.Percent = +d.Percent;
  return d;
}

}());
