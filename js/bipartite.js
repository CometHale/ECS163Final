var bp = viz.bP();

function drawbp() {
  var scatterDrawn = false;

  var bp_svg = d3.select("#bipartite")
    .append("svg")
    .attr("width", 1200)
    .attr("height", 700);

  var bp_g = bp_svg.append("g")
    .attr("transform", "translate(300,50)");

  //tooltip
  var bp_tooltip = d3.tip()
    .attr("class", "tooltip")
    .direction("n")
    .offset([0, 0])
    .html(function(d) {
      return varKey[d.key];}); //curr_data is the year we're looking at

  //invoke tip library
  bp_g.call(bp_tooltip);

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

  bp_g.selectAll(".mainBars").append("text")
      .attr("class","bplabel")
      .attr("x",d=>(d.part=="primary"? -30: 30))
      .attr("y",d=>+6)
      .text(d=>d.key)
      .style("font-family", "Cinzel")
      .style("fond-size", "8px")
      .attr("text-anchor",d=>(d.part=="primary"? "end": "start"))
      .on("mouseover", bp_tooltip.show)
      .on("mouseout", bp_tooltip.hide);



  bp_bars = bp_g.selectAll(".mainBars")
    .on("click", bp_mouseclick);


  function mouseover(d){
    bp.mouseover(d);
  } 

  function mouseout(d){
    bp.mouseout(d);
  } 

  var bpkey1 = null;
  var bpkey2 = null;

  function bp_mouseclick(d) {
    if (d.part == "primary") {
      bpkey1 = d.key;
    }
    if (d.part == "secondary") {
      bpkey2 = d.key;
    }
    if (bpkey1 != null && bpkey2 != null) {
      if (scatterDrawn == false) {
        drawscatter(bpkey1, bpkey2);
        window.location.href="#scatterplot";
        scatterDrawn = true;
      }
      else {
        update_sp(bpkey1, bpkey2);
        window.location.href="#scatterplot";
      }      
      //send to scatterplot.js :)
    }
    
  }

}

function bp_update(cat1, cat2) {
  categories1 = Array.from(categoryObject[cat1]);
  categories2 = Array.from(categoryObject[cat2]);

  bpdata = [];

  for (var i = 0; i < categories1.length; i++) {
    for (var j = 0; j < categories2.length; j++) {
      row = new Array(); //make new
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
  bp.update(bpdata);
}