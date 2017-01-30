(function(){
var margin = {top:70, right: 0, bottom: 100, left:60},
	width = 900 - margin.left - margin.right,
	height = 430 - margin.top - margin.bottom,
	colSize = Math.floor(width / 24), // Takes width of svg and sets size of each column. Need to floor so doesn't go past width size. Dynamically scales according to width size.
	legendWidth = colSize*2,
	buckets = 9,
	colors = ["#e6eeff","#ccdcff","#b3cbff","#ccb3ff","#bb99ff","#aa80ff","#ff6666","#ff3333","#cc0000"],
	weekDay = ["Mo","Tu","We","Th","Fr","Sa","Su"],
  	hours = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
  	dataset = '../data/heatmap_data.csv'

var svg = d3.select('#chart').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dayLabel = svg.selectAll('.dayLabel')
	.data(weekDay)
	.enter().append('text')
		.text(function (d) {return d;})
		.attr('x', 0)
		.attr('y', function (d,i) { return i * colSize;})
		.style('text-anchor', 'end')
		.attr("transform",  "translate(-6," + colSize / 1.5 + ")")

var timeLabel = svg.selectAll('.timeLabel')
	.data(hours)
	.enter().append('text')
		.text(function (d) {return d;})
		.attr('x', function(d,i) {return i * colSize;})
		.attr('y', 0)
		.style('text-anchor', 'end')
		.attr( "transform", "translate(" + colSize / 1.5 + ", -6)")      


var heatmap = function(csvFile) {
	d3.csv(csvFile,
		function(d) {
			return {
				hour: +d.hour,
				day: +d.weekday,
				click: +d.IsClick
			};
},// Goes through every line of the data and does stuff to it
function(error,data){
	var colorScale = d3.scale.quantile()
		.domain([0, buckets -1, d3.max(data, function(d) { return d.click;})])
		.range(colors);

	var sq = svg.selectAll(".hour")
		.data(data, function(d) {return d.day+':'+d.hour;});

	sq.append('title');

	sq.enter().append('rect')
		.attr('x', function(d) {return (d.hour) * colSize;})
		.attr('y', function(d) {return (d.day) * colSize;})
		.attr('rx', 4)
		.attr('ry', 4)
		.attr('class', 'hour bordered')
		.attr('width', colSize)
		.attr('height', colSize)
		.style('fill', colors[0]);

	sq.transition().duration(1000)
		.style('fill', function(d) { return colorScale(d.click); });
	
	sq.select('title').text(function(d){return d.click})

	sq.exit().remove();

	var legend = svg.selectAll('.legend')
		.data([0].concat(colorScale.quantiles()), function(d) { return d;});
	
	legend.enter().append('g')
		.attr('class', 'legend');

	legend.append('rect')
		.attr('x', function(d,i){return legendWidth * i})
		.attr('y', height)
		.attr('width', legendWidth)	
		.attr('height', colSize / 2)
		.style('fill', function(d,i) { return colors[i];});

	legend.append('text')
		.attr('class', 'legendLabel')
		.text(function(d) { return "≥ " + Math.round(d); })
		.attr('x', function(d,i){ return legendWidth * i;})
		.attr('y',height + colSize);

	legend.exit().remove();

});
};

heatmap(dataset);

}());


