
var loadChord = function(){
	var chord_width = 500,
	chord_height = 500,
	chord_matrix_dim = CategoryNames.length;

	var chord_svg = d3.select("#chord-chart").append("svg")
		.attr("width",chord_width + 700)
		.attr("height",chord_height + 700),
	    outerRadius = Math.min(chord_width + 300, chord_height + 300) * 0.5 - 40,
	    innerRadius = outerRadius - 30;


	//Setting up the matrix	
	var chord_matrix = []

	for(i in d3.range(chord_matrix_dim)){
		chord_matrix[i] = []

		for(k in d3.range(chord_matrix_dim)){
			chord_matrix[i][k] = 0
		}
	}

	var cat_id = 0 //id of the category, so Access has cat_id == 0,Assistance has cat_id == 1
	var var_id = 0

	for(cat in categoryObject){
		var set_array = Array.from(categoryObject[cat])
		for(collection in set_array){
			var cur_var = set_array[collection]
			
			// if(cur_var)
				// 	chord_matrix[cat_id][var_id] = 
			// 	var_id += 1
		}
		// for(variable in category){

	}

		// // cat_id += 1
		// // var_id = 0
	// }

	var chord_svg = d3.select("#chord-chart").append("svg")
		.attr("width",chord_width + 700)
		.attr("height",chord_height + 700),
	    outerRadius = Math.min(chord_width + 300, chord_height + 300) * 0.5 - 40,
	    innerRadius = outerRadius - 30;

	chord_svg.selectAll("*").remove()
	var formatValue = d3.formatPrefix(",.0", 1e3);

	var chord = d3.chord()
	    .padAngle(0.05)
	    .sortSubgroups(d3.descending);

	// var arc = d3.arc()
	//     .innerRadius(innerRadius)
	//     .outerRadius(outerRadius);

	// var ribbon = d3.ribbon()
	//     .radius(innerRadius);
	    

	// var color = d3.scaleOrdinal()
	//     .domain(d3.range(91))
	//     .range(["#000000", "#FFDD89", "#957244", "#F26223"]);

	// var g = chord_svg.append("g")
	//     .attr("transform", "translate(" + ((width / 2)  + 200) + "," + ((height / 2)  + 145) + ")")
	//     .datum(chord(matrix));

	// var group = g.append("g")
	//     .attr("class", "groups")
	//   .selectAll("g")
	//   .data(function(chords) { return chords.groups; })
	//   .enter().append("g");

	// group.append("path")
	//     .style("fill", function(d) { return color(d.index); })
	//     .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
	//     .attr("d", arc);

	// var groupTick = group.selectAll(".group-tick")
	//   .data(function(d) { return groupTicks(d, 1e3); })
	//   .enter().append("g")
	//     .attr("class", "group-tick")
	//     .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

	// groupTick.append("line")
	//     .attr("x2", 6);

	// var tick_label = 1;
	// groupTick
	//   .filter(function(d) { return d.value % 5e3 === 0; })
	//   .append("text")
	//     .attr("x", 8)
	//     .attr("dy", ".35em")
	//     .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
	//     .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
	//     .text(function(k) {
	//     	tick_label += 1
	//     	return tick_label % 91

	    	
	//     });

	// g.append("g")
	//     .attr("class", "ribbons")
	//   .selectAll("path")
	//   .data(function(chords) { return chords; })
	//   .enter().append("path")
	//     .attr("d", ribbon)
	//     .style("fill", function(d) { return color(d.target.index); })
	//     .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); });

	// // Returns an array of tick angles and values for a given group and step.
	// function groupTicks(d, step) {
	//   var k = (d.endAngle - d.startAngle) / d.value;
	//   return d3.range(0, d.value, step).map(function(value) {
	//     return {value: value, angle: value * k + d.startAngle};
	//   });
	// }
	// });

	// }

}
