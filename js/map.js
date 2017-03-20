catToColor = 
{
  Access: "#5B2163",
  Assistance: "#1F255C",
  Demographics: "#BF7140",
  Economic: "#3F9D34",
  FoodCosts: "#674822",
  Health: "#A13636",
  Insecurity: "#349D99",
  LocalFoodAccess: "#C95EAD",
  LocalFoodProduction: "#8C81D5",
  Restaurants: "#87D47D",
  Stores: "#C0CC66",
  StudentAssistance: "#2E6D84",
};


function MakeMap(variable)
{
  d3.json("data/us-10m.v1.json", function(us) {
    
    var svg = d3.select("#map"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var path = d3.geoPath();

    if (variable == "firstLoad")
    {
      // actually make map
       svg.append("g")
            .attr("class", "counties")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.counties).features)
          .enter().append("path")
            .attr("fill", "#999999")
            .attr("d", path);
        svg.append("path")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("class", "states")
            .attr("d", path);

        /*
        .on("click", clicked)
        .on("mouseover", function(d) {
              d3.select(this).classed("hoverstate", true);
              showToolTip(tooltipHtml(d));
            })
        .on("mousemove", moveToolTip)
        .on("mouseout", function(d) {
              d3.select(this).classed("hoverstate", false);
              hideToolTip();
              });
        */ 
      firstLoad = false;
    }

    else
    {
      d3.selectAll(".legend").remove(); //deletes anay previously created legends
      
      var mapData = dataObject[variable];
      var description = varKey[variable][0];
      var cat = varKey[variable][1];
         
      var Domain = [0,mapData.get("max")];

      var color = d3.scaleLinear()
          .domain(Domain)
          .range(["white",catToColor[cat]]);

      var legendg = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(-50,30)");


     var xPos = d3.scaleLinear()
        .domain(Domain)
        .rangeRound([0.75*width, 0.95*width]);    

      var keyRange = [];
      var domainSpan = xPos.domain()[1] - xPos.domain()[0];
    
      for (i = 0; i <= 20; i++) {
        keyRange.push(xPos.domain()[0] + (i*0.05*domainSpan));
      }
           
      legendg.selectAll("rect")
      .data(keyRange)
      .enter().append("rect")
        .attr("height", 8)
        .attr("x", function(d) { return xPos(d) - 5; })
        .attr("width", function(d) { return (xPos(d + 0.05*domainSpan) - xPos(d));})
        .attr("fill", function(d) { return color(d); });
      legendg.append("text")  
        .attr("class", "caption")
        .attr("x", xPos.range()[1])
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .text(description);

      legendg.append("g").attr("transform", "translate(0,7)")
        .call(d3.axisBottom(xPos)
        .ticks(5)
        .tickSize(7)
        .tickFormat(d3.format("3"))
        ).select(".domain")
          .remove()
      
      //update map
      svg.selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
                       .attr("fill", function(d) {
                  if (isNaN(mapData.get(+d.id)))
                  {
                    return "#999999";
                  } else
                    {
                      return color(mapData.get(+d.id));
                    }
                  });
          /*.on("click", clicked)
          .on("mouseover", function(d) {
              d3.select(this).classed("hoverstate", true);
              showToolTip(tooltipHtml(d));
            })
          .on("mousemove", moveToolTip)
          .on("mouseout", function(d) {
              d3.select(this).classed("hoverstate", false);
              hideToolTip();
              }); */
    }

    }); //d3 json function
   
} //MakeMap function

