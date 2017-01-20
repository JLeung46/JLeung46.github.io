			var width5 = 700;
			var height5 = 500;

			buckets = 8,
			colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"];



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

				var colorScale = d3.scale.quantile()
            		.domain([0, buckets -1, d3.max(collection.features, function(d) { return d.properties.fertility;})])
            		.range(colors);
				
				mapchart.selectAll("path")
				   .data(collection.features)
				   .enter()
				   .append("path")
				   .attr("d", path)
				   .attr("stroke", "rgba(8, 81, 156, 0.2)")
				   .attr("fill", "rgba(8, 81, 156, 0.6)");
				   //.style("fill", function(d) { return colorScale(d.properties.fertility); });

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