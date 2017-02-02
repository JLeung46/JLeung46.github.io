			var width5 = 700;
			var height5 = 500;

			buckets = 8,

			colors = [' #cccccc','#ff471a','#ffd633','#ffff1a','#ccff33','#66ff66','#00ff00','#009900'];

    
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

				console.log(d3.min(collection.features, function(d) { return d.properties.fertility;}))

				// Sets color for each country according to fertility rate
				var colorScale = d3.scale.quantile()
            		.domain(
            			[
            			
            			d3.min(collection.features, function(d) 
            				{ 
            					return d.properties.fertility;
            				}
            				), 
            			d3.max(collection.features, function(d) 
            				{ return d.properties.fertility;
            				})
            			])
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
			    //Adding legend for our Choropleth
			var legend_arr=[];

			  for(var i=0;i< collection.features.length;i++) {
			  	  var feature = collection.features[i];
					 if(feature.properties.fertility != "") {

					   legend_arr.push(feature) 
					 }
			  }
              var color_json = {};
			  for(var i=0;i< legend_arr.length;i++) {
			  	  var feature = legend_arr[i];
					 var val = colorScale(feature.properties.fertility) 
                      if(color_json[val]) {
                       	color_json[val].push(feature.properties.fertility)
                      } else {
                      	color_json[val]=[];
                      	color_json[val].push(feature.properties.fertility)
                      }
					 }
					 console.log(color_json)
              var final_legend_arr =[];
              var final_legend_colors =[];
             for(var prop in color_json) {
             	var obj = color_json[prop];
             	 var min_of_array = Math.min.apply(Math, obj).toFixed(1);
             	 var max_of_array = Math.max.apply(Math, obj).toFixed(1);
             	 final_legend_colors.push(prop);
             	 final_legend_arr.push(min_of_array +'-'+ max_of_array);
                 
             }
              //final_legend_colors.push('#FF0000');
             	 //final_legend_arr.push('2.1+');
			  var legend = mapchart.selectAll("g.legend")
			  .data(final_legend_colors)
			  .enter().append("g")
			  .attr("class", "legend");
             	  var ls_w = 20, ls_h = 20;
             	 legend.append("rect")
			  .attr("x", 20)
			  .attr("y", function(d, i){ return height5 - (i*ls_h) - 2*ls_h;})
			  .attr("width", ls_w)
			  .attr("height", ls_h)
			  .style("fill", function(d,i) { return final_legend_colors[i] })
			  .style("opacity", 0.8);

			  legend.append("text")
			  .attr("x", 50)
			  .attr("y", function(d, i){ return height5 - (i*ls_h) - ls_h - 4;})
			  .text(function(d, i){ return final_legend_arr[i] }); //
      
			 
		   
		
			});