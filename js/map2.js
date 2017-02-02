			var margin = {top: 40, right: 40, bottom: 20, left: 90},
				width5 = 700;
				height5 = 500;

			buckets = 8,

			colors = ['#e6e6e6','#ff471a','#ffd633','#ffff1a','#ccff33',' #66ff66','#00ff00',' #009900'];
			//colors = ["#e6e6e6", "#99ddff", "#4dc3ff","#ffcb40", "#ffba00", "#ff7d73", "#ff4e40", "#ff1300"]

			//variables for legend
			var color_domain = [50, 150, 350, 750]
			var ext_color_domain = [0, 50, 150, 350]
			var legend_labels = ["< 1.3", "1.4 +", "1.6 +", "> 1.9"]              
			var color = d3.scale.threshold()
				.domain(color_domain)
				.range(['#ccff33',' #66ff66','#00ff00',' #009900']);


			var projection = d3.geo.mercator()
								   .center([ 13, 52 ])
								   .translate([ width5/2.5, height5/1.7 ])
								   .scale([ width5/1.5 ]);

			var path = d3.geo.path()
							 .projection(projection);


			var mapchart = d3.select("#mapchartarea")
						.append("svg")
						.attr("width", width5)
						.attr("height", height5);

			d3.json("data/europe_geo_fertility.json", function(error,collection) {
				if(error) throw error;

				// Sets color for each country according to fertility rate
				var colorScale = d3.scale.quantile()
            		.domain([d3.min(collection.features, function(d) { return d.properties.fertility;}), d3.max(collection.features, function(d) { return d.properties.fertility;})])
            		.range(colors);
				
				// Draws Map
				mapchart.selectAll("path")
				   .data(collection.features)
				   .enter()
				   .append("path")
				   .attr("d", path)
				   .attr("stroke", "rgba(8, 81, 156, 0.2)")
				   .attr("fill", "rgba(8, 81, 156, 0.6)")
				   .style("fill", function(d) { return colorScale(d.properties.fertility); });

				// Adds name of each country
			    mapchart.selectAll("text")
			    .data(collection.features)
			    .enter()
			    .append("svg:text")
			    .text(function(d){
			        return d.properties.name;
			    })
			    .attr("x", function(d){
			        return path.centroid(d)[0];
			    })
			    .attr("y", function(d){
			        return  path.centroid(d)[1];
			    })
			    .attr("text-anchor","middle")
			    .attr('font-size','6pt');

			   
			});

			//Add legend
		  var legend = mapchart.selectAll("g.legend")
		  .data(ext_color_domain)
		  .enter().append("g")
		  .attr("class", "legend");

		  var ls_w = 20, ls_h = 20;

		  legend.append("rect")
		  .attr("x", 20)
		  .attr("y", function(d, i){ return height5 - (i*ls_h) - 2*ls_h;})
		  .attr("width", ls_w)
		  .attr("height", ls_h)
		  .style("fill", function(d, i) { return color(d); })
		  .style("opacity", 0.8);

		  legend.append("text")
		  .attr("x", 50)
		  .attr("y", function(d, i){ return height5 - (i*ls_h) - ls_h - 4;})
		  .text(function(d, i){ return legend_labels[i]; });
