function MakeMap(variable)
{

  console.log("I have been called");
  d3.json("data/us-10m.v1.json", function(us) {
    
    var svg = d3.select("#map"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var path = d3.geoPath();

    var mapData = dataObject[variable];
    
      
    var x = d3.scaleLinear()
        .domain([1, 100])
        .rangeRound([600, 860]);

    var color = d3.scaleLinear()
        .domain([0,mapData.get("max")])
        .range(["white","blue"]);

    var g = svg.append("g")
        .attr("class", "key")
        .attr("transform", "translate(0,40)");
        
    /*
    g.selectAll("rect")
      .data(color.range().map(function(d) {
          d = color.invertExtent(d);
          if (d[0] == null) d[0] = x.domain()[0];
          if (d[1] == null) d[1] = x.domain()[1];
          return d;
        }))
      .enter().append("rect")
        .attr("height", 8)
        .attr("x", function(d) { return x(d[0]); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("fill", function(d) { return color(d[0]); });

    g.append("text")
        .attr("class", "caption")
        .attr("x", x.range()[0])
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("Unemployment rate");


    g.call(d3.axisBottom(x)
        .tickSize(13)
        .tickFormat(function(x, i) { return i ? x : x + "%"; })
        .tickValues(color.domain()))
      .select(".domain")
        .remove();
        
    */

     svg.append("g")
          .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter().append("path")
          .attr("fill", function(d) { return color(mapData.get(+d.ID)); })
          .attr("d", path);
      svg.append("path")
          .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
          .attr("class", "states")
          .attr("d", path);
    
    }); //d3 json function
   
} //MakeMap function

