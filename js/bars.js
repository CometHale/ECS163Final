var attributeArray = [];
var currAttrIdx = 0;
var regionArray= [];
var currRegIdx = 0;
var removeStuff = false;

var classes = ["selection1bar","selection2bar","selection3bar","selection4bar","selection5bar"];
var returnclasses = ["selection1path","selection2path","selection3path","selection4path","selection5path"];

var bar_svg = d3.select("#bars"),
    width = +bar_svg.attr("width"),
    height = +bar_svg.attr("height") - 50;

var margin =  50;

var regionLimit = 5;
var attributeLimit = 5;

var barWidth = (width - margin)/(regionLimit*attributeLimit + attributeLimit - 1) // width divided by max # of bars, plus gaps & margins
var boxWidth = (width - margin)/attributeLimit;


function CreateBars()
{
  // remove previous things:
  d3.selectAll(".bargroup").remove();
// Create the graph by iterating through both arrays
  var boxOffset = margin;

  if ((attributeArray.length)*(regionArray.length) > 0)
  {
    bar_svg.append("g")
      .attr("class","bargroup")
      .attr("transform", "translate(" + boxOffset + ",0)")
      .append("rect")
      .attr("height",height)
      .attr("width",boxWidth)
      .attr("x",-barWidth/2)
      .attr("fill", "none")
      .attr("style", function()
        {
          var color = catToColor[varKey[attributeArray[0]][1]];
          return "stroke: " + color + "; stroke-width: 5;";
        });

  var tooltipfuncs = []; 
  for (i in attributeArray)
  {
    attribute  =  attributeArray[i];    
    var attrBarSet = bar_svg.append("g")
                            .attr("class","bargroup")
                            .attr("transform", "translate(" + boxOffset + ",0)")
                            .attr("id", attribute);

    attrBarSet.append("rect")
      .attr("height",height)
      .attr("width",boxWidth)
      .attr("x",-barWidth/2)
      .attr("fill", "none")
      .attr("style", function()
        {
          var color = catToColor[varKey[attribute][1]];
          return "stroke: " + color + "; stroke-width: 2;";
        });
                            
    attrBarSet.append("text")
              .attr("transform", "translate(0," + (height + 20) +")")
              .attr("text-anchor", "start")
              .text(attribute)
              .on("mouseover", function() {
                  showDescToolTip(attribute);
                })
              .on("mousemove", moveDescToolTip)
              .on("mouseout", hideDescToolTip);
                                
    boxOffset = boxOffset + boxWidth;
    
    var xpos = 0;

    var attrMap = dataObject[attribute];
    var scalingFactor = height/(attrMap.get("max"));

    attrBarSet.append("text")
              .attr("transform", "translate(-15,15)")
              .attr("text-anchor", "start")
              .text(attrMap.get("max").toString());
    attrBarSet.append("text")
              .attr("transform", "translate(-15,"+ (height - 5) +")")
              .attr("text-anchor", "start")
              .text("0");
              
              
    tooltipfuncs[attribute] = [];

    for (j in regionArray)
    {      
      var yVal = attrMap.get(regionArray[j])*scalingFactor;
      
      tooltipfuncs[attribute][j] = (function(attr,jay){
        return function() {
              showBarToolTip(regionArray[jay],attr);
        };
      }(attribute,j));   

      attrBarSet.append("rect")
            .attr("id", "fips" + regionArray[j].toString())
            .attr("class",classes[j])
            .attr("width", barWidth)
            .attr("height", yVal)
            .attr("y", height - yVal)
            .attr("x", xpos)
            .on("mouseover", tooltipfuncs[attribute][j])
            .on("mousemove", moveBarToolTip)
            .on("mouseout", hideBarToolTip);

      xpos = xpos + barWidth;

    } 

  } // end for in attributeArray
  } // if attributeArray is not empty
} //end createBars function   


var AddRegion = function(regionFIPS)
{
  if (currRegIdx >= regionLimit)
  {
    removeStuff = true;
    currRegIdx = 0;
  } // overflow has occurred
  
  if(removeStuff)
  {
    d3.selectAll("."+ returnclasses[currRegIdx]).classed(returnclasses[currRegIdx], false); // unclass old selection
    d3.select("#fips" + regionArray[currRegIdx].toString()).remove(); // remove old legend entry one
  }
  else // create legend box
  {
  bar_svg.append("rect")
    .attr("class",classes[currRegIdx])
    .attr("width", 12)
    .attr("height", 12)
    .attr("y", 15*currRegIdx)
    .attr("x", width - 200)
  }
  
  // create legend entry  
  var regionDescription = populationByCounty[regionFIPS][1] + ", " + populationByCounty[regionFIPS][0];
  bar_svg.append("text")
      .attr("id", "fips" + regionFIPS.toString())
      .attr("font-size", "15px")
      .attr("y", 15*currRegIdx + 12)
      .attr("x", width + 15 - 200)
      .text(regionDescription);

    regionArray[currRegIdx]= regionFIPS;
    d3.select("#countyID" + regionFIPS.toString()).classed(returnclasses[currRegIdx], true)//class the new region

    CreateBars();

    currRegIdx = currRegIdx + 1;
} // end AddRegion function


var AddAttribute= function(attribute)
{
  var boxOffset = margin + boxWidth*attributeArray.length;
  var newLength = attributeArray.unshift(attribute);
  if (newLength >= attributeLimit)
  {
    attributeArray.pop();
  }
  CreateBars();
  
} // end AddAttribute function


//bar tooltip functions
  function bartooltipHTML(FIPS,variable){	// function to create html content string in tooltip div.
          var countyState = populationByCounty[FIPS][1] + ", " + populationByCounty[FIPS][0];
          var varMap = dataObject[variable];
          var dataValue = varMap.get(FIPS);
          var varDesc = varKey[variable][0];
		  return "<table><tr><td align='center'><b>"+ varDesc + "</b></td></tr><tr><td align='center'><b>in " + countyState +": </b></td></tr><tr><td align='center'>"+ dataValue.toString() +"</td></tr></table>";
	}

  function showBarToolTip(FIPS,variable) {
    $("#bartooltip").show().html(bartooltipHTML(FIPS,variable));
  }

  function moveBarToolTip(){
    $("#bartooltip").css({ left: d3.event.pageX + 10,
                        top: d3.event.pageY - 50 });
  }

  function hideBarToolTip(){
    $("#bartooltip").hide();
  }

  function desctooltipHTML(attribute){	// function to create html content string in tooltip div.
          return varKey[attribute][0];
	}

  function showDescToolTip(variable) {
    $("#desctooltip").show().html(desctooltipHTML(variable));
  }

  function moveDescToolTip(){
    $("#desctooltip").css({ left: d3.event.pageX + 10,
                        top: d3.event.pageY - 50 });
  }

  function hideDescToolTip(){
    $("#desctooltip").hide();
  }

