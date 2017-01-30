(function(){

      var margin = { left: 165, top: 0, right: 0, bottom: 90 };
      var width  = 960  - margin.left - margin.right;
      var height = 500 - margin.top  - margin.bottom;


      var barPadding = 0.2;
      var barPaddingOuter = 0.1;

      var xAxisLabelText = "Population";
      var xAxisLabelOffset = 75;

      var svg = d3.select("body").append("svg")
        .attr("width",  width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var xAxisG = g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
      var xAxisLabel = xAxisG.append("text")
        .style("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", xAxisLabelOffset)
        .attr("class", "label")
        .text(xAxisLabelText);
      var yAxisG = g.append("g")
        .attr("class", "y axis");
      var xScale = d3.scale.linear().range([0, width]);
      var yScale = d3.scale.ordinal().rangeRoundBands([0, height], barPadding, barPaddingOuter);
      var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
        .ticks(5)
        .tickFormat(d3.format("s"))
        .outerTickSize(0);
      var yAxis = d3.svg.axis().scale(yScale).orient("left")
        .outerTickSize(0);
      function render(data){
        xScale.domain([0, d3.max(data, function (d){ return d[d.Count]; })]);
        yScale.domain(       data.map( function (d){ return d[d.Item]; }));
        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
        var bars = g.selectAll("rect").data(data);
        bars.enter().append("rect")
          .attr("height", yScale.rangeBand());
        bars
          .attr("x", 0)
          .attr("y",     function (d){ return yScale(d[d.Item]); })
          .attr("width", function (d){ return xScale(d[d.Count]); });
        bars.exit().remove();
      }
      function type(d){
        d.Count = +d.Count;
        return d;
      }
      d3.csv("../data/top_queries_count.csv", type, render);


}());



