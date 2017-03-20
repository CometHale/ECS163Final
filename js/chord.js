var loadChord = function(){

	//Setting up the matrix	
	var chord_matrix = []
	var variable_array = []
	var category_var_array = {}
	var category_color = ["#5B2163","#1F255C","#BF7140","#3F9D34","#674822","#FFDBB5","#A13636","#349D99","#C95EAD","#8C81D5","#87D47D","#C0CC66","#2E6D84"]
	var cat_index = 0

	for(category in category_correls){
		chord_matrix[cat_index] = []
		var sub_cat_index = 0
		for(sub_category in category_avg_correls[category]){
			chord_matrix[cat_index][sub_cat_index] = category_avg_correls[category][sub_category]
			sub_cat_index += 1
		}
		cat_index += 1
	}


	var chord_width = 700,
		chord_height = 700,
		chord_matrix_dim = CategoryNames.length,
		outerRadius = Math.min(chord_width, chord_height) * 0.5 - 40,
		innerRadius = outerRadius - 30;

	var w = 980, h = 800, r1 = h / 2, r0 = r1 - 100;
	var chord_svg = d3.select("#chord-chart").append("svg")
						.attr("width",chord_width + 300)
						.attr("height",chord_height + 300);

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
	    .attr("transform", "translate(" + (chord_width + 300) / 2 + "," + (chord_height + 300) / 2 + ")")
	    .datum(chord(chord_matrix));

	var group = g.append("g")
	    .attr("class", "groups")
	  .selectAll("g")
	  .data(function(chords) { return chords.groups; })
	  .enter().append("g");

	group.append("path")
	    .style("fill", function(d) { 
	    	return color(d.index); 
	    })
	    .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
	    .attr("d", arc);
	 	
	var groupText = group.append("text")
		.each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
   		.attr("class","group-label")
   		.attr("id", function(d){
   			return "group-label-" + CategoryNames[d.index];
   		})
		.attr("x", 6)
		.attr("dy", 15)
        .attr("fill", "black")
        .style("font-size", "20px")
        .attr("transform", function(d) {
              return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                  + "translate(" + (r0 +200 - (d.angle > Math.PI ? 0 : 180) - (CategoryNames[d.index].length <= 10? CategoryNames[d.index].length:0)) +")"
                  + (d.angle > Math.PI ? "rotate(180)" : "");
            })
        .text(function(d, i) { 
        	var label = CategoryNames[d.index]
        	return label; 
        });
	
	var health_label = $("#group-label-Health").attr("transform", "rotate(105)translate(400,50)rotate(180)")

	var insecurity_label = $("#group-label-Insecurity").attr("transform", "rotate(133)translate(420,50)rotate(180)")

	var restaurants_label = $("#group-label-Restaurants").attr("transform", "rotate(183)translate(425,50)rotate(185)")

	var stores_label = $("#group-label-Stores").attr("transform", "rotate(210)translate(380,50)rotate(185)")

	var sa_label = $("#group-label-StudentAssistance").attr("transform", "rotate(245)translate(470,50)rotate(185)")

	g.append("g")
	    .attr("class", "ribbons")
	  .selectAll("path")
	  .data(function(chords) { return chords; })
	  .enter().append("path")
	  	.attr("class","chord-path")
	  	.attr("id", function(d,i){
	  		return "path-" + i
	  	})
	    .attr("d", ribbon)
	   	.on("mouseover", mouseover)
	   	.on("mouseout", mouseout)
	   	.on("click",ribbonclick)
	    .style("fill", function(d) { return color(d.target.index); })
	    .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); });

	
	function mouseover(d, i) {

		var selected_path = $("#path-" + i)

		$(".chord-path").each(function(path){
        	var path_obj = $("#path-" + path)
        	path_obj.addClass("fade");
        });
        selected_path.removeClass("fade");

    }

    function mouseout(d, i) {

        $(".chord-path").each(function(path){
        	var path_obj = $("#path-" + path)
        	path_obj.removeClass("fade");
        });
  
    }

    function ribbonclick(d, i) {
    	var cat_1 = CategoryNames[d.source.index];
    	var cat_2 = CategoryNames[d.target.index];
    	// bp_update(cat_1,cat_2);
    	$("#bipartite").empty();

    	$('html, body').animate({
	        scrollTop: $("#bipartite").offset().top
	    }, 2000);

    	drawbp(cat_1,cat_2)
    }

}
