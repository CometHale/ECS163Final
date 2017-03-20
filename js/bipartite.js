function drawbp() {

  var svg = d3.select("#bipartite")
    .append("svg")
    .attr("width", 1200)
    .attr("height", 1000);

  var bp_g = svg.append("g")
    .attr("transform", "translate(300,50)");

  //default categories (for now)
  var cat1 = "Access";
  var cat2 = "Demographics";
  var categories1 = Array.from(categoryObject[cat1]);
  var categories2 = Array.from(categoryObject[cat2]);

  var bpdata = [];

  for (var i = 0; i < categories1.length; i++) {
    for (var j = 0; j < categories2.length; j++) {
      var row = new Array(); //make new
      c1 = categories1[i];
      c2 = categories2[j];
      row.push(c1); //row format is [c1,c2, c1 info, c2 info]
      row.push(c2);
      corr = correlation_dict[c1][c2];
      if (corr < 0) { //no negative correlations = 0 correlation
        row.push(0);
        row.push(0);
      }
      else {
        row.push(corr);
        row.push(0);  
      }
      
      // corr = correlation_dict[c2];
      // row.push(corr[c1]);
      bpdata.push(row);
    }
  }
  

  //make random colors
  bpcolors = {};

  for (var i = 0 ; i < bpdata.length; i++) {
    varOne = bpdata[i][0];
    varTwo = bpdata[i][1];
    if (!(varOne in bpcolors)) { //first variable
      bpcolors[varOne] = "";
    }
    if (!(bpdata[varTwo] in bpcolors)) {
      bpcolors[varTwo] = "";
    }
  }

  var seq = palette('tol-dv', Object.keys(bpcolors).length);

   Object.keys(bpcolors).forEach(function(key,index) {
      // key: the name of the object key
      // index: the ordinal position of the key within the object 
      bpcolors[key] = "#" + seq[index];
  });


  var bp = viz.bP()
    .data(bpdata)
    .min(20)
    .pad(10)
    .height(600)
    .width(500)
    .barSize(30)
    .fill(d=>bpcolors[d.primary]);

  bp_g.call(bp);

  bp_g.selectAll(".mainBars").append("text").attr("class","bplabel")
  .attr("x",d=>(d.part=="primary"? -30: 30))
  .attr("y",d=>+6)
  .text(d=>d.key)
  .style("font-family", "Cinzel")
  .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

  function mouseover(d){
    bp.mouseover(d);
  } 

  function mouseout(d){
    bp.mouseout(d);
  } 
}
