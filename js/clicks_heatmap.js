var margin = {top:70, right: 0, bottom: 100, left:60},
	width = 960 - margin.left - margin.right,
	height = 430 - margin.top - margin.bottom,
	gridSize = Math.floor(width / 24), // Takes width of svg and sets size of each column. Need to floor so doesn't go past width size. Dynamically scales according to width size.
	legendElementWidth = gridSize*2,
	buckets = 9,
	colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],
	days = ["Mo","Tu","We","Th","Fr","Sa","Su"],
  	times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
  	datasets = ['../data/heatmap_data.csv'];

var svg = d3.select('#chart').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dayLabels = svg.selectAll('.dayLabel')
	.data(days)
	.enter().append('text')
		.text(function (d) {return d;})
		.attr('x', 0)
		.attr('y', function (d,i) { return i * gridSize;})
		.style('text-anchor', 'end')
		.attr("transform",  "translate(-6," + gridSize / 1.5 + ")")

var timeLabels = svg.selectAll('.timeLabel')
	.data(times)
	.enter().append('text')
		.text(function (d) {return d;})
		.attr('x', function(d,i) {return i * gridSize;})
		.attr('y', 0)
		.style('text-anchor', 'end')
		.attr( "transform", "translate(" + gridSize / 1.5 + ", -6)")      


var heatmapChart = function(csvFile) {
	d3.csv(csvFile,
		function(d) {
			return {
				hour: +d.hour,
				day: +d.weekday,
				click: +d.IsClick
			};
},// This goes through every line of the data and does stuff to it
function(error,data){
	var colorScale = d3.scale.quantile()
		.domain([0, buckets -1, d3.max(data, function(d) { return d.click;})])
		.range(colors);

	var cards = svg.selectAll(".hour")
		.data(data, function(d) {return d.day+':'+d.hour;});

	cards.append('title');

	cards.enter().append('rect')
		.attr('x', function(d) {return (d.hour) * gridSize;})
		.attr('y', function(d) {return (d.day) * gridSize;})
		.attr('rx', 4)
		.attr('ry', 4)
		.attr('class', 'hour bordered')
		.attr('width', gridSize)
		.attr('height', gridSize)
		.style('fill', colors[0]);

	cards.transition().duration(1000)
		.style('fill', function(d) { return colorScale(d.click); });
	
	cards.select('title').text(function(d){return d.click})

	cards.exit().remove();

	var legend = svg.selectAll('.legend')
		.data([0].concat(colorScale.quantiles()), function(d) { return d;});
	
	legend.enter().append('g')
		.attr('class', 'legend');

	legend.append('rect')
		.attr('x', function(d,i){return legendElementWidth * i})
		.attr('y', height)
		.attr('width', legendElementWidth)
		.attr('height', gridSize / 2)
		.style('fill', function(d,i) { return colors[i];});

	legend.append('text')
		.attr('class', 'mono')
		.text(function(d) { return "≥ " + Math.round(d); })
		.attr('x', function(d,i){ return legendElementWidth*i;})
		.attr('y',height + gridSize);

	legend.exit().remove();

});
};

heatmapChart(datasets[0]);

