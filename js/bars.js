var attributeStack = [];
var regionStack = [];

var classes = ["selection1","selection2","selection3","selection4","selection5"];

var bar_svg = d3.select("#bars"),
    width = +bar_svg.attr("width"),
    height = +bar_svg.attr("height") - 50;

var margin =  50;

var regionLimit = 5;
var attributeLimit = 5;

var barWidth = (width - margin)/(regionLimit*attributeLimit + attributeLimit - 1) // width divided by max # of bars, plus gaps & margins
var boxWidth = (width - margin)/attributeLimit;

var AddRegion = function(regionFIPS)
{
  // make legend:
  var regionNum = regionStack.length; 
  bar_svg.append("rect")
    .attr("id", regionFIPS)
    .attr("class",classes[regionNum])
    .attr("width", 12)
    .attr("height", 12)
    .attr("y", 15*regionNum)
    .attr("x", width - 200);

  var regionDescription = populationByCounty[regionFIPS][1] + ", " + populationByCounty[regionFIPS][0];
  bar_svg.append("text")
      .attr("id", regionFIPS)
      .attr("y", 15*regionNum +15)
      .attr("x", width + 15 - 200)
      .text(regionDescription);

  regionStack.push(regionFIPS);

  var boxOffset = margin;

  for (i in attributeStack);
  {
    var attribute =  attributeStack[i];
    idString = "#" + attribute;
    d3.selectAll(idString).remove();
    
    var attrBarSet = bar_svg.append("g")
                            .attr("transform", "translate(" + boxOffset + ",0)")
                            .attr("id", attribute);
                            
    attrBarSet.append("text")
              .attr("transform", "translate(0," + (height + 20) +")")
              .attr("text-anchor", "start")
              .text(attribute);
                            
    boxOffset = boxOffset + boxWidth;
    var xpos = 0;

    var attrMap = dataObject[attribute];
    var scalingFactor = height/(attrMap.get("max"));
  
    for (j in regionStack)
    {      
      var yVal = attrMap.get(regionStack[j])*scalingFactor;

      attrBarSet.append("rect")
            .attr("id", regionStack[j])
            .attr("class",classes[j])
            .attr("width", barWidth)
            .attr("height", yVal)
            .attr("y", height - yVal)
            .attr("x", xpos);

      xpos = xpos + barWidth;

    } 

  } // end for in attributeStack
  
} // end AddAttribute function


var AddAttribute= function(attribute)
{
  var boxOffset = margin + boxWidth*attributeStack.length;
  attributeStack.push(attribute);

  var attrBarSet = bar_svg.append("g")
                            .attr("transform", "translate(" + boxOffset + ",0)")
                            .attr("id", attribute);
  attrBarSet.append("text")
            .attr("transform", "translate(0," + (height + 20) +")")
            .attr("text-anchor", "start")
            .text(attribute);



  var xpos = 0;

  var attrMap = dataObject[attribute];
  var scalingFactor = height/(attrMap.get("max"));
  
  for (j in regionStack)
  {      
    var yVal = attrMap.get(regionStack[j])*scalingFactor;

    attrBarSet.append("rect")
          .attr("id", regionStack[j])
          .attr("class",classes[j])
          .attr("width", barWidth)
          .attr("height", yVal)
          .attr("y", height - yVal)
          .attr("x", xpos);

    xpos = xpos + barWidth;
  } 
  
} // end AddAttribute function

function RemoveRegion()
{
  var regionFIPS = regionStack.pop();
  var idString = "#" + regionFIPS.toString();
  d3.selectAll(idString).remove();
} //end RemoveRegion() function

function RemoveAttribute()
{
  var attribute = attributeStack.pop();
  var idString = "#" + attribute;
  d3.selectAll(idString).remove();
} //end RemoveAttribute() function




