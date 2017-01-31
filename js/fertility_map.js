			var width5 = 700;
			var height5 = 500;

			buckets = 8,

			//colors = ['#ff1a1a','#ff471a','#ffd633','#ffff1a','#ccff33',' #66ff66','#00ff00',' #009900'];

			colors = ["#adfcad", "#99ddff", "#4dc3ff","#ffcb40", "#ffba00", "#ff7d73", "#ff4e40", "#ff1300"]

			var legend_labels = ["<1.3", "1.3-1.39", "1.4-1.49", "1.5-1.59", "1.6-1.69", "1.7-1.79","1.8-1.89","1.9+"]              


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

			//Adding legend for our Choropleth

