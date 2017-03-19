function drawbp() {
  var colors = {Access: "#ffa31a", Assistance: "#00ccff", Demographics: "#b84dff", Economic: "#ff4d94", Education: "#ff1a1a", FoodCosts: "#33cccc", Health: "#e67300", 
                Insecurity: "#e600e6", LocalFoodAccess: "#ffcc99", LocalFoodProduction: "#006666", Restaurants: "#8a00e6", Stores: "#0000b3", StudentAssistance: "#196666"};

  var svg = d3.select("#bipartite")
    .append("svg")
    .attr("width", 960)
    .attr("height", 500);

  var bp_g = svg.append("g")
    .attr("transform", "translate(50,50)");

  //default categories (for now)
  var cat1 = "Access";
  var cat2 = "Demographics";
  console.log(categoryObject);
console.log(Array.from(categoryObject[cat1]));
  var categories1 = categoryObject[cat1];
  var categories2 = categoryObject[cat2];

  var bpdata = [];

  for (var i = 0; i < categories1.size; i++) {
    for (var j = 0; j < categories2.size; j++) {
      var row = new Array(); //make new
      c1 = categories1[i];
      c2 = categories2[j];
      row.push(c1); //row format is [c1,c2, c1 info, c2 info]
      row.push(c2);
      row.push(dataObject[c1]);
      row.push(dataObject[c2]);
      bpdata.push(row);
    }
  }
  console.log(bpdata);

  var bp = viz.bP()
    .data(bpdata)
    .min(10)
    .pad(1)
    .height(600)
    .width(500)
    .barSize(30)
    .fill(d=>colors[d.primary]);

  bp_g.call(bp);

  function mouseover(d){
    bp.mouseover(d);
  } 

  function mouseout(d){
    bp.mouseout(d);
  } 
}