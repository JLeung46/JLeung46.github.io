var margin3 = {top: 40, right: 40, bottom: 30, left: 40},
    width3 = 460 - margin3.left - margin3.right,
    height3 = 300 - margin3.top - margin3.bottom;


var x = d3.scale.ordinal()
    .rangeRoundBands([0, width3], .1);

var y = d3.scale.linear()
    .range([height3, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Percentage:</strong> <span style='color:red'>" + d.Percent + "</span>";
  })

var chart3 = d3.select("#chart2area").append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
  .append("g")
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

chart3.call(tip);

d3.csv("data/ad_click_rates.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.User_Type; }));
  y.domain([0, d3.max(data, function(d) { return d.Percent; })]);

  chart3.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height3 + ")")
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
      .attr("height", function(d) { return height3 - y(d.Percent); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

});