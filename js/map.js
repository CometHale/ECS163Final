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
        //tooltip
        var map_tooltip = d3.tip()
          .attr("class", "tooltip")
          .direction("n")
          .offset([0, 0])
          .html(function(d) {
            return populationByCounty[+d.id][1] + ", " + populationByCounty[+d.id][0];}); //curr_data is the year we're looking at

        //invoke tip library
        svg.call(map_tooltip);
      
       // actually make map
       svg.append("g")
            .attr("class", "counties")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.counties).features)
          .enter().append("path")
            .attr("d", path)
            .attr("class","county")
            .on("click", function(d) {
              newclass = AddRegion(+d.id);
              d3.select(this).classed(newclass, true)
            })
          .on("mouseover", function(d) {
              d3.select(this).classed("hovered", true);
              showMapToolTip(+d.id);
            })
          .on("mousemove", moveMapToolTip)
          .on("mouseout", function(d) {
              d3.select(this).classed("hovered", false);
              hideMapToolTip();
              });
        svg.append("path")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("class", "states")
            .attr("d", path);
            
      firstLoad = false;
    } // end if first load

    else
    {
      AddAttribute(variable);
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

      } // end if not the first load
    }); //d3 json function
   
} //MakeMap function




//map tooltip functions
  function maptooltipHTML(FIPS){	// function to create html content string in tooltip div.
          var countyState = populationByCounty[FIPS][1] + ", " + populationByCounty[FIPS][0];
          var popNum = populationByCounty[FIPS][2];
          var popString = "Population: " + d3.format(",")(popNum);
		  return "<table><tr><td align='center'><b>"+ countyState +"</b></td></tr><tr><td align='center'>"+ popString +"</td></tr></table>";
	}

  function showMapToolTip(FIPS) {
    $("#maptooltip").show().html(maptooltipHTML(FIPS));
  }

  function moveMapToolTip(){
    $("#maptooltip").css({ left: d3.event.pageX + 10,
                        top: d3.event.pageY - 50 });
  }

  function hideMapToolTip(){
    $("#maptooltip").hide();
  }

