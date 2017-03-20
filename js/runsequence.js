LoadPops();
LoadData();
var firstLoad = true; 
MakeMap("firstLoad");

d3.json("data/us-10m.v1.json", function(usGeo) {
  loadCorrParser();

  d3.csv("data/Access.csv", function(){
    drawbp();

    d3.csv("data/Insecurity.csv",function(){
      loadChord();
    });
    
  });


});

