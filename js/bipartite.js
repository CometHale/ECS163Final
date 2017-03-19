var colors = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3.select("body")
  .append("svg")
  .attr("width", 960)
  .attr("height", 500);

var g = svg.append("g")
  .attr("transform", "translate(50,50)");

//default categories (for now)
var cat1 = "Access";
var cat2 = "Demographics";

var categories1 = categoryObject[cat1];
var categories2 = categoryObject[cat2];
console.log(categoryObject["Access"]);
var bpdata = [];
var row = [];

for (var i = 0; i < categories1.size; i++) {
  for (var j = 0; j < categories2.size; j++) {
    c1 = categories1[i];
    c2 = categories2[j];
    row.push(c1); //row format is [c1,c2, c1 info, c2 info]
    row.push(c2);
    row.push(dataObject[c1]);
    row.push(dataObject[c2]);
    bpdata.push(row);
    row = []; //clear row
  }
}

console.log(bpdata);