function drawscatter(var1, var2) {
  var sp_margin = {top: 20, right: 20, bottom: 30, left: 50},
    sp_height = 500 - sp_margin.left - sp_margin.right,
    sp_width = 960 - sp_margin.top - sp_margin.bottom;
   
  x_data = dataObject[var1];
  y_data = dataObject[var2];
  sp_data = [];
  //put in proper data format for d3

  for (var prop in x_data) {
    if (!x_data.hasOwnProperty(prop) || prop == "$max") {
        //The current property is not a direct property of p
        continue;
    }
    row = new Object();
    prop = prop.slice(1);
    xitem = x_data.get(prop);
    yitem = y_data.get(prop);
    if (xitem != null && yitem != null) {  
      row["FIPS"] = +prop;    
      row["x"] = xitem;
      row["y"] = yitem;
      sp_data.push(row);
    }
  }
  //ranges on axises\
  var sp_x = d3.scaleLinear() 
    .range([0, sp_width])
    .domain([0, x_data.get("max") + 1]);
    
  var sp_y = d3.scaleLinear() //money
    .range([sp_height, 0])
    .domain([0, y_data.get("max") + 10]);

  //setting up svgs/g
  var sp_svg = d3.select("#scatterplot").append("svg")
    .attr("class", "spsvg")
    .attr("width", sp_width + sp_margin.left + sp_margin.right)
    .attr("height", sp_height + sp_margin.top + sp_margin.bottom);

  var sp_g = sp_svg.append("g")
    .attr("class", "spg")
    .attr("transform", "translate(" + sp_margin.left + "," + sp_margin.top + ")");  

   //tooltip
  var sp_tooltip = d3.tip()
    .attr("class", "tooltip")
    .direction("n")
    .offset([0, 0])
    .html(function(d) {
      return populationByCounty[d.FIPS][1] + ", " + populationByCounty[d.FIPS][0];}); //curr_data is the year we're looking at

  //invoke tip library
  sp_g.call(sp_tooltip);

   //draw axis
  sp_g.append("g")
      .attr("class", "spaxis")
      .attr("transform", "translate(0, " + sp_height + ")")
      .call(d3.axisBottom(sp_x));
   
  sp_g.append("text")
      .attr("x", sp_width / 2 - sp_margin.right - sp_margin.left)
      .attr("y", sp_height - sp_margin.top + 50)
      .attr("fill", "#000")
      .attr("font-size", 11)
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .attr("font-family", "Cinzel")
      .text(varKey[var1]);

  //y-axis
  sp_g.append("g")
      .attr("class", "spaxis")  
      .call(d3.axisLeft(sp_y))
    .append("text")
      .attr("x", 200)
      .attr("y", -10)
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("font-family", "Cinzel")
      .text(varKey[var2]);
  
  sp_g.selectAll(".dot")
      .data(sp_data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 6)
      .attr("cx", function(d) { return sp_x(d.x); })
      .attr("cy", function(d) { return sp_y(d.y); })
      .attr("fill", "#5B2163")
      .on("mouseover", sp_tooltip.show)
      .on("mouseout", sp_tooltip.hide);
}

function update_sp(var1, var2) {
  d3.select(".spsvg").remove();
  drawscatter(var1,var2);
}