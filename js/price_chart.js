 (function(){

var labelArea = 160;

var chart,
        width = 280,
        bar_height = 20,
        height = bar_height * 30;
        
var rightOffset = width + labelArea - 20;

var xFrom = d3.scale.linear()
        .range([0, width]);
var xTo = d3.scale.linear()
        .range([0, width]);
var y = d3.scale.ordinal()
        .rangeBands([20, height]);

function render(data) {
    var chart = d3.select("#sidechartarea")
            .append('svg')
            .attr('class', 'chart')
            .attr('width', labelArea + width + width)
            .attr('height', height+10);

    xFrom.domain(d3.extent(data, function (d) {
        return d.count;
    }));
    xTo.domain(d3.extent(data, function (d) {
        return d.clicks;
    }));

    y.domain(data.map(function (d) {
        return d.price_bin;
    }));

    var yPosByIndex = function (d) {
        return y(d.price_bin);
    };
    chart.selectAll("rect.left")
            .data(data)
            .enter().append("rect")
            .attr("x", function (d) {
                return width - xFrom(d.count);
            })
            .attr("y", yPosByIndex)
            .attr("class", "left")
            .attr("width", function (d) {
                return xFrom(d.count);
            })
            .attr("height", y.rangeBand());
    chart.selectAll("text.leftscore")
            .data(data)
            .enter().append("text")
            .attr("x", function (d) {
                return width - xFrom(d.count)-25;
            })
            .attr("y", function (d) {
                return y(d.price_bin) + y.rangeBand() / 2;
            })
            .attr("dx", "20")
            .attr("dy", ".36em")
            .attr("text-anchor", "end")
            .attr('class', 'leftscore')
            .text(function(d){return d.count;});

    chart.selectAll("text.name")
            .data(data)
            .enter().append("text")
            .attr("x", (labelArea / 2) + width)
            .attr("y", function (d) {
                return y(d.price_bin) + y.rangeBand() / 2;
            })
            .attr("dy", ".20em")
            .attr("text-anchor", "middle")
            .attr('class', 'name')
            .text(function(d){return d.price_bin;});

    chart.selectAll("rect.right")
            .data(data)
            .enter().append("rect")
            .attr("x", rightOffset)
            .attr("y", yPosByIndex)
            .attr("class", "right")
            .attr("width", function (d) {
                return xTo(d.clicks);
            })
            .attr("height", y.rangeBand());
    chart.selectAll("text.score")
            .data(data)
            .enter().append("text")
            .attr("x", function (d) {
                return xTo(d.clicks) + rightOffset+25;
            })
            .attr("y", function (d) {
                return y(d.price_bin) + y.rangeBand() / 2;
            })
            .attr("dx", -5)
            .attr("dy", ".36em")
            .attr("text-anchor", "end")
            .attr('class', 'score')
            .text(function(d){return d.clicks;});

    chart.append("text").attr("x",width/3).attr("y", 10).attr("class","title").text("Impressions");
    chart.append("text").attr("x",width/3+rightOffset).attr("y", 10).attr("class","title").text("Clicks");
    chart.append("text").attr("x",width+labelArea/3).attr("y", 10).attr("class","title").text("USD ($)");


}

function type(d) {
  d.count = +d.count;
  d.clicks = +d.clicks
  return d;
}

d3.csv("../data/price_bin_data.csv", type, render);

}());
