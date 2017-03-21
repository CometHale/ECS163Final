function getspdata(xdata, ydata) {
  var sp_data = [];

  for (var prop in xdata) {
    if (!xdata.hasOwnProperty(prop) || prop == "$max") {
        //The current property is not a direct property of p
        continue;
    }
    row = new Object();
    prop = prop.slice(1);
    xitem = xdata.get(prop);
    yitem = ydata.get(prop);
    if (xitem != null && yitem != null) {  
      row["FIPS"] = +prop;    
      row["x"] = xitem;
      row["y"] = yitem;
      sp_data.push(row);
    }
  }  
  return sp_data;
} //put in proper data format for d3




function drawscatter(var1, var2) {
  curr_var1 = var1;
  curr_var2 = var2;

  sp_margin = {top: 20, right: 20, bottom: 30, left: 50},
    sp_height = 500 - sp_margin.left - sp_margin.right,
    sp_width = 960 - sp_margin.top - sp_margin.bottom;
  
  var x_data = dataObject[var1];
  var y_data = dataObject[var2];   
  var sp_data = getspdata(x_data, y_data);
  
  //ranges on axises\
  var sp_x = d3.scaleLinear() //global
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
   
  xkey = sp_g.append("text")
      .attr("x", sp_width / 2 - sp_margin.right - sp_margin.left)
      .attr("y", sp_height - sp_margin.top + 50)
      .attr("fill", "#000")
      .attr("font-size", 11)
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .attr("font-family", "Cinzel")
      .text(varKey[var1]);

  //y-axis
  var yaxis = sp_g.append("g")
      .attr("class", "spaxis")  
      .call(d3.axisLeft(sp_y))
  ykey = yaxis.append("text")
        .attr("x", -100)
        .attr("y", -30)
        .attr("transform", "rotate(270)")
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
      .attr("fill", " #ffb84d")
      .on("mouseover", sp_tooltip.show)
      .on("mouseout", sp_tooltip.hide);

  //create checkbox to switch axes
  var checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.name = "axisswitch";
  checkbox.value = "value";
  checkbox.id = "axisswitch";

  var label = document.createElement('label')
  label.htmlFor = "axisswitch";
  label.appendChild(document.createTextNode('Switch Axes'));

  document.getElementById('axisswitch').onclick = function() {
    update_sp(curr_var2, curr_var1);
  };

  document.getElementById("axisswitch").appendChild(checkbox);
  document.getElementById("axisswitch").appendChild(label);
}

function update_sp(var1, var2) {
  curr_var1 = var1;
  curr_var2 = var2;

  var x_data = dataObject[var1];
  var y_data = dataObject[var2];  
  var sp_data = getspdata(x_data, y_data);

   //ranges on axises\
  var sp_x = d3.scaleLinear() //global
    .range([0, sp_width])
    .domain([0, x_data.get("max") + 1]);
    
  var sp_y = d3.scaleLinear() //money
    .range([sp_height, 0])
    .domain([0, y_data.get("max") + 10]);

  xkey.text(varKey[var1]);
  ykey.text(varKey[var2]);

  //code from http://bl.ocks.org/WilliamQLiu/bd12f73d0b79d70bfbae
  d3.select(".spsvg").selectAll("circle")
    .data(sp_data)
    .transition()
    .duration(1000)
    .on("start", function() {  // Start animation
        d3.select(this)  // 'this' means the current element
            .attr("fill", "#6699ff")  // Change color
            .attr("r", 3);  // Change size
    })
    .delay(function(d, i) {
        return i / sp_data.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
    })
    //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
    .attr("cx", function(d) {
        return sp_x(d.x);  // Circle's X
    })
    .attr("cy", function(d) {
        return sp_y(d.y);  // Circle's Y
    })
    .on("end", function() {  // End animation
      d3.select(this)  // 'this' means the current element
          .transition()
          .duration(500)
          .attr("fill", "#ffb84d")  // Change color
          .attr("r", 6);  // Change radius
    });

    // Update X Axis
    d3.select(".spsvg.x.axis")
        .transition()
        .duration(1000)
        .call(d3.axisBottom(sp_x));

    // Update Y Axis
    d3.select(".spsvg.y.axis")
        .transition()
        .duration(100)
        .call(d3.axisLeft(sp_y));
}
