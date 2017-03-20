
var loadChord = function(){



	//Setting up the matrix	
	var chord_matrix = []
	var variable_array = []
	var category_var_array = {}
	var category_color = ["#5B2163","#1F255C","#BF7140","#3F9D34","#674822","#A13636","#349D99","#C95EAD","#8C81D5","#87D47D","#C0CC66","#2E6D84"]

// Access: #5B2163
// Assistance: #1F255C
// Demographics: #BF7140
// Economic: #3F9D34
// Food Costs: #674822
// Health: #A13636
// Insecurity: #349D99
// Local Food Access: #C95EAD
// Local Food Production: #8C81D5
// Restaurants: #87D47D
// Stores: #C0CC66
// Student Assistance: #2E6D84

	for(cat in categoryObject){
		var set_array = Array.from(categoryObject[cat])

		if(!(cat in category_var_array)){
			category_var_array[cat] = []
		}

		for(collection in set_array){
			var cur_var = set_array[collection]

			category_var_array[cat].push(cur_var)
			if(variable_array.indexOf(cur_var) == -1){
				variable_array.push(cur_var)
			}

			var cur_var_id = variable_array.indexOf(cur_var)
			chord_matrix[cur_var_id] = []
		}

	}

	for(cur_id in variable_array){
		var cur_var = variable_array[cur_id]
		for(correl_var in correlation_dict[cur_var]){
			var correl_var_id = variable_array.indexOf(correl_var)
			var cor_val = correlation_dict[cur_var][correl_var]

			if(cor_val < 0){
				cor_val = cor_val * -1 
			}

			cor_val =  100 % cor_val
			chord_matrix[cur_id][correl_var_id] = cor_val
		}
	}

	var chord_width = 1200,
		chord_height = 1200,
		chord_matrix_dim = CategoryNames.length,
		outerRadius = Math.min(chord_width, chord_height) * 0.5 - 40,
		innerRadius = outerRadius - 30;

	var chord_svg = d3.select("#chord-chart").append("svg")
						.attr("width",chord_width)
						.attr("height",chord_height);

	var formatValue = d3.formatPrefix(",.0", 1e3);

	var chord = d3.chord()
	    .padAngle(0.05)
	    .sortSubgroups(d3.descending);

	var arc = d3.arc()
	    .innerRadius(innerRadius)
	    .outerRadius(outerRadius);

	var ribbon = d3.ribbon()
	    .radius(innerRadius);

	var color = d3.scaleOrdinal()
	    .domain(d3.range(13))
	    .range(category_color);

	var g = chord_svg.append("g")
	    .attr("transform", "translate(" + chord_width / 2 + "," + chord_height / 2 + ")")
	    .datum(chord(chord_matrix));

	var group = g.append("g")
	    .attr("class", "groups")
	  .selectAll("g")
	  .data(function(chords) { return chords.groups; })
	  .enter().append("g");

	group.append("path")
	    .style("fill", function(d) { 
	    	var index = 0
	    	for(categ in category_var_array){
	    		var variable = variable_array[d.index]

	    		if(category_var_array[categ].indexOf(variable) > - 1){
	    			console.log("")
	    			break
	    		}
	    		index += 1;	
	    	}
	    	return color(index); 
	    })
	    .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
	    .attr("d", arc);

	var groupTick = group.selectAll(".group-tick")
	  .data(function(d) { return groupTicks(d, 1e3); })
	  .enter().append("g")
	    .attr("class", "group-tick");
	    // .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

	groupTick.append("line")
	    .attr("x2", 6);

	groupTick
	  .filter(function(d) { return d.value % 5e3 === 0; })
	  .append("text")
	    .attr("x", 8)
	    .attr("dy", ".35em")
	    .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
	    .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
	    .text(function(d) { return formatValue(d.value); });

	g.append("g")
	    .attr("class", "ribbons")
	  .selectAll("path")
	  .data(function(chords) { return chords; })
	  .enter().append("path")
	    .attr("d", ribbon)
	    .style("fill", function(d) { return color(d.target.index); })
	    .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); });

	// Returns an array of tick angles and values for a given group and step.
	function groupTicks(d, step) {
	  var k = (d.endAngle - d.startAngle);
	  return d3.range(0, d.value, step).map(function(value) {
	    return {value: value, angle: value * k + d.startAngle};
	  });
	}
}
